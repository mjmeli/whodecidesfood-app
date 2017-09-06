import api from '../api'
import store from '../vuex/store'

// URL and endpoint constants
const LOGIN_URL = api.shared.API_URL + 'sessions/'
const SIGNUP_URL = api.shared.API_URL + 'users/'

export default {

  // To login, we post to the /api/sessions endpoint and save the auth token
  login(context, creds) {
    return new Promise((resolve, reject) => {
      context.$http
        .post(LOGIN_URL, creds).then(response => {
          store.commit('login', response.body.auth_token)
          resolve(response.body.auth_token)
        }, error => {
          reject(error)
        })
    })
  },

  // To sign up, we post to the /api/users endpoint and save the auth token
  signup(context, creds) {
    return new Promise((resolve, reject) => {
      context.$http
        .post(SIGNUP_URL, creds).then(response => {
          store.commit('signup', response.body.auth_token)
          resolve(response.body.auth_token)
        }, error => {
          reject(error)
        })
    })
  },

  // To log out, we delete the session and remove the token
  logout(context, redirect) {
    var deleteUrl = LOGIN_URL + store.state.auth_token
    context.$http.delete(deleteUrl).then(
      function (response) {
        store.commit('logout')
        if (redirect) {
          this.$router.push(redirect)
        }
      },
      function (error) {
        // Do nothing...
      }
    );
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': store.state.auth_token
    }
  },

  // Get the auth token
  getAuthToken() {
    return store.state.auth_token
  },

  isAuthenticated() {
    return store.state.authenticated
  },
}
