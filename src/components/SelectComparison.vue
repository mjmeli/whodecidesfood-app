<template>
  <div id="main-view" class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <div id="comparison-side-menu" class="list-group">
          <router-link class="list-group-item" active-class="active" exact
            v-bind:to="{ path: '/'}"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-home"></span>
              Home
          </router-link>

          <router-link class="list-group-item" active-class="active" exact
            v-for="comparison in comparisons"
            v-bind:to="{ path: '/comparison/' + comparison.id }"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-home invisible"></span>
              {{ truncate(comparison.title, 22) }}
              <span class="glyphicon glyphicon-menu-right"></span>
          </router-link>

          <router-link class="list-group-item" active-class="active" exact
            v-bind:to="{ path: '/comparison/new' }"
            v-on:click.native="clearFocus($event)">
              <span class="glyphicon glyphicon-plus"></span>
              New
          </router-link>
        </div>
      </div>
      <div class="col-sm-9">
        <router-view v-if="!isOnHomePage"></router-view>
        <div v-else class="text-center">
          <h3>Select an existing comparison from the menu to the left, or create a new one.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import auth from '../auth'

  export default {
    created: function() {
      this.get()
    },
    computed: {
      isOnHomePage() {
        return this.$route.path == '/';
      },
      isAnyItemActive() {
        return this.$route.params.id != undefined;
      },
      comparisons() {
        return this.$store.getters.comparisons
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

        // Clear current comparisons
        this.$store.dispatch('clearComparisons')

        // Get comparisons for this user
        api.comparisons.index(this).then((comparisons) => {
          comparisons.forEach((c) => this.$store.dispatch('addComparison', c))
        }, (error) => {
          console.log(error)
        })
      },
      // Truncate a string with a ... on the end
      truncate(string, value) {
        if (string.length > value) return string.substring(0, value) + '...'
        return string
      }
    },
  }
</script>

<style>
  #main-view {
    margin-top: 50px;
    margin-bottom: 50px;
  }

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

  /* Color of active item */
  #comparison-side-menu .list-group-item.active {
    background-color: #be1931;
    border-color: #be1931;
  }

</style>
