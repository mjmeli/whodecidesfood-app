<template>
  <div id="decision-view" class="panel panel-default" v-if="currentComparison">

    <div class="panel-heading">
      Add New Decision
    </div>

    <ul class="list-group">
      <li class="list-group-item">

        <!-- Participant dropdown -->
        <div class="form-group" v-bind:class="{ 'has-error': errors.has('Name') }">
          <select class="form-control"
            v-model="name"
            v-validate="'required'"
            data-vv-name="Name">
            <option value="">Select name...</option>
            <option v-for="p in currentComparison.participants">
              {{ p.name }}
            </option>
          </select>
          <p class="text-danger" v-if="errors.has('Name')">{{ errors.first('Name') }}</p>
        </div>

        <h4>decided to eat at</h4>

        <!-- Location input -->
        <div class="form-group" v-bind:class="{ 'has-error': errors.has('Location') }">
          <input class="form-control"
            v-model="location"
            v-validate="'required'"
            data-vv-name="Location"
            placeholder="Restaurant name"
            @keyup.enter="addDecision()">
          <p class="text-danger" v-if="errors.has('Location')">{{ errors.first('Location') }}</p>
        </div>

        <h4>for</h4>

        <!-- Meal dropdown -->
        <div class="form-group" v-bind:class="{ 'has-error': errors.has('Meal') }">
          <select class="form-control"
            v-model="meal"
            v-validate="'required|in:Breakfast,Lunch,Dinner,Snack'"
            data-vv-name="Meal">
            <option value="">Select meal...</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
          <p class="text-danger" v-if="errors.has('Meal')">{{ errors.first('Meal') }}</p>
        </div>

        <!-- Buttons -->
        <div class="decision-view-buttons">
          <button type="button" class="btn btn-success" @click="addDecision()" :disabled="errors.any()">
            <span class="glyphicon glyphicon-ok"></span>
          </button>
          <button type="button" class="btn btn-warning" @click="clearDecision()">
            <span class="glyphicon glyphicon-repeat"></span>
          </button>
        </div>

        <!-- General errors -->
        <p class="text-danger" v-if="error">{{ error }}</p>

      </li>
    </ul>

  </div>
</template>

<script>
  import api from '../../api'
  import auth from '../../auth'
  import error_parse from '../../error_parse'

  export default {
    props: ['currentComparison'],
    data() {
      return {
        name: '',
        location: '',
        meal: '',
        error: ''
      }
    },
    watch: {
      // clear data on comparison change
      currentComparison: function() {
        this.clearDecision()
      }
    },
    methods: {
      addDecision() {
        // Don't proceed if errors
        this.$validator.validateAll().then(() => {}, () => {})
        if (this.errors.any()) return
        this.error = '';

        // Check authentication
        if (!auth.isAuthenticated()) return;

        var participant_id = this.currentComparison.participants
          .filter(p => p.name.trim().toLowerCase() == this.name.trim().toLowerCase())[0].id
        api.decisions
          .create(this, this.currentComparison.id, participant_id, this.meal, this.location)
          .then((decision) => {
            // Push through the score increase
            this.currentComparison.participants.filter(p => p.id == participant_id)[0].score += 1
            this.$store.dispatch('updateComparison', this.currentComparison)
            this.clearDecision()
          }, (error) => {
            this.error = error_parse.parseErrors(error.body)
          })
      },
      clearDecision() {
        this.name = ''
        this.location = ''
        this.meal = ''
        this.errors.clear()
      }
    }
  }
</script>

<style>
  #decision-view {
    text-align: left;
  }

  #decision-view .list-group-item {
    text-align: center;
  }

  #decision-view .btn {
    margin-left: 2px;
  }

  #decision-view .text-danger {
    text-align: left;
  }
</style>
