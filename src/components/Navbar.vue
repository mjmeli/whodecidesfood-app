<template>
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
          <router-link to="/" class="navbar-brand">
            <img id="logo" src="static/logo.png" alt="whoDecidesFood?">
          </router-link>
        </div>
        <div id="navbar-options" class="navbar-collapse collapse" data-toggle="collapse" data-target="#navbar-options">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li v-if="!authenticated">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!authenticated" class="signup-link">
              <router-link to="/signup">Sign-Up</router-link>
            </li>
            <li v-if="authenticated" class="logout-link">
              <a href="#" @click="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import auth from '../auth';

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

  /* Desktop */
  @media (min-width: 768px) {
    #logo {
      height: 100%;
      width: auto;
      max-height: 56px;
    }

    #navbar .navbar-brand {
      height: 76px; /* navbar height, not image height = image height + padding */
      padding-top: 10px;
      padding-bottom: 10px;
    }

    #navbar .navbar-toggle {
      padding: 10px;
      margin: 21px 15px 21px 0;
    }

    /* ***** */
      /* line height is 20px by default
         so determine new .navbar-brand height
         then compute padding by adding the appropriate amount
         i.e. 80px navbar-brand height = 30px on top and bottom */
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
    /* ***** */
  }

  /* Mobile */
  @media (max-width: 768px) {
    #logo {
      height: 100%;
      width: auto;
      max-height: 36px;
    }

    #navbar .navbar-brand {
      height: 56px; /* navbar height, not image height = image height + padding */
      padding-top: 10px;
      padding-bottom: 10px;
    }

    #navbar .navbar-toggle {
      padding: 10px;
      margin: 10px 15px 10px 0;
    }

    /* ***** */
      /* line height is 20px by default
         so determine new .navbar-brand height
         then compute padding by adding the appropriate amount
         i.e. 80px navbar-brand height = 30px on top and bottom */
      #navbar .nav > li > a {
        padding-top: 18px;
        padding-bottom: 18px;
      }

      #navbar .nav > li > a:hover {
        color: #be1931;
      }

      #navbar .nav > li > .btn {
        padding-top: 18px;
        padding-bottom: 18px;
      }
    /* ***** */
  }

  #navbar .navbar {
    margin-bottom: 0px;
  }

  #navbar .navbar-default {
    border-top-width: 2px;
    border-top-color: #be1931;
    border-bottom-width: 2px;
  }

  #navbar .nav > li {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
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

</style>
