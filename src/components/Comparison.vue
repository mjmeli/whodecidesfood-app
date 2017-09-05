<template>
  <div>

    <meta-view :currentComparison="currentComparison"></meta-view>
    <div class="row">
      <div class="col-sm-6">
        <decision-view :currentComparison="currentComparison"></decision-view>
      </div>
      <div class="col-sm-6">
        <scoreboard-view :currentComparison="currentComparison"></scoreboard-view>
      </div>
    </div>
    <participant-view :currentComparison="currentComparison"></participant-view>

  </div>
</template>

<script>
  import api from '../api'
  import auth from '../auth'

  // Comparison view components
  import MetaView from './comparison/MetaView'
  import DecisionView from './comparison/DecisionView'
  import ScoreboardView from './comparison/ScoreboardView'
  import ParticipantView from './comparison/ParticipantView'

  export default {
    components: {
      'meta-view': MetaView,
      'decision-view': DecisionView,
      'scoreboard-view': ScoreboardView,
      'participant-view': ParticipantView,
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

<style>
  .btn-danger {
    background-color: #be1931;
  }
</style>
