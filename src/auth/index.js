import {router} from '../main'

// URL and endpoint constants
const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'sessions/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    console.log("LOGGING IN")
    // context.$http.post(LOGIN_URL, creds, (data) => {
    //   localStorage.setItem('id_token', data.id_token)
    //
    //   this.user.authenticated = true
    //
    //   // Redirect to a specified route
    //   if(redirect) {
    //     router.go(redirect)
    //   }
    //
    // }).error((err) => {
    //   context.error = err
    // })
  },

  signup(context, creds, redirect) {
    console.log("SIGNING UP")
    // context.$http.post(SIGNUP_URL, creds, (data) => {
    //   localStorage.setItem('id_token', data.id_token)
    //
    //   this.user.authenticated = true
    //
    //   if(redirect) {
    //     router.go(redirect)
    //   }
    //
    // }).error((err) => {
    //   context.error = err
    // })
  },

  // To log out, we just need to remove the token
  logout() {
    console.log("LOGGING OUT")
    // localStorage.removeItem('id_token')
    // this.user.authenticated = false
  },

  checkAuth() {
    console.log("CHECKING AUTH")
    // var jwt = localStorage.getItem('id_token')
    // if(jwt) {
    //   this.user.authenticated = true
    // }
    // else {
    //   this.user.authenticated = false
    // }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    console.log("GETTING AUTH HEADER")
    // return {
    //   'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    // }
  }
}
