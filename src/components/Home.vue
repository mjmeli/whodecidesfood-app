<template>
  <div>
    <h1>Who Decides Food</h1>
    <p>
      <strong>
        <button class="btn btn-primary" v-on:click="testConnection()">Test Connection</button>
        <div class="quote-area" v-if="testData.message.length > 0">
          <h4>
            {{ testData.message }} <br/>
            Authenticated = {{ testData.authenticated }}
          </h4>
        </div>
      </strong>
    </p>

    <!-- Load component based on authentication -->
    <!-- <comparisons></comparisons> -->
    <comparisons v-if="authenticated"></comparisons>
    <welcome v-else></welcome>
  </div>
</template>

<script>
  import auth from '../auth'
  import Welcome from './Welcome'
  import SelectComparison from './SelectComparison'

  export default {
    data() {
      return {
        testData: {
          message: '',
          authenticated: false,
        }
      }
    },
    components: {
      'welcome': Welcome,
      'comparisons': SelectComparison
    },
    computed: {
      authenticated() {
        return this.$store.state.authenticated;
      }
    },
    methods: {
      testConnection() {
        this.$http
          .get('http://localhost:3000/api/test', {
            headers: auth.getAuthHeader()
          })
          .then((data) => this.testData = data.body, (data) => console.log(data))
      }
    }
  };
</script>
