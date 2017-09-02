<template>
  <div>
    <h2 v-if="currentComparison">{{ currentComparison.title }}</h2>

    <button type="submit" class="btn btn-danger" @click="deleteComparison()">Delete</button>

    <hr>

    <scoreboard-view :currentComparison="currentComparison"></scoreboard-view>

    <participant-view :currentComparison="currentComparison"></participant-view>
  </div>
</template>

<script>
  import api from '../api'
  import auth from '../auth'

  // Comparison view components
  import ParticipantView from './comparison/ParticipantView'
  import ScoreboardView from './comparison/ScoreboardView'

  export default {
    components: {
      'participant-view': ParticipantView,
      'scoreboard-view': ScoreboardView,
    },
    created () {
      this.getComparison(this.$route.params.id);
    },
    computed: {
      currentComparison() {
        return this.$store.getters.currentComparison
      }
    },
    methods: {
      deleteComparison() {
        // Verify user is authenticated before trying to delete
        if (!auth.isAuthenticated()) return;

        // Perform the deletion, redirect to home if successful
        var id = this.$route.params.id
        api.comparisons.delete(this, id).then(() => {
          this.$store.dispatch('deleteComparison', id)
          this.$router.push('/')
        }, (error) => {
          console.log(error);
        });
      },
      getComparison(id) {
        // Verify user is authenticated before trying to load
        if (!auth.isAuthenticated()) return;

        // Get the selected comparison and update the state
        api.comparisons.get(this, id).then((comparison) => {
          this.$store.dispatch('updateComparison', comparison)
          this.$store.dispatch('setCurrentComparison', comparison.id)
        }, (error) => {
          // If error, redirect to home
          this.$router.push('/')
          console.log(error);
        });
      },
    },
    watch: {
      '$route.params.id'(newId, oldId) {
        this.getComparison(newId)
      }
    }
  }
</script>
