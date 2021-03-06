import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@js/filters.js'
import '@js/htmlFontSize.js'
import '@js/IsIphoneX.js'
import service from '@js/axios.config.js'

Vue.prototype.$http = service

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
