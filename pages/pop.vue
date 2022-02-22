<template>
  <div class="container">
    <StockistPops v-if="listPop" />
    <component @togglePop="togglePop" :popState="listPop" :is="createList" />
  </div>
</template>

<script>

  import Create from '@/components/user/Pop'
  import StockistPops from '@/components/user/StockistPops'
  import List from '@/components/admin/Pop'

  export default {
    name: 'pop-page',
    layout: 'dashboard',
    components: {
      Create,
      List,
      StockistPops
    },
    data() {
      return {
        listPop: false,
        // formVisibility: false
      }
    },
    computed: {
      createList() {
        return this.listPop ? 'List' : 'Create'
      },
      // formVisibility() {
      //   return this.store.getters['formVisibility']
      // }
    },
    methods: {
      togglePop({ formVisibility }) {
        if (formVisibility) {
          this.listPop = false
          return this.$store.dispatch('setPopVisibility', formVisibility)
        }
        this.listPop = !this.listPop
        this.$store.dispatch('setPopVisibility', formVisibility)
      },

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
