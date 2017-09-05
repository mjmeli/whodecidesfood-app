import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    auth_token: "",
    authenticated: false,
    comparisons: [],
    currentComparisonId: -1
  },
  mutations: {
    login(state, auth_token) {
      state.auth_token = auth_token;
      state.authenticated = true;
    },
    signup(state, auth_token) {
      state.auth_token = auth_token;
      state.authenticated = true;
    },
    logout(state) {
      state.auth_token = "";
      state.authenticated = false;
    },
    addComparison(state, comparison) {
      state.comparisons.push(comparison)
    },
    deleteComparison(state, comparisonId) {
      for (var i = 0; i < state.comparisons.length; i++) {
        if (state.comparisons[i].id == comparisonId) {
          state.comparisons.splice(i, 1)
          if (comparisonId == state.currentComparisonId) {
            state.currentComparisonId = -1
          }
          return
        }
      }
    },
    clearComparisons(state) {
      state.comparisons = []
      state.currentComparisonId = -1
    },
    updateComparison(state, comparison) {
      var oldComparison = state.comparisons.find((c) => c.id == comparison.id)
      if (oldComparison != undefined) {
        // we have to replace each field individually as otherwise the
        // state model doesn't work for some reason...why? idk!
        var oldComparisonIndex = state.comparisons.indexOf(oldComparison)
        state.comparisons[oldComparisonIndex].participants = comparison.participants
        state.comparisons[oldComparisonIndex].title = comparison.title
        state.comparisons[oldComparisonIndex].decision_ids = comparison.decision_ids
        state.comparisons[oldComparisonIndex].owner = comparison.owner
      }
    },
    setCurrentComparison(state, comparisonId) {
      state.currentComparisonId = comparisonId
    },
    addParticipantToComparison(state, data) {
      var comparisonId = data[0], participant = data[1]
      var comparison = state.comparisons.find((c) => c.id == comparisonId)
      comparison.participants.push(participant)
    },
    deleteParticipantFromComparison(state, data) {
      var comparisonId = data[0], participantId = data[1]
      var comparison = state.comparisons.find((c) => c.id == comparisonId)
      var participant = comparison.participants.find((p) => p.id == participantId)
      var participantIndex = comparison.participants.indexOf(participant)
      comparison.participants.splice(participantIndex, 1)
    },
    updateParticipantNameInComparison(state, data) {
      var comparisonId = data[0], participantId = data[1], newName = data[2]
      var comparison = state.comparisons.find((c) => c.id == comparisonId)
      var participant = comparison.participants.find((p) => p.id == participantId)
      participant.name = newName.trim()
    }
  },
  getters: {
    comparisons: state => state.comparisons,
    currentComparison: state => state.comparisons.find((p) => p.id == state.currentComparisonId)
  },
  actions: actions
})

export default store
