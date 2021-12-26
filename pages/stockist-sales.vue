<template>
  <div>
    <a-page-header sub-title="List of Stockist Sales"/>

    <div style="background: #ECECEC; padding: 30px; margin-bottom: 28px;">
      <a-row :gutter="4">
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              :title="`Total Sales for week ${week}`"
              :value="totalSales | currency"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            />

          </a-card>
        </a-col>

      </a-row>
    </div>

    <h6 v-if="customer">{{ customer.full_name }}</h6>
    <a-row>
      <a-col span="6">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getSales"
          min="1"
          type="number"/>
      </a-col>
      <a-col v-if="isAdmin" span="6">
        <a-input-search
          placeholder="Sponsor ID"
          v-model="userReferral"
          style="width: 188px; margin-bottom: 8px;"
          @search="getMember"
        />
      </a-col>
    </a-row>

    <a-modal v-model="showSoldItems" :title="`Sold Items for week ${week}`" :footer="null">
      <a-table v-if="soldItems" :columns="columns2" :data-source="soldItems" :rowKey="record => record.id" size="small">
        <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
        <span slot="ids" slot-scope="ids, rec">
          <a @click.prevent="getItems(ids)" href="#">View</a>
        </span>
      </a-table>
    </a-modal>

    <a-table v-if="sales" :columns="columns" :data-source="sales" :rowKey="record => record.id" size="small">
      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
      <span slot="ids" slot-scope="ids, rec">
        <a @click.prevent="getItems(ids)" href="#">View</a>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Full Name', dataIndex: 'user.full_name'},
    {title: 'Sponsor ID', dataIndex: 'user.referral'},
    {title: 'Amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount'}},
    {title: 'Date', dataIndex: 'created_at', scopedSlots: { customRender: 'date'}},
    {title: 'View Items', dataIndex: 'ids', scopedSlots: { customRender: 'ids' },},
  ]

  const columns2 = [
    {title: 'Full Name', dataIndex: 'user.full_name'},
    {title: 'Sponsor ID', dataIndex: 'user.referral'},
    {title: 'Item', dataIndex: 'item'},
    {title: 'Date', dataIndex: 'created_at', scopedSlots: { customRender: 'date'}},
    {title: 'Amount', key: 'amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount'}},
  ]

  import DateFormat from '@/mixins/dateFormat'
  export default {
    name: 'sales-list',
    layout: 'dashboard',
    mixins: [DateFormat],
    data() {
      return {
        sales: '',
        columns,
        columns2,
        week: '',
        soldItems: '',
        showSoldItems: false,
        customer: '',
        userReferral: '',
        totalSales: '',
        dateFormat: 'd MMM, Y',
      }
    },
    methods: {
      async getSales() {
        this.sales = (await this.$axios.$post(`user/sales`, {
          weekNumber: this.week,
          userId: this.customer.id
        })).data
      },
      async getItems(ids) {
        const res = await this.$axios.$post(`user/soldItems`, {
          ids
        })
        if (res.success) {
          this.soldItems = res.data
          this.showSoldItems = true
        }
      },
      async setWeek() {
        this.week = await this.$axios.$get('date')
      },
      async getMember() {
        try {
          const res = await this.$axios.$post(`user/null`, {
            userReferral: this.userReferral
          })
          if(res.data) {
            this.customer = res.data
            this.getSales()
          }
        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
      },
    },
    mounted() {
      this.setWeek()
      this.getSales()
    },
    watch: {
      sales: {
        handler: function (val) {
          if (val.length) {
            this.totalSales = val.reduce((prev, cur) => {
              return +prev + +cur.amount;
            }, 0)
          } else this.totalSales = 0
        },
        immediate: true
      }
    }
  }
</script>
