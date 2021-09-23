<template>
  <div>
    <a-page-header :sub-title="`Total Sales & Pay Record for week ${week}`"/>

        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeeklySales"
          min="1"
          type="number"/>

    <a-spin v-if="loading"/>

    <a-row :gutter="16" v-if="sales">
      <a-col :md="6">
        <a-card title="Sales Price">{{ sales.normalAmount | currency }}</a-card>
      </a-col>
      <a-col :md="6">
        <a-card title="Real Sales Price">{{ sales.amount | currency }}</a-card>
      </a-col>
      <a-col :md="6">
        <a-card title="Total Weekly Payout">{{ sales.streams | currency }}</a-card>
      </a-col>
    </a-row>
    <a-empty v-else />

  </div>
</template>

<script>
  let columns = [
    {
      title: 'Real Sales Price',
      dataIndex: 'normalAmount'
    },
    {
      title: 'Sales Price',
      dataIndex: 'amount'
    },
    {
      title: 'Total Weekly Payout',
      dataIndex: 'streams'
    }
  ]

  export default {
    name: 'weekly-sales',
    layout: 'dashboard',
    data() {
      return {
        loading: false,
        columns,
        week: '',
        sales: ''
      }
    },
    methods: {
      async getWeeklySales() {
        if (!this.week) return

        this.loading = true
        let res = await this.$axios.$post(`admin/weeklySales/${this.week}`)

        if (res) {
          this.loading = false
          this.sales = res.data
        }
      }
    },

    beforeMount() {
      if (!this.isAdmin) {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>

</style>
