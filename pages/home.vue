<template>
  <ul id="demo">
    <tree-item
      class="item"
      :item="treeData"
    ></tree-item>
  </ul>
</template>

<script>

import TreeItem from '@/components/shared/TreeMenu'
export default {
  name: 'home',
  layout: 'dashboard',
  components: {
    TreeItem
  },
  data() {
    return {
      treeData: ''
    }
  },
  methods: {
    async getTrees() {
      this.treeData = (await this.$axios.$get('tree/getTrees'))[0]
    },
  },
  mounted() {
    this.getTrees()
  }
}
</script>

<style >

</style>
