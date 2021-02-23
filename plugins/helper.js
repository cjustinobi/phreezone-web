import Vue from 'vue'

Vue.mixin({

  data() {
    return {
      amounts: [5000, 15000, 50000, 150000, 300000, 600000, 1200000]
    }
  },
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
