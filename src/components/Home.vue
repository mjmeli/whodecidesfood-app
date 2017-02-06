<template>
  <div>
    <h1>Who Decides Food</h1>
    <p>
      <strong>
        <button class="btn btn-primary" v-on:click="testConnection()">Test Connection</button>
        <div class="quote-area" v-if="testConnection">
          <h2>Data: {{ testData }}</h2>
        </div>
      </strong>
    </p>


  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        testData: ''
      }
    },
    methods: {
      testConnection() {
        this.$http
          .get('http://localhost:3000/api/test', {
            headers: auth.getAuthHeader()
          })
          .then((data) => this.testData = data.body.quote, (data) => console.log(data))
      }
    }
  };
</script>
