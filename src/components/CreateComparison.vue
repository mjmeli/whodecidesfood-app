<template>
  <div id="create-comparison">
    <h2>Create New Comparison</h2>

    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <div class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-1" for="title">Title:</label>
        <div class="col-sm-11">
          <input id="title" class="form-control"
                 placeholder="Enter comparison title"
                 v-model="comparison.title">
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-1 col-sm-11">
          <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
          <router-link class="btn btn-danger" to="/">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import auth from '../auth'
  import error_parse from '../error_parse'

  export default {
    data() {
      return {
        comparison: {
          title: ''
        },
        error: ''
      }
    },
    methods: {
      submit() {
        // Prepare parameters
        var params = {
          comparison: {
            title: this.comparison.title,
          }
        }

        // Clear error
        this.error = '';

        // POST
        // On success, add comparison. On error, display errors.
        this.$http.post('http://localhost:3000/api/comparisons', params, {
          headers: auth.getAuthHeader()
        }).then(
          // Success
          function (response) {
            this.$store.dispatch('addComparison', response.body)
            this.$router.push('/comparison/' + response.body.id)
          },
          // Fail - note errors
          function (error) {
            this.error = error_parse.parseErrors(error.body)
          }
        );
      }
    },
  }
</script>

<style>
  #create-comparison {
    text-align: left
  }
</style>
