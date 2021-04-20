import Vue from 'vue'

Vue.mixin({

  data() {
    return {
      windowWidth: '',
      amounts: [
        { title: 'Treasure', amount: 5000 },
        { title: 'Bronze', amount: 15000 },
        { title: 'Silver', amount: 50000 },
        { title: 'Silver Star', amount: 150000 },
        { title: 'Gold', amount: 300000 },
        { title: 'Platinum', amount: 600000 },
        { title: 'Vip Royal', amount: 1200000 }
      ]
    }
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user.userType == 1
    },
    isStockist() {
      return this.$auth.user.isAgent
    },
    referral() {
      return this.$auth.user.referral
    },
    userId() {
      return this.$auth.user.id
    }
  },
  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
    this.getWindowWidth()
  }

})
