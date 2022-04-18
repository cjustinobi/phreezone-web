<template>
  <div>
    <a-page-header :sub-title="`All Dividends for week ${week}`"/>
    <a-row>
      <a-col span="4">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getDividends"
          min="1"
          type="number"/>
      </a-col>
      <a-col span="8" v-if="!isAdmin && isStockist">
        <a-input
          placeholder="Member Code"
          v-model="ref"
          style="width: 188px; margin-bottom: 8px;"
          />
        <a-button type="primary" @click="getDividends2">Get Dividend</a-button>
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
      v-if="(isAdmin && dividends) || (!isStockist)"
      :columns="columns"
      :data-source="filteredDividends"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >
      <span slot="user" slot-scope="fn">{{ fn.full_name }}</span>
      <span slot="amount" slot-scope="amount"><b>{{ amount }}</b></span>
    </a-table>
    <a-table
      v-if="!isAdmin && isStockist && dividends2"
      :columns="columns"
      :data-source="dividends2"
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
    }
  ];


  export default {
    name: 'dividends',
    layout: 'dashboard',
    data() {
      return {
        week: '',
        columns,
        ref: '',
        dividends: '',
        dividends2: '',
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
      async getDividends2() {
        if (!this.ref) return this.$message.error('Enter referral code')
        const res = await this.$axios.$post('user/dividends2', {
          ref: this.ref
        })
        if (res.success) {
          return this.dividends2 = res.data
        }
        return this.$message.error(res.message)
      },
      async setWeek() {
        this.week = await this.$axios.$get('date')
      }
    },
    computed: {
      filteredDividends() {
        if (this.isAdmin) {
          return this.dividends
        } else if (!this.isStockist) {
          return this.dividends.filter(dividend => dividend.user_id == this.userId)
        }
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
