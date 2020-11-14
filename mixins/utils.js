export default {
  methods: {
    isNumber(val) {
      return /^\d+$/.test(val);
    },
    removeErrorClass(selector) {
      document.querySelector(selector).classList.remove('is-invalid')
    },
    async login({ phone, password }) {
      try {
        let response = await this.$auth.loginWith('local', {data: {phone, password}})
        this.$auth.setUser(response.data.user)
      } catch (e) {
        this.$store.dispatch('notification/setStatus', {
          messages: ['Incorrect login details'],
          success: false
        })
      }
    }
  }
}
