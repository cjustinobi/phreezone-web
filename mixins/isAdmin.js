export default {
  computed: {
    isAdmin() {
      let x = this.$auth.user.userType == 1
      debugger
      return x
    }
  }
}
