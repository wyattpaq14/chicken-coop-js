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
      name: 'door-control',
      component: require('@/components/DoorControl').default
    },
    {
      path: '/cam',
      name: 'camera',
      component: require('@/components/DoorControl').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path: '/logout',
      name: 'logout',
      component: require('@/components/DoorControl').default
    }
  ]
})