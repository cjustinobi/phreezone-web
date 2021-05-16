export const state = () => ({
  popVisibility: true,
})

export const mutations = {
  SET_POP_VISIBILITY (state, payload) {
    state.popVisibility = payload
  }
}


export const actions = {
  setPopVisibility({ commit}, payload) {
    commit ('SET_POP_VISIBILITY', payload)
  },
}

export const getters = {
  isAuthenticated: state => state.auth.loggedIn,
  loggedInUser: state => state.auth.user,
  popVisibility: state => state.popVisibility


}
