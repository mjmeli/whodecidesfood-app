<template>
  <div id="scoreboard-view" class="panel panel-default" v-if="currentComparison">

    <div class="panel-heading">
      Scoreboard
    </div>

    <ul id="scoreboard-name-list" class="list-group">

      <li class="list-group-item"
          v-for="participant in sortedParticipantsByScore">

        <!-- show name and delete button if not editing -->
          <span class="participant-name">
            {{ participant.name }}
          </span>

          <div class="scoreboard-view-score">
            {{ participant.score }}
          </div>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    props: ['currentComparison'],
    computed: {
      sortedParticipantsByScore() {
        return this.currentComparison.participants.sort((a, b) => b.score - a.score)
      }
    }
  }
</script>

<style>
#scoreboard-view {
  text-align: left;
}

#scoreboard-view .list-group-item {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
