// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Comparison from './components/Comparison.vue'
import CreateComparison from './components/CreateComparison.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(VueResource)
Vue.use(VueRouter)

import auth from './auth'
import store from './vuex/store'

const router = new VueRouter({
  routes: [
    { path: '/', component: Home,
      children: [
        {
          path: '/comparison/new',
          component: CreateComparison,
          beforeEnter: redirectIfNotAuthenticated()
        },
        {
          path: '/comparison/:id',
          component: Comparison,
          beforeEnter: redirectIfNotAuthenticated()
        }
      ]
    },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    // Any invalid route will redirect to home
    { path: '*', redirect: '/' }
  ],
  // mode: 'history'
})

var bus = new Vue({})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  data: {
    bus: bus
  },
  template: '<App/>',
  components: { App }
})

// Returns a function that redirects to login page if not authenticated
function redirectIfNotAuthenticated() {
  return (to, from, next) => {
    if (!auth.isAuthenticated()) {
      router.push('/login')
    } else {
      next()
    }
  }
}
