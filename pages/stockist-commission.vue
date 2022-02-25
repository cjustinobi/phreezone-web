<template>
  <div>
    <a-page-header :sub-title="`All Stockist Sales for week ${week}`"/>
    <a-row>
      <a-col :lg="6" :xs="4">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeekCommissions"
          min="1"
          type="number"/>
      </a-col>
      <a-col :lg="6" :xs="8">
        <a-input
          placeholder="Sponsor ID"
          v-model="userReferral"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeekCommissions"
        />
      </a-col>
      <a-col :lg="6" :xs="8">
        <download-excel
          class="btn btn-primary"
          :data="bonuses"
          :fields="excelFields"
          worksheet="My Worksheet"
          :name="`week-${week}.xls`"
        >
          Download
        </download-excel>
        <br><br>
      </a-col>
    </a-row>

    <a-table v-if="bonuses" :columns="columns" :data-source="bonuses" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small">

      <span slot="paid" slot-scope="paid">
      <a-tag :color="paid == '0' ? 'volcano' : 'green'">
        {{ paid == '0' ? 'Not Paid' : 'Paid' }}
      </a-tag>
    </span>
      <span slot="pkg" slot-scope="txt, rec" v-if="rec.package">{{ rec.package.name == null ? 'N/P' : rec.package.name }}</span>
<!--            <span slot="referral" slot-scope="item">{{ ref }}</span>-->
      <span slot="fullName" slot-scope="fn, row">{{ row.first_name }} {{ row.last_name }}</span>
      <span slot="total" slot-scope="total, rec">
        <b v-if="isAdmin">{{((+rec.shopping_sum + +rec.pack_sum + +rec.stream_sum) - ((+rec.shopping_sum + +rec.pack_sum + +rec.stream_sum) * 0.05)) | currency }}</b> <!-- 5% deduction -->
        <b v-else>{{(+rec.shopping_sum + +rec.pack_sum + +rec.stream_sum) | currency }}</b>
      </span>
      <span slot="fn" slot-scope="fn">{{ fn.full_name }}</span>
    </a-table>
  </div>
</template>

<script>
  // import 'bootstrap/dist/css/bootstrap.min.css'
  // import 'jquery/dist/jquery.min.js'
  // // Datatable Modules
  // import 'datatables.net-dt/js/dataTables.dataTables'
  // import 'datatables.net-dt/css/jquery.dataTables.min.css'
  // import 'datatables.net-buttons/js/dataTables.buttons.js'
  // import 'datatables.net-buttons/js/buttons.colVis.js'
  // import 'datatables.net-buttons/js/buttons.flash.js'
  // import 'datatables.net-buttons/js/buttons.html5.js'
  // import 'datatables.net-buttons/js/buttons.print.js'
  // import $ from 'jquery'

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
      title: 'Phreezone Special Sales',
      dataIndex: 'phreezone_special_sales',
    },
    {
      title: 'Sales Allowance',
      dataIndex: 'phreezone_special_sum',
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
        userReferral: this.$auth.user.userType == 1 ? '' : this.$auth.user.referral,
        excelFields: {
          FullName: 'user.full_name',
          StockistCode: 'user.referral',
          Shopping: 'shopping_sum',
          StreamSales: 'stream_sum',
          UpgradePack: 'pack_sum',
          SalesAllowance: 'phreezone_special_sum',
          AccountNumber: {
            field: 'user.account_number',
            callback: val => {
              return JSON.stringify(val)
            }
          },
          BankName: 'user.bank_name',
          Total: {
            callback: data => {
              return +data.shopping_sum + +data.stream_sum + +data.pack_sum
            }
          }
        }
      }
    },
    methods: {
      async getCommissions() {
        this.bonuses = (await this.$axios.$post('admin/stockist-commission', {
          referral: this.userReferral ,
          setWeek: this.week
        })).data
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
