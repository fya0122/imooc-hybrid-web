import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'
import device from './modules/device'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goods,
    device,
    user
  },
  getters
})

export default store
