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
            <p class="participant-score">{{ participant.score }}</p>
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

#scoreboard-view .participant-score {
  font-size: 24px;
  margin-top: 1px;
  margin-bottom: 7px;
}

</style>
