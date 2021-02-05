<template>
  <div>
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
