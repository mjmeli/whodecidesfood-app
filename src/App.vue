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
          <li><router-link to="/time-entries">Time Entries</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign-Up</router-link></li>
        </ul>
      </div>
    </nav>

    <!-- Container for content -->
    <div class="container">
      <div class="col-sm-3">
        <sidebar :time="totalTime"></sidebar>
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap-js'
  import 'bootstrap-css'

  import Sidebar from './components/Sidebar'
  import store from './store';
  export default {
    components: { 'sidebar': Sidebar },
    computed: {
      totalTime() {
        return store.state.totalTime;
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
