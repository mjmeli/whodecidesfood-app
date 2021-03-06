<template>
  <div id="create-comparison">
    <h2>Create New Comparison</h2>
    <p>Use the form below to create a new comparison.</p>

    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <div class="form-horizontal">
      <div class="form-group" v-bind:class="{ 'has-error': errors.has('Title') }">
        <label class="control-label col-sm-2" for="title">Title:</label>
        <div class="col-sm-10">
          <input id="title" class="form-control"
                 placeholder="Enter comparison title"
                 v-model="comparison.title"
                 v-validate="'required|max:20'"
                 data-vv-name="Title"
                 @keyup.enter="submit()">
          <p class="text-danger" v-if="errors.has('Title')">{{ errors.first('Title') }}</p>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2" for="participants"
               :class="{ 'text-danger': errors.any('participants') }">
          Participants:
        </label>
        <div class="col-sm-10">
          <table id="participants-table" class="table">
            <tbody>
              <tr v-for="(p, index) in comparison.participants">
                <td>
                  <div class="input-group"
                    v-bind:class="{ 'has-error': errors.has('Participant #' + (index + 1), 'participants') }">
                    <input type="text" class="form-control" placeholder="Participant Name"
                            v-model="p.name"
                            v-validate="'verify_participant|verify_participant_unique'"
                            data-vv-scope="participants"
                            data-vv-as="Participant"
                            @keyup.enter="submit()"
                            :data-vv-name="'Participant #' + (index + 1)"/>
                    <span class="input-group-btn">
                      <button class="btn btn-danger" @click="removeRow(index)">
                        <span class="glyphicon glyphicon-remove"></span>
                      </button>
                    </span>
                  </div>
                  <p class="text-danger"
                    v-if="errors.has('Participant #' + (index + 1), 'participants')">
                    {{ errors.first('Participant #' + (index + 1), 'participants') }}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <button class="btn btn-primary" @click="appendRow()" v-if="!participantsFull">
                    <span class="glyphicon glyphicon-plus"></span>Add
                  </button>
                  <p class="text-danger" v-if="participantsFull">Cannot add any more participants</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-primary" @click="submit()"
            :disabled="errors.any() || errors.any('participants')">
            Submit
          </button>
          <router-link class="btn btn-danger" to="/">Cancel</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import auth from '../auth'
  import error_parse from '../error_parse'

  export default {
    data() {
      return {
        comparison: {
          title: '',
          participants: [
            { name: "" }
          ]
        },
        error: ''
      }
    },
    created() {
      // Create a custom validator for participants (remove them first if they exist)
      this.$validator.remove('verify_participant')
      this.$validator.remove('verify_participant_unique')
      this.$validator.extend('verify_participant', {
        getMessage: (field) => 'Participants must be left empty or contain at least one non-whitespace character.',
        validate: (value) => {
          if (value.length > 0 && value.trim().length == 0) return false
          return true
        }
      });
      this.$validator.extend('verify_participant_unique', {
        getMessage: (field) => 'Participants must be unique.',
        validate: (value) => {
          if (this.comparison.participants.filter((p) => p.name != undefined)
                .filter((p) => p.name.trim().toLowerCase() == value.trim().toLowerCase()).length > 1)
                return false
          return true
        }
      });
    },
    computed: {
      participantsFull() {
        return this.comparison.participants.length >= 10
      }
    },
    methods: {
      submit() {
        // Don't proceed if errors
        this.$validator.validateAll().then(() => {}, () => {})
        if (this.errors.any() || this.errors.any('participants')) return

        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Clear error
        this.error = '';

        // Create the comparison
        // On success, attempt to add participants (if included)
        // On error, update error test
        var _this = this
        api.comparisons.create(this, this.comparison.title.trim()).then(
          function success(comparison) {
            // Try to create each of the participants. This is asynchronous.
            var filtered = _this.comparison.participants.filter(
              (p) => p.name != undefined && p.name.trim().length > 0
            )
            let requests = filtered.map((participant) => {
              return new Promise((resolve, reject) => {
                api.participants.create(_this, comparison.id, participant.name,)
                  .then((response) => resolve(response), (error) => reject(error))
              })
            })

            // Wait for all participants to be added before redirecting
            Promise.all(requests).then(function (response) {
                _this.$store.dispatch('addComparison', comparison)
                _this.$router.push('/comparison/' + comparison.id)
              }, function (error) {
                // On error, delete the created comparison
                _this.error = "Unable to add participants, please try again"
                api.comparisons.delete(_this, comparison.id).then(null, (error) => console.log(error))
              })
          },
          function error(error) {
            this.error = error_parse.parseErrors(error.body)
          });
      },
      appendRow: function () {
        this.comparison.participants.push({})
      },
      removeRow: function (index) {
        this.comparison.participants.splice(index, 1);
      }
    },
  }
</script>

<style>
  #create-comparison {
    text-align: left
  }

  #create-comparison .btn-danger {
    background-color: #be1931;
  }

  #create-comparison .btn-danger:hover {
    background-color: #ab162c;
    border-color: #ab162c;
  }

  #participants-table .glyphicon-plus {
    margin-right: 10px;
  }

  #participants-table > tbody > tr > td {
    border-top: none;
    padding: 0px;
    padding-bottom: 10px;
  }

  p.text-danger {
    margin-bottom: 0px;
  }
</style>
