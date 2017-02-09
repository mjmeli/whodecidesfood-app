<template>
  <div>
    <h2>Comparison {{ $route.params.id }}</h2>
    <div v-if="comparison">
      <p>Title: {{ comparison.title }}</p>
      <div v-for="participant in comparison.participants">
        <p> Participant #{{ participant.id }} {{ participant.name }} (score {{ participant.score }})</p>
      </div>
    </div>

    <button type="submit" class="btn btn-danger" @click="deleteComparison()">Delete</button>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        comparison: null,
      }
    },
    mounted () {
      this.getComparison(this.$route.params.id);
    },
    methods: {
      deleteComparison() {
        var id = this.$route.params.id
        this.$http
          .delete('http://localhost:3000/api/comparisons/' + id, {
            headers: auth.getAuthHeader()
          }).then(
            function (response) {
              this.$store.dispatch('deleteComparison', this.comparison)
              this.$router.push('/')
            },
            function (error) {
              console.log(error);
            }
          )
      },
      getComparison(id) {
        // Verify user is authenticated before trying to load
        if (!auth.isAuthenticated()) return;

        // Get comparisons for this user
        this.comparison = null
        this.$http
          .get('http://localhost:3000/api/comparisons/' + id, {
            headers: auth.getAuthHeader()
          }).then(
            function (response) {
              this.comparison = response.body
            },
            function (error) {
              // If error, redirect to home
              this.$router.push('/')
              console.log(error);
            }
          )
      },
    },
    watch: {
      '$route.params.id'(newId, oldId) {
        this.getComparison(newId)
      }
    }
  }
</script>
