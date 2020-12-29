<template>
  <div>
    <div class="bonuses">
      <div v-if="pckLevel" class="shadow-sm p-3 mb-5 bg-white rounded">
        <p>Next package <span class="badge badge-pill badge-primary">{{ pckLevel.nextPackage.name }}</span></p>
        <h2>
          <a-progress type="circle" :percent="pckLevel.packageLevel"/>
        </h2>
      </div>
      <div v-else>
        <p>Next package <span class="badge badge-pill badge-primary">QSilver</span></p>
        <h2>
          <a-progress type="circle" class="ant-progress-status-exception" :percent="0"/>
        </h2>
      </div>
      <div v-if="membershipBonus" class="shadow-sm p-3 mb-5 bg-white rounded">
        <p>Membership Bonus</p>
        <h2>{{ membershipBonus | currency }}</h2>
      </div>
    </div>
<!--    <div v-for="(bonus, i) in bonuses" :key="i" class="bonuses">-->
<!--      <div class="shadow-sm p-3 mb-5 bg-white rounded">-->
<!--        <p>Performance Bonus</p>-->
<!--        <h2>{{ bonus.performance }}</h2>-->
<!--      </div>-->
<!--      <div class="shadow-sm p-3 mb-5 bg-white rounded">-->
<!--        <p>Shopping Bonus</p>-->
<!--        <h2>{{ bonus.shopping }}</h2>-->
<!--      </div>-->
<!--      <div class="shadow-sm p-3 mb-5 bg-white rounded">-->
<!--        <p>Membership Bonus</p>-->
<!--        <h2>3000</h2>-->
<!--      </div>-->
<!--    </div>-->
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
      membershipBonus: '',
      pckLevel: ''
    }
  },
  methods: {
    async getTrees() {
      this.treeData = (await this.$axios.$get(`user/${this.$auth.user.id}/trees`))
    },
    async getBonuses() {
      this.bonuses = (await this.$axios.$get(`user/${this.$auth.user.id}/perfShopBonus`)).data
    },
    async getMembershipBonus() {
      this.membershipBonus = (await this.$axios.$get(`user/${this.$auth.user.id}/membershipBonus`)).data
    },
    async getPackageLevel() {
      this.pckLevel = (await this.$axios.$get(`user/${this.$auth.user.id}/packageLevel`)).data
    }
  },
  mounted() {
    this.getTrees()
    this.getBonuses()
    this.getPackageLevel()
    this.getMembershipBonus()
  }
}
</script>

<style lang="scss" scoped>
  .bonuses {
    display: flex;
    justify-content: space-between;
    #demo {
      list-style-type: none;
    }
    div {
      min-width: 300px;
      min-height: 200px;
    }
    .badge-primary {
      font-size: 14px;
    }
  }
</style>
