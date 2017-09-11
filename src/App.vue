<template>
  <div id="app">
    <!-- Navbar -->
    <navbar></navbar>

    <!-- Content -->
    <router-view></router-view>

    <!-- Footer -->
    <footer-view></footer-view>

  </div>
</template>

<script>
  import 'bootstrap-js'
  import 'bootstrap-css'

  import Navbar from './components/Navbar'
  import Footer from './components/Footer'

  export default {
    components: {
      'navbar': Navbar,
      'footer-view': Footer
    }
  };
</script>

<style>

  /* Scrollbar always visible on desktop */
  @media (min-width: 768px) {
    html {
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
  }

  /*@media (max-width: 768px) {
    html {
      overflow: hidden;
      height: 100%;
    }

    body {
      height: 100%;
      overflow: auto;
    }
  }*/

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #app .text-danger {
    color: #be1931;
  }

</style>
