<template>
  <div>
    <a-page-header sub-title="Register New Member"/>
    <Register />
  </div>
</template>

<script>
  import Register from '@/components/guest/Register'
  export default {
    name: 'register',
    layout: 'dashboard',
    components: {
      Register
    }
  }
</script>

<style scoped>

</style>
