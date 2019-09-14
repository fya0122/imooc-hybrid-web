import Vue from 'vue'
const state = {
  shoppingDatas: []
}

const mutations = {
  ADD_SHOPPINGDATA: (state, good) => {
    const isExist = state.shoppingDatas.some((item) => {
      if (item.id === good.id) {
        item.number += 1
        return true
      }
    })
    if (!isExist) {
      /* 通过Vue.set把新添加的属性设置为响应式的 */
      Vue.set(good, 'isCheck', false)
      Vue.set(good, 'number', 1)
      state.shoppingDatas.push(good)
    }
  },
  CHANGESHOPPINGDATANUMBER: (state, data) => {
    state.shoppingDatas[data.index].number = data.number
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
