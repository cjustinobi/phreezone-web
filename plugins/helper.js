import Vue from 'vue'

Vue.mixin({

  computed: {
    isAdmin() {
      return this.$auth.user.userType == 1
    },
    referral() {
      return this.$auth.user.referral
    },
    userId() {
      return this.$auth.user.id
    }
  }

})
