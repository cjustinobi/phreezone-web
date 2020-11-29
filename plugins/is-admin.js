import Vue from 'vue'

Vue.mixin({

  computed: {
    isAdmin() {
      return this.$auth.user.userType == 1
    }
  }

})
