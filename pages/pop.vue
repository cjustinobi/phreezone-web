<template>
  <div class="container">
    <component :is="createList"></component>
  </div>
</template>

<script>

  import Create from '@/components/user/Pop'
  import List from '@/components/admin/Pop'

  export default {
    name: 'pop-page',
    layout: 'dashboard',
    components: {
      Create,
      List
    },
    data() {
      return {
      }
    },
    computed: {
      createList() {
        return this.isAdmin ? 'List' : 'Create'
      }
    },
    methods: {
      setFacet(val) {
        this.createList = val
      }
    },

  }
</script>

<style lang="scss" scoped>
  img {
    max-width: 300px;
  }
  input {
    display: none;
  }
  .buttons {
    margin-top: 24px;
    .btn-info {
      margin-left: 20px;
    }
  }
</style>
