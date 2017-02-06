<template>
  <div>
    <h2>Comparison {{ $route.params.id }}</h2>
    <p v-if="comparison">Title: {{ comparison.title }}</p>
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
    route: {
      // Check the users auth status before allowing navigation to the route
      canActivate() {
        return auth.isAuthenticated()
      }
    },
    watch: {
      '$route.params.id'(newId, oldId) {
        this.getComparison(newId)
      }
    }
  }
</script>
