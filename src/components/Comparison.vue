<template>
  <div>
    <h2>Comparison {{ $route.params.id }}</h2>
    <div v-if="currentComparison">
      <p>Title: {{ currentComparison.title }}</p>
      <div v-for="participant in currentComparison.participants">
        <p> Participant #{{ participant.id }} {{ participant.name }} (score {{ participant.score }})</p>
      </div>
    </div>

    <button type="submit" class="btn btn-danger" @click="deleteComparison()">Delete</button>

    <hr>

    <participant-view :currentComparison="currentComparison"></participant-view>
  </div>
</template>

<script>
  import auth from '../auth'

  // Comparison view components
  import ParticipantView from './comparison/ParticipantView'

  export default {
    data() {
      return {

      }
    },
    components: {
      'participant-view': ParticipantView,
    },
    mounted () {
      this.getComparison(this.$route.params.id);
    },
    computed: {
      currentComparison() {
        return this.$store.getters.currentComparison
      }
    },
    methods: {
      deleteComparison() {
        var id = this.$route.params.id
        this.$http
          .delete('http://localhost:3000/api/comparisons/' + id, {
            headers: auth.getAuthHeader()
          }).then(
            function (response) {
              this.$store.dispatch('deleteComparison', id)
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
        this.$http
          .get('http://localhost:3000/api/comparisons/' + id, {
            headers: auth.getAuthHeader()
          }).then(
            function (response) {
              this.$store.dispatch('updateComparison', response.body)
              this.$store.dispatch('setCurrentComparison', response.body.id)
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
