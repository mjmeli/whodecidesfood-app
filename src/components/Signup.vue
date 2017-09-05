<template>
  <div id="signup-page" class="container">
    <h2>Sign Up</h2>
    <p>Sign up for a free account.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error': errors.has('Email') }">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
        v-validate="'required|email'"
        data-vv-name="Email"
      >
      <p class="text-danger" v-if="errors.has('Email')">{{ errors.first('Email') }}</p>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error': errors.has('Password') }">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
        v-validate="'required'"
        data-vv-name="Password"
        name="Password"
      >
      <p class="text-danger" v-if="errors.has('Password')">{{ errors.first('Password') }}</p>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error': errors.has('Password Confirmation') }">
      <input
        type="password"
        class="form-control"
        placeholder="Confirm your password"
        v-model="credentials.password_confirmation"
        v-validate="'required|confirmed:Password'"
        data-vv-name="Password Confirmation"
        data-vv-as="password"
      >
      <p class="text-danger" v-if="errors.has('Password Confirmation')">{{ errors.first('Password Confirmation') }}</p>
    </div>
    <button class="btn btn-primary" @click="submit()" :disabled="errors.any()">Sign Up</button>
  </div>
</template>

<script>
import auth from '../auth'
import error_parse from '../error_parse'

export default {

  data() {
    return {
      credentials: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      error: ''
    }
  },
  methods: {
    submit() {
      // Validate first
      this.$validator.validateAll().then(() => {}, () => {})
      if (this.errors.any()) return
      this.error = '';

      var credentials = {
        user: {
          email: this.credentials.email,
          password: this.credentials.password,
          password_confirmation: this.credentials.password_confirmation
        }
      }

      auth.signup(this, credentials).then((response) => {
        this.$router.push('/')
      }, (error) => {
        this.error = error_parse.parseErrors(error.body)
      });
    }
  },
  created () {
    // Redirect away if authenticated
    if (auth.isAuthenticated()) this.$router.push("/");
  }
}
</script>

<style>
  #signup-page {
    max-width: 850px;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  #signup-page .btn-primary {
    background-color: #be1931;
    border-color: #be1931;
  }

  #signup-page .btn-primary:hover {
    background-color: #ffffff;
    border-color: #be1931;
    color: #be1931;
  }
</style>
