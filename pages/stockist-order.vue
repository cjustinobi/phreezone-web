<template>
  <div>
    <a-page-header sub-title="Stockist Order"/>

    <a-row>
      <a-col :md="{span: 6}" :xs="{span: 10}">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="max-width: 188px; margin-bottom: 8px;"
          @change="getItems"
          min="1"
          type="number"/>
      </a-col>

      <a-col v-if="isAdmin" :md="{span: 6}" :xs="{span: 6}">
        <div class="download">
          <download-excel
            class="btn btn-primary"
            :data="items"
            :fields="excelFields"
            worksheet="My Worksheet"
            :name="`week-${week}.xls`"
          >
            Download
          </download-excel>
        </div>
      </a-col>
    </a-row>

    <a-table
      v-if="items"
      :columns="columns"
      :data-source="items"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small">

      <span slot="soldBy" slot-scope="soldBy">
        {{ soldBy.full_name }}<br>
        <a-tag color="green">{{ soldBy.referral }}</a-tag>
      </span>
      <span slot="boughtBy" slot-scope="boughtBy">
        {{ boughtBy.full_name }}<br>
        <a-tag color="green">{{ boughtBy.referral }}</a-tag>
      </span>
      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
      <span slot="products" slot-scope="products">
        <table>
          <thead>
          <tr>
            <th width="34%">Product</th>
            <th width="33%">Code</th>
            <th width="33%">Qty</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="prod in products">
            <td class="td">{{ prod.name }}</td>
            <td class="td">{{ prod.code }}</td>
            <td class="td">{{ prod.qty }}</td>
          </tr>
          </tbody>
        </table>
        {{product}}
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Date', dataIndex: 'created_at', scopedSlots: { customRender: 'date'}},
    {title: 'Sold By', dataIndex: 'sold_by', scopedSlots: { customRender: 'soldBy'}},
    {title: 'Bought By', dataIndex: 'bought_by', scopedSlots: { customRender: 'boughtBy'}},
    {title: 'Product Name', dataIndex: 'items', scopedSlots: { customRender: 'products'}},
    // {title: 'Qty', dataIndex: 'items.qty'}
  ]

  import DateFormat from '@/mixins/dateFormat'
  export default {
    name: 'stockist-orders',
    layout: 'dashboard',
    mixins: [DateFormat],
    data() {
      return {
        items: '',
        columns,
        week: '',
        dateFormat: 'p d MMM, Y',
        excelFields: {
          Date: 'created_at',
          Fullname: 'sold_by.full_name',
          ID: 'sold_by.referral',
          Product: {
            field: 'items',
            callback: val => {
              return JSON.stringify(val.map(item => item.name))
            }
          },
          Qty: {
            field: 'items',
            callback: val => {
              return JSON.stringify(val.map(item => item.qty))
            }
          }
        }
      }
    },
    methods: {
      getItems() {
        const self = this
        setTimeout(async function () {
          self.items = (await self.$axios.$post(`admin/stockistOrders`, {
            weekNumber: self.week
          })).data
        }, 3000)
      },
      async setWeek() {
        this.week = await this.$axios.$get('date')
      },
    },
    mounted() {
      this.setWeek()
      this.getItems()
    }
  }
</script>

<style scoped>
  .td {
    border-bottom: 1px solid #dfe0e2;
  }
  @media (max-width: 767px) {
    .download {
      margin-bottom: 20px;
      margin-left: 10px;
    }
  }
</style>
