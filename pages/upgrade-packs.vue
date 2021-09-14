<template>
  <div>
    <a-page-header sub-title="EP Upgrade Series"/>
    <Upgrade />
  </div>
</template>

<script>

  import Upgrade from '@/components/shared/Upgrade'

  export default {
    name: 'upgrades',
    layout: 'dashboard',
    components: {
      Upgrade
    },
    data() {
      return {

      }
    }
  }
</script>
