const state = {
  username: undefined
}

const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  CLEAR_USERNAME: (state) => {
    state.username = undefined
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
