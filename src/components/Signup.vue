<template>
  <div>
    <h2>Sign Up</h2>
    <p>Sign up for a free account.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Confirm your password"
        v-model="credentials.password_confirmation"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">Access</button>
  </div>
</template>

<script>
import auth from '../auth'

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
      var credentials = {
        user: {
          email: this.credentials.email,
          password: this.credentials.password,
          password_confirmation: this.credentials.password_confirmation
        }
      }
      auth.signup(this, credentials, '/login')
    }
  }
}
</script>
