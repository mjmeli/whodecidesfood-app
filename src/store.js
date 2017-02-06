import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    auth_token: "",
    authenticated: false,
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
    }
  }
})

export default store
