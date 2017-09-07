<template>
  <div id="footer" class="site-footer">
    <div class="container-fluid">
      <p class="footer-title">Who Decides Food?</p>
      <p>© {{ new Date().getFullYear() }}</p>
      <div class="footer-icons">
        <a href="https://github.com/mjmeli/" target="_blank"><img src="/static/GitHub-Mark.png" alt="GitHub Mark" /></a>
        <a href="mailto:me@michaelmeli.com" target="_blank"><img src="/static/email-icon.png" alt="Email Me" /></a>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
  #footer {
    background-color: #be1931;
    color: #e7e7e7;
    margin-top: -5px;
    text-align: center;
    padding: 10px;
    padding-bottom: 15px;
  }

  #footer a {
    color: #e7e7e7;
  }

  #footer p {
    margin: 0px;
  }

  #footer .footer-title {
    font-size: 22px;
  }

  #footer .footer-icons {
    margin-top: 10px;
  }

  #footer .footer-icons > a > img {
    height: 45px;
    margin-left: 5px;
    margin-right: 5px;
  }

</style>
