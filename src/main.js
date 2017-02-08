// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Comparison from './components/Comparison.vue'
import CreateComparison from './components/CreateComparison.vue'
import LogTime from './components/LogTime.vue'
import TimeEntries from './components/TimeEntries.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

import auth from './auth'

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
    { path: '/time-entries', component: TimeEntries,
      children: [
        {
          path: 'log-time',
          component: LogTime
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

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
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
