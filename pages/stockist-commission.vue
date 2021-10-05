<template>
  <div>
    <a-page-header :sub-title="`All Stockist Sales for week ${week}`"/>
    <a-row>
      <a-col span="6">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeekCommissions"
          min="1"
          type="number"/>
      </a-col>
      <a-col span="6">
        <a-input
          placeholder="Sponsor ID"
          v-model="userReferral"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeekCommissions"
        />
      </a-col>
      <a-col span="6">
        <a-button @click="downloadBonus">Download</a-button>
      </a-col>
    </a-row>

    <a-table v-if="bonuses" :columns="columns" :data-source="bonuses" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small">

      <span slot="paid" slot-scope="paid">
      <a-tag :color="paid ? 'green' : 'volcano'">
        {{ paid == null ? 'Paid' : 'Not Paid' }}
      </a-tag>
    </span>
      <span slot="pkg" slot-scope="txt, rec" v-if="rec.package">{{ rec.package.name == null ? 'N/P' : rec.package.name }}</span>
<!--            <span slot="referral" slot-scope="item">{{ ref }}</span>-->
      <span slot="fullName" slot-scope="fn, row">{{ row.first_name }} {{ row.last_name }}</span>
      <span slot="total" slot-scope="total, rec"><b>{{(+rec.shopping_sum + +rec.pack_sum + +rec.stream_sum) | currency }}</b></span>
      <span slot="fn" slot-scope="fn">{{ fn.full_name }}</span>
    </a-table>
  </div>
</template>

<script>
  let columns = [
    {
      title: 'Full Name',
      dataIndex: 'user',
      scopedSlots: { customRender: 'fn' },
      fixed: 'left',
      // width: 110
    },
    {
      title: 'Stockist Code',
      dataIndex: 'user.referral',
      scopedSlots: { customRender: 'referral' }
    },
    {
      title: 'Shopping',
      dataIndex: 'shopping_sum',
      scopedSlots: { customRender: 'shopping' }
    },
    {
      title: 'Stream Sales',
      dataIndex: 'stream_sum',
    },
    {
      title: 'Upgrade Pack',
      dataIndex: 'pack_sum',
    },
    {
      title: 'Total',
      scopedSlots: { customRender: 'total' }
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      scopedSlots: { customRender: 'paid' },
    },
    // { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ];


  export default {
    name: 'stockist-commissions',
    layout: 'dashboard',
    data() {
      return {
        columns,
        bonuses: '',
        week: '',
        userReferral: this.$auth.user.userType == 1 ? '' : this.$auth.user.referral
      }
    },
    methods: {
      async getCommissions() {
        this.bonuses = (await this.$axios.$post('admin/stockist-commission', {
          referral: this.userReferral ,
          setWeek: this.week
        })).data
      },
      downloadBonus() {
        return window.open(`${this.$axios.defaults.baseURL}exportBonuses?referral=${this.userReferral}&week=${this.week}`)
      },
      getWeekCommissions() {
        this.getCommissions()
      },
      setWeek() {
        this.week = this.$dateFns.getWeek(new Date()) - 1
      }
    },
    // computed: {
    //   columns() {
    //     return this.isAdmin ? columns : columns.filter(column => column.dataIndex !== 'sponsor_shopping_amount')
    //   },
    //   data() {
    //     let commissions = this.bonuses
    //     if (this.isAdmin) {
    //       return commissions
    //     }
    //     for (let com of commissions) {
    //       com['shopping_amount'] = com.sponsor_shopping_amount + com.shopping_amount
    //     }
    //     return commissions
    //   }
    // },
    mounted() {
      this.getCommissions()
      this.setWeek()
    }
  }
</script>

<style scoped>

</style>
