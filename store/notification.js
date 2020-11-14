export const state = () => ({
  success: null,
  messages: '',
  loading: false
})

export const mutations = {
  SET_STATUS (state, payload) {
    if (payload.success === true) {
      state.success = payload.success
      state.messages = payload.messages
    }
    if (payload.success === false) {
      state.success = payload.success
      state.messages = payload.messages
    }
    if (payload.success === null) {
      state.success = payload.success
      state.messages = ''
    }
  },

  SET_LOADING (state, value) {
    state.loading = value
  }
}

export const actions = {
  setStatus({ commit}, payload) {
    console.log(payload)
    commit ('SET_STATUS', payload)
  },

  setLoading({ commit }, value) {
    commit('SET_LOADING', value)
  }
}

export const getters = {
  success: state => state.success,
  messages: state => state.messages,
  loading: state => state.loading
}
