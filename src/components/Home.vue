<template>
  <div>
    <!-- Load component based on authentication -->
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
