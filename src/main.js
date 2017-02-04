// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import LogTime from './components/LogTime.vue'
import TimeEntries from './components/TimeEntries.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

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
