import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    auth_token: "",
    authenticated: false,
    comparisons: [],
    currentComparisonId: -1,
  },
  mutations: {
    login(state, auth_token) {
      state.auth_token = auth_token;
      state.authenticated = true;
    },
    signup(state, auth_token) {
      state.auth_token = auth_token;
    },
    logout(state) {
      state.auth_token = "";
      state.authenticated = false;
    },
    addComparison(state, comparison) {
      state.comparisons.push(comparison)
    },
    deleteComparison(state, comparison) {
      for (var i = 0; i < state.comparisons.length; i++) {
        if (state.comparisons[i].id == comparison.id) {
          state.comparisons.splice(i, 1)
          if (comparison.id == state.currentComparisonId) {
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
      for (var i = 0; i < state.comparisons.length; i++) {
        if (state.comparisons[i].id == comparison.id) {
          state.comparisons.splice(i, 1, comparison)
        }
      }
    },
    setCurrentComparison(state, comparisonId) {
      if (state.comparisons.find((p) => p.id == comparisonId) == undefined) {
        state.currentComparisonId = -1
      } else {
        state.currentComparisonId = comparisonId
      }
    }
  },
  getters: {
    comparisons: state => state.comparisons,
    currentComparison: state => state.comparisons.find((p) => p.id == state.currentComparisonId)
  },
  actions: actions
})

export default store
