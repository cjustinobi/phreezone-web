<template>
  <div>
    <a-page-header sub-title="List of Items Bought"/>

    <div style="background: #ECECEC; padding: 30px; margin-bottom: 28px;">
      <a-row :gutter="4">
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              :title="`Total Items bought for week ${week}`"
              :value="totalSales | currency"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            />

          </a-card>
        </a-col>

      </a-row>
    </div>

    <a-row>
      <a-col span="6">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getItems"
          min="1"
          type="number"/>
      </a-col>
    </a-row>

    <a-table v-if="items" :columns="columns" :data-source="items" :rowKey="record => record.id" size="small">
      <span slot="ids" slot-scope="ids, rec">
        <a @click.prevent="getItems(ids)" href="#">View</a>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Stockist Name', dataIndex: 'user.full_name'},
    {title: 'Item', dataIndex: 'item'},
    {title: 'Amount', key: 'amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount'}},
  ]

  export default {
    name: 'sales-list',
    layout: 'dashboard',
    data() {
      return {
        items: '',
        columns,
        week: '',
        userReferral: '',
        totalSales: ''
      }
    },
    methods: {
      async getItems() {
        this.items = (await this.$axios.$post(`user/boughtItems`, {
          weekNumber: this.week
        })).data
      },
      setWeek() {
        this.week = this.$dateFns.getWeek(new Date()) - 1
      },
    },
    mounted() {
      this.setWeek()
      this.getItems()
    },
    watch: {
      items : {
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
