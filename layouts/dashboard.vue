<template>
  <div class="page-wrapper chiller-theme toggled">
    <Notification />
    <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
      <i class="fas fa-bars"></i>
    </a>
    <DashboardSidebar />
    <main class="page-content">
      <div class="container">
        {{counter}}
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import dashboardInit from '@/mixins/dashboardInit'
  import Notification from '@/components/shared/Notification'
  import DashboardSidebar from '@/components/admin/Sidebar'
  import $ from 'jquery'

  export default {
    mixins: [dashboardInit],
    components: {
      Notification,
      DashboardSidebar
    },
    data () {
      return {
        counter: 0
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    watch: {
      '$route': function () {
        if(window.innerWidth < 767) {
          $(".page-wrapper").removeClass("toggled");
        }
      }
    },
    methods: {
      countUp () {
        this.counter += 1
      }
    },
    beforeMount() {
      let result = this.$crontab.addJob({
        name: 'counter',
        interval: {
          seconds: '/1',
        },
        job: this.countUp
      })
    }
  }


</script>

<style>
  @import "assets/css/dashboard.css";
</style>

