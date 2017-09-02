<template>
  <div id="participant-view" class="panel panel-default" v-if="currentComparison">
    <div class="panel-heading">
      Participants
      <a class="icon" @click="addRow()">
        <span class="glyphicon glyphicon-plus"></span>
      </a>
    </div>
    <ul id="participant-name-list" class="list-group">

      <li :id="'participant-view-' + participant.id" class="list-group-item"
          v-for="(participant, i) in currentComparison.participants">

        <!-- show name and delete button if not editing -->
        <div v-if="!editingParticipant || editingParticipantIndex != i">
          <span class="participant-name">
            {{ participant.name }}
          </span>

          <div class="participant-view-buttons">
            <button type="button" class="btn btn-default" @click="addEditParticipantRow(i)">
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
            <button type="button" class="btn btn-danger" @click="deleteParticipant(i)">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </div>

        <!-- show editing box and save/cancel button if editing  -->
        <div v-if="editingParticipant && editingParticipantIndex == i">
          <div v-bind:class="{ 'has-error': errors.has('Name') }">
            <div class="participant-view-buttons">
              <button type="button" class="btn btn-success" @click="editParticipant(i)" :disabled="errors.has('Name')">
                <span class="glyphicon glyphicon-ok"></span>
              </button>
              <button type="button" class="btn btn-warning" @click="removeEditParticipantRow()">
                <span class="glyphicon glyphicon-repeat"></span>
              </button>
            </div>
            <div class="participant-view-input">
              <input class="form-control"
                     v-model="name"
                     v-validate="'required|verify_participant|verify_participant_unique'"
                     data-vv-name="Name">
              <p class="text-danger" v-if="errors.has('Name')">{{ errors.first('Name') }}</p>
            </div>
          </div>
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
            <input class="form-control"
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
  import error_parse from '../../error_parse'

  export default {
    props: ['currentComparison'],
    data() {
      return {
        addingParticipant: false,
        editingParticipant: false,
        editingParticipantIndex: 0,
        name: '',
        error: '',
      }
    },
    computed: {
      canAddParticipant() {
        return this.currentComparison.participants.length < 20
      },
    },
    watch: {
      // clear booleans on comparison change
      currentComparison: function() {
        this.name = '';
        this.addingParticipant = false;
        this.editingParticipant = false;
      }
    },
    methods: {
      addRow() {
        this.name = '';
        this.editingParticipant = false;
        this.addingParticipant = true;
      },
      removeRow() {
        this.name = '';
        this.addingParticipant = false;
        this.editingParticipant = false;
      },
      addEditParticipantRow(index) {
        this.name = this.currentComparison.participants[index].name;
        this.editingParticipantIndex = index;
        this.editingParticipant = true;
        this.addingParticipant = false;
      },
      removeEditParticipantRow(index) {
        this.name = '';
        this.editingParticipant = false;
        this.addingParticipant = false;
      },
      addParticipant() {
        // Don't proceed if errors
        if (this.errors.any()) return
        this.error = '';

        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Create the participant and add it to the state
        api.participants.create(this, this.currentComparison.id, this.name)
          .then((participant) => {
            this.$store.dispatch('addParticipantToComparison', [this.currentComparison.id, participant])
            this.removeRow()
          }, (error) => this.error = error_parse.parseErrors(error.body))
      },
      editParticipant(index) {
        // Don't proceed if errors
        if (this.errors.any()) return
        this.error = '';

        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Edit the participant and modify it in the state
        api.participants
          .update(this, this.currentComparison.id, this.currentComparison.participants[index].id, this.name.trim())
            .then((participant) => {
              this.$store.dispatch('updateParticipantNameInComparison', [this.currentComparison.id, participant.id, participant.name])
              this.removeEditParticipantRow(index)
            }, (error) => this.error = error_parse.parseErrors(error.body))
      },
      deleteParticipant(index) {
        // Check authentication
        if (!auth.isAuthenticated()) return;

        // Delete the participant
        var cid = this.currentComparison.id
        var pid = this.currentComparison.participants[index].id
        api.participants.delete(this, cid, pid).then(() => {
          // Manually hide the row because vue doesn't detect the deletion
          $('#participant-view-' + pid).hide()
          this.$store.dispatch('deleteParticipantFromComparison', [cid, pid])
        }, (error) => this.error = error_parse.parseErrors(error.body))
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
          // If editing, we should not give an error if they type in the same
          // name as already exists.
          if (this.editingParticipant) {
            var currentName = this.currentComparison.participants[this.editingParticipantIndex].name
            if (value.trim().toLowerCase() == currentName.trim().toLowerCase()) {
              return true;
            }
          }

          // Otherwise fail on any match
          if (this.currentComparison.participants
                .filter((p) => p.name != undefined)
                .filter((p) => p.name.trim().toLowerCase() == value.trim().toLowerCase())
                .length > 0)
          {
            return false
          }

          return true
        }
      });
    }
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
