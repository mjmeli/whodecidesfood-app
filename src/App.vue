<template>
  <div id="wrapper">
    <!-- Navbar -->
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Who Decides Food?
        </a>
        <ul class="nav navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign-Up</router-link></li>
          <li><button class="btn btn-primary" v-if="authenticated" @click="logout()">Logout</button></li>
        </ul>
      </div>
    </nav>

    <!-- Container for content -->
    <div class="container text-center">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import 'bootstrap-js'
  import 'bootstrap-css'

  import auth from './auth';
  import store from './vuex/store';

  export default {
    computed: {
      authenticated() {
        return store.state.authenticated;
      }
    },
    methods: {
      logout() {
        auth.logout(this, '/')
      }
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
