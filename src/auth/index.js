import store from '../store'

// URL and endpoint constants
const API_URL = 'http://localhost:3000/api/'
const LOGIN_URL = API_URL + 'sessions/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  // user: {
  //   authenticated: false
  // },

  // To login, we post to the /api/sessions endpoint and save the auth token
  login(context, creds, redirect) {
    console.log("LOGGING IN")

    context.$http.post(LOGIN_URL, creds).then(
      function (response) {
        store.commit('login', response.body.auth_token)
        if (redirect) {
          this.$router.push(redirect)
        }
      },
      function (error) {
        console.log(error.body.errors)
      }
    );
  },

  // To sign up, we post to the /api/users endpoint and save the auth token
  signup(context, creds, redirect) {
    console.log("SIGNING UP")

    context.$http.post(SIGNUP_URL, creds).then(
      function (response) {
        store.commit('signup', response.body.auth_token)
        if (redirect) {
          this.$router.push(redirect)
        }
      },
      function (error) {
        console.log(error.body.errors)
      }
    );
  },

  // To log out, we delete the session and remove the token
  logout(context, redirect) {
    console.log("LOGGING OUT")

    var deleteUrl = LOGIN_URL + store.state.auth_token
    context.$http.delete(deleteUrl).then(
      function (response) {
        store.commit('logout')
        if (redirect) {
          this.$router.push(redirect)
        }
      },
      function (error) {
        console.log(error.body.errors)
      }
    );
  },

  // checkAuth() {
  //   console.log("CHECKING AUTH")
  //
  //   var jwt = localStorage.getItem('id_token')
  //   if(jwt) {
  //     this.user.authenticated = true
  //   }
  //   else {
  //     this.user.authenticated = false
  //   }
  // },

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
  }
}