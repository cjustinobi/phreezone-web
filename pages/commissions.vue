<template>
  <div>
    <a-page-header :sub-title="`All Commissions for week ${week}`"/>
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
          @change="getWeekCommissions(week)"
          />
      </a-col>
      <a-col v-if="isAdmin" span="6">
        <download-excel
          class="btn btn-primary"
          :data="bonuses"
          :fields="excelFields"
          worksheet="My Worksheet"
          :name="`week-${week}.xls`"
        >
          Download
        </download-excel>
      </a-col>
    </a-row>

    <a-table
      v-if="bonuses"
      :columns="columns"
      :data-source="bonuses"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="fullName" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
      <a-tag v-if="record.isAgent" color="geekblue">Stockist</a-tag>
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <template v-else>
          {{ text }}
          <!--          <small style="display: inline">{{ record.referral }}</small>-->
          <a-tag v-if="record.isAgent" color="geekblue">Stockist</a-tag>

        </template>
      </template>
      <span slot="paid" slot-scope="paid">
      <a-tag :color="paid == null ? 'volcano' : 'green'">
        {{ paid == null ? 'Not Paid' : 'Paid'}}
      </a-tag>
    </span>
      <span slot="pkg" slot-scope="txt, rec" v-if="rec.package">{{ rec.package.name == null ? 'N/P' : rec.package.name }}</span>
      <span v-else>N/P</span>
      <span slot="agent" slot-scope="agent">{{ agent == null ? 0 : agent }}</span>
      <span slot="accumulative" slot-scope="ac">{{ ac == null ? 0 : ac }}</span>
      <span slot="performance" slot-scope="perf">{{ perf == null ? 0 : perf }}</span>
<!--      <span slot="shopping" slot-scope="shop">{{ shop == null ? 0 : shop }}</span>-->
      <span slot="sponsorShopping" slot-scope="shop">{{ shop == null ? 0 : shop }}</span>
      <span slot="leadership" slot-scope="lead">{{ lead == null ? 0 : lead }}</span>
      <span slot="spillover" slot-scope="spill">{{ spill == null ? 0 : spill }}</span>
      <span slot="stream" slot-scope="stream">{{ stream == null ? 0 : stream }}</span>
<!--      <span slot="agent_stream" slot-scope="agent_stream">{{ agent_stream == null ? 0 : agent_stream }}</span>-->
      <span slot="fullName" slot-scope="fn, row">{{ row.first_name }} {{ row.last_name }}</span>
      <span slot="total" slot-scope="total"><b>{{ total }}</b></span>
      <span slot="actualAmount" slot-scope="actualAmount"><b>{{ actualAmount }}</b></span>
    </a-table>
  </div>
</template>

<script>
  let columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      fixed: 'left',
      width: 110,
      scopedSlots: {
        customRender: 'fullName',
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
      },
      onFilter: (value, record) =>
        record.full_name
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          }, 0);
        }
      },
    },
    {
      title: 'Package',
      dataIndex: 'package',
      scopedSlots: { customRender: 'pkg' },
    },
    {
      title: 'Sponsor ID',
      dataIndex: 'referral',
    },
    {
      title: 'Performance',
      dataIndex: 'performance_amount',
      scopedSlots: { customRender: 'performance' }
    },
    {
      title: 'Agent',
      dataIndex: 'agent_amount',
      scopedSlots: { customRender: 'agent' }
    },
    // {
    //   title: 'Accumulative',
    //   dataIndex: 'accumulative_amount',
    //   scopedSlots: { customRender: 'accumulative' }
    // },
    {
      title: 'Leadership',
      dataIndex: 'leadership_amount',
      scopedSlots: { customRender: 'leadership' }
    },
    // {
    //   title: 'Shopping',
    //   dataIndex: 'shopping_amount',
    //   scopedSlots: { customRender: 'shopping' }
    // },
    {
      title: 'Sponsor Shopping',
      dataIndex: 'sponsor_shopping_amount',
      scopedSlots: { customRender: 'sponsorShopping' }
    },
    {
      title: 'Stream',
      dataIndex: 'stream_amount',
      scopedSlots: { customRender: 'stream' }
    },
    // {
    //   title: 'SSPB',
    //   dataIndex: 'agent_stream_amount',
    //   scopedSlots: { customRender: 'agent_stream' }
    // },
    {
      title: 'Total',
      dataIndex: 'total',
      scopedSlots: { customRender: 'total' }
    },
    {
      title: 'Actual Amount',
      dataIndex: 'actualAmount',
      scopedSlots: { customRender: 'actualAmount' }
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'paid',
    //   scopedSlots: { customRender: 'paid' },
    // },
    // { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ];


  export default {
    name: 'commissions',
    layout: 'dashboard',
    data() {
      return {
        columns,
        bonuses: '',
        week: '',
        userReferral: this.$auth.user.userType == 1 ? '' : this.$auth.user.referral,
        excelFields: {
          Fullname: 'full_name',
          ID: 'referral',
          AccountNumber: {
            field: 'account_number',
            callback: val => {
              return JSON.stringify(val)
            }
          },
          BankName: 'bank_name',
          ActualAmount: 'actualAmount'
        }
      }
    },
    methods: {
      async getCommissions() {
        let res = (await this.$axios.$post('admin/bonuses', {
          referral: this.userReferral ,
          setWeek: this.week
        })).data

        if (res.length) {
          // Those that are qualified for bonus for the given week.
          this.bonuses = res.filter(item => item.actualAmount != 0)
        }
      },
      downloadBonus() {
        return window.open(`${this.$axios.defaults.baseURL}exportBonuses?referral=${this.userReferral}&week=${this.week}`)
      },
      getWeekCommissions() {
        this.getCommissions()
      },
      async setWeek() {
        this.week = this.$axios.$get('date')
        // this.week = this.$dateFns.getWeek(new Date()) - 1
      }
    },
    computed: {
      // columns() {
      //   return columns
        // return this.isAdmin ? columns : columns.filter(column => column.dataIndex !== 'sponsor_shopping_amount')
      // },
      // data() {
      //   let commissions = this.bonuses
      //   if (this.isAdmin) {
      //     return commissions
      //   }
      //   for (let com of commissions) {
      //     com['shopping_amount'] = com.sponsor_shopping_amount + com.shopping_amount
      //   }
      //   return commissions
      // }
    },
    mounted() {
      this.setWeek()
      this.getCommissions()
    }
  }
</script>

<style scoped>

</style>
