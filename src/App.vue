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
              <li v-if="!authenticated"><router-link to="/login">Login</router-link></li>
              <li v-if="!authenticated" class="signup-link"><router-link to="/signup">Sign-Up</router-link></li>
              <li v-if="authenticated" class="logout-link"><a href="#" @click="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- Content -->
    <router-view></router-view>

    <footer class="site-footer">
      <div class="container">
        <h4>Who Decides Food?</h4>
        <p>Contact: <a href="https://github.com/mjmeli/">@mjmeli</a></p>
      </div>
    </footer>

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

#navbar .navbar {
  margin-bottom: 0px;
}

#navbar .navbar-default {
  border-top-width: 2px;
  border-top-color: #be1931;
  border-bottom-width: 2px;
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

#navbar .nav > li {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
}

#navbar .nav > li > a {
  padding-top: 28px;
  padding-bottom: 28px;
}

#navbar .nav > li > a:hover {
  color: #be1931;
}

#navbar .nav > li > .btn {
  padding-top: 28px;
  padding-bottom: 28px;
}

#navbar .navbar-toggle {
  padding: 10px;
  margin: 21px 15px 21px 0;
}

#navbar .signup-link {
  background-color: #be1931;
}

#navbar .signup-link > a {
  color: #e7e7e7;
  font-weight: bold;
}

#navbar .signup-link > a:hover {
  color: #e7e7e7 !important;
  font-weight: bold;
}

#navbar .logout-link {
  background-color: #be1931;
}

#navbar .logout-link > a {
  color: #e7e7e7;
  font-weight: bold;
}

#navbar .logout-link > a:hover {
  color: #e7e7e7 !important;
  font-weight: bold;
}

.site-footer {
  background-color: #be1931;
  color: #e7e7e7;
  margin-top: -5px;
  text-align: center;
  padding: 5px;
}

.site-footer a {
  color: #e7e7e7;
}
</style>
