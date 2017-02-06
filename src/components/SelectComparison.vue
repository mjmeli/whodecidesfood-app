<template>
  <div>
    <h1>Select Comparison</h1>

    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
        Comparisons <span class="caret"></span>
      </button>
      <ul id="comparison-menu" class="dropdown-menu">
        <li v-for="comparison in comparisons">
          <router-link :to="{ path: '/comparison/' + comparison.id }">
            {{ comparison.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        comparisons: []
      }
    },
    created: function() {
      this.get()
    },
    methods: {
      get() {
        // Verify user is authenticated before trying to load
        if (!auth.isAuthenticated()) return;

        // Get comparisons for this user
        this.$http
          .get('http://localhost:3000/api/comparisons', {
            headers: auth.getAuthHeader()
          }).then(
            function (response) {
              this.comparisons = []
              response.body.forEach((data) => this.comparisons.push(data))
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
    }
  }
</script>
