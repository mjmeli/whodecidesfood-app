<template>
  <div>
    <!-- Navbar -->
    <navbar></navbar>

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

  import Navbar from './components/Navbar'

  export default {
    components: {
      'navbar': Navbar,
    }
  };
</script>

<style>

  /* Scrollbar always visible */
  html {
    overflow: -moz-scrollbars-vertical;
    overflow-y: scroll;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
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
