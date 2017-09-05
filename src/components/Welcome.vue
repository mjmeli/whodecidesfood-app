<template>
  <div id="welcome-page" class="container-fluid">

    <div class="welcome-page-container">

      <div class="welcome-page-text">
        <p>The #1 cause of fights in relationships is deciding where to eat.
        <br/>
        Handle this in a nuanced manner by turning it into a competition!</p>
        <br/>
        <router-link to="/signup" tag="button" class="btn btn-primary btn-lg">Sign-Up Now!</router-link>
      </div>

      <img class="img-responsive welcome-page-image" src="static/couple.jpg" alt="Couple eating romantic dinner after arguing about where to eat" />
    </div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  #welcome-page {
    padding: 0px;
    margin-top: 0px;
    color: #e7e7e7;
  }

  .welcome-page-container {
    position: relative;
    display: inline-block;
  }

  .welcome-page-image {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .welcome-page-text {
      position: absolute;
      color: #e7e7e7;
      width: 100%;
      top: 35%;
      text-align: center;
  }

  .welcome-page-text > p {
    display: inline-block;
    background-color: #be1931;
    box-shadow: 1em 0 0 #be1931, -1em 0 0 #be1931;
    padding: 10px 0px;
    box-decoration-break: clone;
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .welcome-page-text > .btn {
    background-color: #be1931;
    border-color: #be1931;
    margin-bottom: 0px;
    margin-top: 2em;
  }

  .welcome-page-text > .btn:hover {
    background-color: #ffffff;
    border-color: #be1931;
    color: #be1931;
  }

  @media (min-width: 768px) {
      .welcome-page-text > p {
        font-size: 30px;
      }
  }

  @media (max-width: 768px) {
    .welcome-page-text > p {
      font-size: 16px;
    }
  }
</style>
