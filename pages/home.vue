<template>
  <div>
    <div v-for="(bonus, i) in bonuses" :key="i" class="bonuses">
      <div class="shadow-sm p-3 mb-5 bg-white rounded">
        <p>Performance Bonus</p>
        <h2>{{ bonus.performance }}</h2>
      </div>
      <div class="shadow-sm p-3 mb-5 bg-white rounded">
        <p>Shopping Bonus</p>
        <h2>{{ bonus.shopping }}</h2>
      </div>
      <div class="shadow-sm p-3 mb-5 bg-white rounded">
        <p>Membership Bonus</p>
        <h2>3000</h2>
      </div>
    </div>
    <ul id="demo">
      <TreeItem class="item" :item="treeData" />
    </ul>
  </div>
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
      treeData: '',
      bonuses: '',
    }
  },
  methods: {
    async getTrees() {
      this.treeData = (await this.$axios.$get(`user/${this.$auth.user.id}/trees`))
    },
    async getBonuses() {
      this.bonuses = (await this.$axios.$get(`user/${this.$auth.user.id}/perfShopBonus`)).data
    },
  },
  mounted() {
    this.getTrees()
    this.getBonuses()
  }
}
</script>

<style lang="scss" scoped>
  .bonuses {
    display: flex;
    justify-content: space-between;
    div {
      min-width: 300px;
      min-height: 200px;
    }
  }
</style>
