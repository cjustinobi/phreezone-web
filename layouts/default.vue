<template>
  <div>
    <AppHeader />
    <Nuxt />
    <AppFooter />
    <div id="preloader"></div>
  </div>
</template>

<script>

  import AppHeader from '@/components/guest/AppHeader'
  import AppFooter from '@/components/guest/AppFooter'

  export default {
    components: {
      AppHeader,
      AppFooter,
    }
  }
</script>

<style>
  @import 'assets/vendor/bootstrap/css/bootstrap.min.css';
  @import 'assets/vendor/icofont/icofont.min.css';
  @import 'assets/vendor/boxicons/css/boxicons.min.css';
  @import 'assets/vendor/remixicon/remixicon.css';
  @import 'assets/vendor/venobox/venobox.css';
  @import 'assets/vendor/aos/aos.css';
  @import 'assets/css/style.css';
</style>
