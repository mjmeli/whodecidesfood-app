<template>
  <div>
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

</style>
