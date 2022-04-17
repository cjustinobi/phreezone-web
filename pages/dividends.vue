<template>
  <div>
    <a-page-header :sub-title="`All Dividends for week ${week}`"/>
    <a-row>
      <a-col span="6">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getDividends"
          min="1"
          type="number"/>
      </a-col>
      <a-col v-if="isAdmin" span="6">
        <download-excel
          class="btn btn-primary"
          :data="dividends"
          :fields="excelFields"
          worksheet="My Worksheet"
          :name="`dividend-${week}.xls`"
        >
          Download
        </download-excel>
      </a-col>
    </a-row>

    <a-table
      v-if="dividends"
      :columns="columns"
      :data-source="dividends"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >
      <span slot="user" slot-scope="fn">{{ fn.full_name }}</span>
      <span slot="amount" slot-scope="amount"><b>{{ amount }}</b></span>
    </a-table>
  </div>
</template>

<script>
  let columns = [
    {
      title: 'Full Name',
      dataIndex: 'user',
      scopedSlots: {
        customRender: 'user',
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      scopedSlots: { customRender: 'amount' }
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'paid',
    //   scopedSlots: { customRender: 'paid' },
    // },
    // { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ];


  export default {
    name: 'dividends',
    layout: 'dashboard',
    data() {
      return {
        week: '',
        columns,
        dividends: '',
        excelFields: {
          Fullname: 'user.full_name',
          ID: 'user.referral',
          AccountNumber: {
            field: 'user.account_number',
            callback: val => {
              return JSON.stringify(val)
            }
          },
          BankName: 'user.bank_name',
          Amount: 'amount'
        }
      }
    },
    methods: {
      async getDividends() {
        this.dividends = (await this.$axios.$post('user/dividends', {
          setWeek: this.week
        })).data
      },
      async setWeek() {
        this.week = await this.$axios.$get('date')
      }
    },
    mounted() {
      this.getDividends()
      this.setWeek()
    }
  }
</script>

<style scoped>

</style>
