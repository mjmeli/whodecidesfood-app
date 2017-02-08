<template>
  <div>
    <h1>Comparison Page</h1>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <div id="comparison-side-menu" class="list-group">
          <router-link class="list-group-item"
            v-bind:to="{ path: '/'}"
            v-bind:class="{ active: isAnyItemActive }"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-home"></span>
              Home
          </router-link>

          <router-link class="list-group-item"
            v-for="comparison in comparisons"
            v-bind:to="{ path: '/comparison/' + comparison.id }"
            v-bind:class="{ active: activeItem(comparison) }"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-home invisible"></span>
              {{ truncate(comparison.title, 22) }}
              <span class="glyphicon glyphicon-menu-right"></span>
          </router-link>

          <router-link class="list-group-item"
            v-bind:to="{ path: '/comparison/new' }"
            v-bind:class="{ active: this.$route.path == '/comparison/new' }"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-plus"></span>
              New
          </router-link>
        </div>
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        comparisons: null,
      }
    },
    created: function() {
      this.get()
    },
    computed: {
      isAnyItemActive() {
        return this.$route.path == '/';
      },
      isOnHomePage() {
        return this.$route.params.id != undefined;
      }
    },
    methods: {
      activeItem(comparison) {
        return this.$route.params.id == comparison.id
      },
      clearFocus(event) {
        $(event.currentTarget).blur()
      },
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
      truncate(string, value) {
        if (string.length > value) return string.substring(0, value) + '...'
        return string
      }
    }
  }
</script>

<style>
  #comparison-side-menu {
    text-align: left;
  }
  /* Right arrow */
  #comparison-side-menu > a > span.glyphicon-menu-right {
    float: right;
    margin-top: 1%;
  }

  /* Left side icons icons */
  #comparison-side-menu > a > span.glyphicon-home {
    margin-right: 10px;
  }
  #comparison-side-menu > a > span.glyphicon-plus {
    margin-right: 10px;
  }

  /* Make glyphicons invisible to help with alignment */
  #comparison-side-menu > a > span.invisible {
    visibility: hidden;
  }

</style>
