const state = {
  isIphoneX: false
}

const mutations = {
  SET_ISIPHONEX: (state, flag) => {
    state.isIphoneX = flag
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
