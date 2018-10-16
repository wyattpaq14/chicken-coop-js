import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from '../router'
import Notify from 'vue2-notify'
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use(Notify, {
  itemClass: 'notification',
  position: 'top-right'
})

Vue.use(BootstrapVue)
Vue.use(VueResource)


new Vue({
  components: { App },
  router,
  render: h => h(App)
}).$mount('#app')


