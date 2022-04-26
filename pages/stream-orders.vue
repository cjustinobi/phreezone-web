<template>
  <div>
    <a-page-header sub-title="Stream Orders"/>

    <div style="background: #ECECEC; padding: 30px; margin-bottom: 28px;">
      <a-row :gutter="4">
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              :title="`Total Stream Orders for week ${week}`"
              :value="totalSales | currency"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            />

          </a-card>
        </a-col>

      </a-row>
    </div>

<!--    <h6 v-if="customer">{{ customer.full_name }}</h6>-->
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
<!--        <a-button type="primary" @click="implementStream" :loading="loading">Implement</a-button>-->
<!--        <a-input-search-->
<!--          placeholder="Sponsor ID"-->
<!--          v-model="userReferral"-->
<!--          style="width: 188px; margin-bottom: 8px;"-->
<!--          @search="getMember"-->
<!--        />-->
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

    <a-table v-if="sales" :columns="filteredCol" :data-source="sales" :rowKey="record => record.id" size="small">
      <span slot="buyer" slot-scope="txt, rec">
        {{txt}} <br><a-tag color="green">{{ rec.user.referral }}</a-tag>
      </span>
      <span slot="seller" slot-scope="txt, rec">
        {{txt}} <br><a-tag color="green">{{ rec.sold_by.referral }}</a-tag>
      </span>
       <span slot="paid" slot-scope="paid">
        <a-tag :color="paid == '1' ? 'green' : 'volcano'">
          {{ paid == '1' ? 'Implemented' : 'Not Implemented' }}
        </a-tag>
      </span>
      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
      <span slot="id" slot-scope="id">
        <a @click.prevent="getItems(id)" href="#">View</a>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Bought By', dataIndex: 'user.full_name', scopedSlots: { customRender: 'buyer'}},
    {title: 'Sold By', dataIndex: 'sold_by.full_name', scopedSlots: { customRender: 'seller'}},
    {title: 'Amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount'}},
    {title: 'Status', dataIndex: 'paid', scopedSlots: { customRender: 'paid' },},
    {title: 'Date', dataIndex: 'created_at', scopedSlots: { customRender: 'date'}},
    {title: 'View Items', dataIndex: 'id', scopedSlots: { customRender: 'id' },},
  ]

  const columns2 = [
    {title: 'Item', dataIndex: 'name'},
    {title: 'PV', dataIndex: 'pv'},
    {title: 'Quantity', dataIndex: 'qty'},
    {title: 'Date', dataIndex: 'created_at', scopedSlots: { customRender: 'date'}},
    {title: 'Amount', key: 'amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount'}},
  ]

  import DateFormat from '@/mixins/dateFormat'
  export default {
    name: 'stream-sales-list',
    layout: 'dashboard',
    mixins: [DateFormat],
    data() {
      return {
        sales: '',
        columns,
        columns2,
        week: '',
        soldItems: '',
        loading: false,
        showSoldItems: false,
        customer: '',
        userReferral: '',
        totalSales: '',
        dateFormat: 'p d MMM, Y',
      }
    },
    methods: {
      async getSales() {
        this.sales = (await this.$axios.$post(`user/getOrders`, {
          weekNumber: this.week,
          userId: this.customer.id
        })).data
      },
      async getItems(id) {
        const res = await this.$axios.$post(`user/soldStreamItems/${id}`)
        if (res.success) {

          this.soldItems = res.data
          this.showSoldItems = true
        }
      },
      async implementStream() {
        try {
          this.loading = true
          const res = await this.$axios.$post('user/implementStream', {
            weekNumber: this.week
          })
          if (res.success) {
            this.loading = false
            this.$message.success('Stream Implemented')
            this.getSales()
          }
        } catch (e) {
          this.loading = false
          this.$message.error(e.response.data.message)
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
    computed: {
      filteredCol() {
        if (this.isStockist) {
          return this.columns
        }

        let arr = []
        for (let i = 0; i < this.columns.length; i++) {
          if (i === 3) { continue }
          arr.push(this.columns[i])
        }
        return arr
      }
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
