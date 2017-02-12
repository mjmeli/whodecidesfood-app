<template>
  <div id="participant-view" class="panel panel-default" v-if="currentComparison">
    <div class="panel-heading">
      Participants
      <a class="icon" @click="addRow()">
        <span class="glyphicon glyphicon-plus"></span>
      </a>
    </div>
    <ul id="participant-name-list" class="list-group">
      <li class="list-group-item" v-for="(participant, i) in currentComparison.participants">
        <span class="participant-name">{{ participant.name }}</span>
        <div class="participant-view-buttons">
          <button type="button" class="btn btn-default" @click="editParticipant(i)">
            <span class="glyphicon glyphicon-pencil"></span>
          </button>
          <button type="button" class="btn btn-danger" @click="deleteParticipant(i)">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </div>
      </li>

      <li class="list-group-item participant-list-group-item-input"
        v-if="addingParticipant && canAddParticipant">
        <div v-bind:class="{ 'has-error': errors.has('Name') }">
          <div class="participant-view-buttons">
            <button type="button" class="btn btn-success" @click="addParticipant()" :disabled="errors.has('Name')">
              <span class="glyphicon glyphicon-ok"></span>
            </button>
            <button type="button" class="btn btn-danger" @click="removeRow()">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
          <div class="participant-view-input">
            <input id="title" class="form-control"
                   placeholder="Enter participant name"
                   v-model="name"
                   v-validate="'required|verify_participant|verify_participant_unique'"
                   data-vv-name="Name">
            <p class="text-danger" v-if="errors.has('Name')">{{ errors.first('Name') }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '../../api'
  import auth from '../../auth'

  export default {
    props: ['currentComparison'],
    data() {
      return {
        addingParticipant: false,
        name: '',
        error: '',
      }
    },
    computed: {
      canAddParticipant() {
        return this.currentComparison.participants.length < 20
      }
    },
    methods: {
      addRow() {
        this.addingParticipant = true
      },
      removeRow() {
        this.name = ''
        this.addingParticipant = false
      },
      addParticipant() {
        // Don't proceed if errors
        if (this.errors.any()) return
        this.error = '';

        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Create the participant and add it to the state
        api.participants.create(this, this.currentComparison.id, this.name).then((participant) => {
          this.$store.dispatch('addParticipantToComparison', [this.currentComparison.id, participant])
          this.removeRow()
        }, (error) => this.error = error_parse.parseErrors(error.body))
      },
      editParticipant(index) {
        console.log("edit " + index)
      },
      deleteParticipant(index) {
        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Delete the participant
        var cid = this.currentComparison.id
        var pid = this.currentComparison.participants[index].id
        api.participants.delete(this, cid, pid).then(() => {
          // Manually remove the row because vue doesn't detect the deletion
          $('#participant-name-list li').eq(index).remove()
          this.$store.dispatch('deleteParticipantFromComparison', [cid, pid])
        }, (error) => console.log(error))
      }
    },
    created() {
      // Create a custom validator for participants (remove them first if they exist)
      this.$validator.remove('verify_participant')
      this.$validator.remove('verify_participant_unique')
      this.$validator.extend('verify_participant', {
        getMessage: (field) => 'Participants must contain at least one non-whitespace character.',
        validate: (value) => {
          if (value.trim().length == 0) return false
          return true
        }
      });
      this.$validator.extend('verify_participant_unique', {
        getMessage: (field) => 'Participants must be unique.',
        validate: (value) => {
          if (this.currentComparison.participants.filter((p) => p.name != undefined)
                .filter((p) => p.name.trim().toLowerCase() == value.trim().toLowerCase()).length > 0)
                return false
          return true
        }
      });
    },
  }
</script>

<style>
  #participant-view {
    text-align: left
  }

  #participant-view .glyphicon-plus {
    float: right;
    padding-right: 12px;
  }

  #participant-view .list-group-item {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  #participant-view .btn {
    margin-left: 2px;
  }

  .participant-name {
    height: 34px;
    line-height: 34px;
    white-space: nowrap;
  }

  .participant-view-buttons {
    float: right;
    padding-left: 5px;
  }

  .participant-view-input {
    overflow: hidden;
    padding-right: 2px;
  }

  .participant-list-group-item-input {
    padding-left: 10px;
  }
</style>
