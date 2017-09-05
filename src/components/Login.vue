<template>
  <div id="login-page" class="container">
    <h2>Log In</h2>
    <p>Log in to your account.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }} - please try again.</p>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error': errors.has('Email') }">
      <input
        type="text"
        class="form-control"
        placeholder="Email"
        v-model="credentials.email"
        v-validate="'required'"
        data-vv-name="Email"
      >
      <p class="text-danger" v-if="errors.has('Email')">{{ errors.first('Email') }}</p>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error': errors.has('Password') }">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="credentials.password"
        v-validate="'required'"
        data-vv-name="Password"
      >
      <p class="text-danger" v-if="errors.has('Password')">{{ errors.first('Password') }}</p>
    </div>
    <button class="btn btn-primary btn-md" @click="submit()" :disabled="errors.any()">Login</button>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        session: {
          email: this.credentials.email,
          password: this.credentials.password
        }
      }
      auth.login(this, credentials).then((response) => {
        // Redirect to home
        this.$router.push(redirect)
      }, (error) => {
        this.error = error.body.errors
      });
    }
  }

}
</script>

<style>
  #login-page {
    width: 850px;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  #login-page .btn-primary {
    background-color: #be1931;
    border-color: #be1931;
  }

  #login-page .btn-primary:hover {
    background-color: #ffffff;
    border-color: #be1931;
    color: #be1931;
  }
</style>
