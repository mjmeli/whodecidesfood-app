<template>
  <div class="jumbotron">
    <h1>Who Decides Food</h1>
    <p>
      <strong>
        Text will probably be inserted here later. </br>
        <button class="btn btn-primary" v-on:click="testConnection()">Test Connection</button>
        <div class="quote-area" v-if="testConnection">
          <h2>Data: {{ testData }}</h2>
        </div>
      </strong>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        testData: ''
      }
    },
    methods: {
      testConnection() {
        this.$http
          .get('http://localhost:3000/api/test')
          .then((data) => this.testData = data.body.quote, (data) => console.log(data))
      }
    }
  };
</script>
