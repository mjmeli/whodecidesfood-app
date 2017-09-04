<template>
  <div id="wrapper">
    <!-- Navbar -->
    <div id="navbar">
      <nav class="navbar navbar-default navbar-static-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-options">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img id="logo" src="static/logo.png" alt="whoDecidesFood?">
            </a>
          </div>
          <div id="navbar-options" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/signup">Sign-Up</router-link></li>
              <li><button class="btn btn-primary" v-if="authenticated" @click="logout()">Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

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

  export default {
    computed: {
      authenticated() {
        return this.$store.state.authenticated;
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

#logo {
  height: 100%;
  width: auto;
  max-height: 56px;
}

#navbar .navbar-brand {
  height: 76px; /* navbar height, not image height */
  padding-top: 10px;
  padding-bottom: 10px;
}

/* line height is 20px by default
   so determine new .navbar brand height
   then add the appropriate amount
   i.e. 80px height = 30px on top and bottom */

#navbar .nav > li > a {
  padding-top: 28px;
  padding-bottom: 28px;
}

#navbar .nav > li > .btn {
  padding-top: 28px;
  padding-bottom: 28px;
}

#navbar .navbar-toggle {
  padding: 10px;
  margin: 21px 15px 21px 0;
}
</style>
