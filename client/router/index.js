import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/DoorControl').default
    },
    {
      path: '/door',
      name: 'landing-page',
      component: require('@/components/DoorControl').default
    },
    {
      path: '/cam',
      name: 'landing-page',
      component: require('@/components/DoorControl').default
    },
    {
      path: '/login',
      name: 'landing-page',
      component: require('@/components/Login').default
    },
    {
      path: '/logout',
      name: 'landing-page',
      component: require('@/components/DoorControl').default
    }
  ]
})