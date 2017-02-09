import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    auth_token: "",
    authenticated: false,
    comparisons: [],
    timeEntries: [],
    totalTime: 0,
  },
  mutations: {
    timeUpdate(state,timeEntry) {
      state.totalTime += timeEntry.totalTime;
      state.timeEntries.push(timeEntry);
    },
    deleteTime(state,timeEntry) {
      let index = state.timeEntries.indexOf(timeEntry);
      state.timeEntries.splice(index, 1);
      state.totalTime -= timeEntry.totalTime;
    },
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
          return
        }
      }
    },
    clearComparisons(state) {
      state.comparisons = []
    }
  },
  getters: {
    comparisons: state => state.comparisons
  },
  actions: actions
})

export default store
