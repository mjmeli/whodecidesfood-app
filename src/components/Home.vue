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

    </br></br>

    <!-- Load component based on authentication -->
    <!-- <comparisons></comparisons> -->
    <comparisons v-if="authenticated"></comparisons>
    <welcome v-else></welcome>
  </div>
</template>

<script>
  import auth from '../auth'
  import store from '../store'
  import Welcome from './Welcome'
  import SelectComparison from './SelectComparison'

  export default {
    data() {
      return {
        testData: ''
      }
    },
    components: {
      'welcome': Welcome,
      'comparisons': SelectComparison
    },
    computed: {
      authenticated() {
        return store.state.authenticated;
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
