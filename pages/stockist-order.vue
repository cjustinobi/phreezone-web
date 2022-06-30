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
        <a-button v-if="items.length" type="primary" @click="printProduct">Download</a-button>
<!--        <div class="download">-->
<!--          <download-excel-->
<!--            class="btn btn-primary"-->
<!--            :data="items"-->
<!--            :fields="excelFields"-->
<!--            worksheet="My Worksheet"-->
<!--            :name="`week-${week}.xls`"-->
<!--          >-->
<!--            Download-->
<!--          </download-excel>-->
<!--        </div>-->
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
      </span>
    </a-table>

    <table :style="{display: showTable}" class="table table-hover table-bordered" ref="example">
      <thead>
      <tr>
        <th width="25%">Date</th>
        <th width="20%">Full name</th>
        <th width="10%">ID</th>
        <th width="40%">Product/Qty</th>
<!--        <th width="40%">Product/Amount/PV</th>-->
        <th width="5%">Supply Status</th>
      </tr>
      </thead>
      <tbody>
      <tr class="pr-tr" v-if="items.length" v-for="product in items" :key="product.id">
        <td>{{formatDate(product.created_at)}}</td>
        <td>{{product.sold_by.full_name}}</td>
        <td>{{product.sold_by.referral}}</td>
        <td v-if="product.items.length">
          <div v-for="item in product.items">
            {{item.name}} - {{item.qty}}
<!--            {{item.name}} - <b>{{item.amount | currency}}</b> - {{item.pv}}-->
          </div>
        </td>
      </tr>
      </tbody>
    </table>
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
        showTable: 'none',
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
      printProduct()  {
        this.showTable = 'block'
        this.$nextTick(function() {
          let div2Print = this.$refs.example
          let newWin = window.open('')
          newWin.document.write(div2Print.outerHTML)
          newWin.print()
          newWin.close()
          this.showTable = 'none'
        })
        return true;
      }
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
