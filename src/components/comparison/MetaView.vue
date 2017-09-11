<template>
  <div id="meta-view" v-if="currentComparison">

    <!-- show normal view if not editing -->
    <div v-if="!editingComparison">
      <h2>{{ currentComparison.title }}</h2>

      <div class="meta-view-buttons">
        <button type="button" class="btn btn-default" @click="startEditComparison()">
          <span class="glyphicon glyphicon-pencil"></span>
        </button>

        <button type="button" class="btn btn-danger" @click="deleteComparison()">
          <span class="glyphicon glyphicon-remove"></span>
        </button>
      </div>
    </div>

    <!-- show editing view if editing -->
    <div v-if="editingComparison">
      <div v-bind:class="{ 'has-error': errors.has('Name') }">

        <div class="meta-view-input">
          <input class="form-control meta-name-input"
                 v-model="name"
                 v-validate="'required|max:20'"
                 data-vv-name="Name"
                 @keyup.enter="editComparison()">
          <p class="text-danger" v-if="errors.has('Name')">{{ errors.first('Name') }}</p>
        </div>

        <div class="meta-view-buttons">
          <button type="button" class="btn btn-success" @click="editComparison()" :disabled="errors.has('Name')">
            <span class="glyphicon glyphicon-ok"></span>
          </button>
          <button type="button" class="btn btn-warning" @click="stopEditComparison()">
            <span class="glyphicon glyphicon-repeat"></span>
          </button>
        </div>

      </div>
    </div>

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
        error: '',
        editingComparison: false,
      }
    },
    watch: {
      // clear data on comparison change
      currentComparison: function() {
        this.name = ''
        this.editingComparison = false
      }
    },
    methods: {
      startEditComparison() {
        this.name = this.currentComparison.title
        this.editingComparison = true
      },
      stopEditComparison() {
        this.name = ''
        this.editingComparison = false
      },
      editComparison() {
        // Verify user is authenticated before trying to delete
        if (!auth.isAuthenticated()) return

        api.comparisons
          .update(this, this.currentComparison.id, this.name.trim())
          .then((comparison) => {
            this.$store.dispatch('updateComparison', comparison)
            this.stopEditComparison()
          }, (error) => {
            console.log(error)
            this.error = error_parse.parseErrors(error.body)
          })
      },
      deleteComparison() {
        // Verify user is authenticated before trying to delete
        if (!auth.isAuthenticated()) return

        // Perform the deletion, redirect to home if successful
        var id = this.currentComparison.id
        api.comparisons.delete(this, id).then(() => {
          this.$store.dispatch('deleteComparison', id)
          this.$router.push('/')
        }, (error) => {
          console.log(error)
        });
      }
    }
  }
</script>

<style>
  #meta-view {
    margin-bottom: 20px;
    text-align: center;
  }

  #meta-view h2 {
    margin-top: 0px;
  }

  #meta-view .btn {
    margin-left: 2px;
  }

  #meta-view .meta-name-input {
    max-width: 300px;
    margin-bottom: 10px;
    display: inline-block;
    width: auto;
    text-align: center;
  }
</style>
