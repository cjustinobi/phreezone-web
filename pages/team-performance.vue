<template>
  <div>
    <a-page-header sub-title="Team Performance Activities"/>
    <ul id="demo">
      <TreeItem class="item" :item="treeData" />
    </ul>
  </div>
</template>

<script>
  import TreeItem from '@/components/shared/TreeMenu'
  export default {
    name: 'team-performance',
    layout: 'dashboard',
    components: {
      TreeItem
    },
    data() {
      return {
        treeData: '',
      }
    },
    methods: {
      async getTrees() {
        this.treeData = (await this.$axios.$get(`user/${this.userId}/trees`))
      },
    },
    mounted() {
      this.getTrees()
    }
  }
</script>

<style scoped>
  #demo {
    list-style-type: none;
  }
</style>
