// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import LogTime from './components/LogTime.vue'
import TimeEntries from './components/TimeEntries.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

import auth from './auth'

// Global Authorization header
// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// Check the users auth status when the app starts
// auth.checkAuth()

const router = new VueRouter({
  routes: [
    { path: '/', component: Home},
    { path: '/home', component: Home },
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
    { path: '*', redirect: '/home' }
  ],
  // mode: 'history'
})

var bus = new Vue({});

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
