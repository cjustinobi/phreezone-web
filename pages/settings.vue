<template>
  <div>
    <a-page-header sub-title="Settings"/>
    <ChangePassword />
  </div>
</template>

<script>
  import ChangePassword from '~/components/shared/ChangePassword'
  export default {
    name: 'settings',
    layout: 'dashboard',
    components: {
      ChangePassword
    }
  }
</script>

<style scoped>

</style>
