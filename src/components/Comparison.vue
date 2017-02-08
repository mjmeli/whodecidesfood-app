<template>
  <div>
    <h2>Comparison {{ $route.params.id }}</h2>
    <div v-if="comparison">
      <p>Title: {{ comparison.title }}</p>
      <div v-for="participant in comparison.participants">
        <p> Participant #{{ participant.id }} {{ participant.name }} (score {{ participant.score }})</p>
      </div>
    </div>
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
              // TODO: populate data
              this.comparison = response.body
              console.log(response.body)
            },
            function (error) {
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
