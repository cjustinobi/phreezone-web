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
          v-model="referral"
          style="width: 188px; margin-bottom: 8px;"
          @change="getWeekCommissions"
          />
      </a-col>
      <a-col span="6">
        <a-button @click="downloadBonus">Download</a-button>
      </a-col>
    </a-row>

    <a-table v-if="bonuses" :columns="columns" :data-source="bonuses" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }">
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
      <a-tag v-if="record.userType == '2'" color="geekblue">Stockist</a-tag>
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
          <a-tag v-if="record.userType == '2'" color="geekblue">Stockist</a-tag>

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
      <span slot="shopping" slot-scope="shop">{{ shop == null ? 0 : shop }}</span>
      <span slot="sponsorShopping" slot-scope="shop">{{ shop == null ? 0 : shop }}</span>
      <span slot="leadership" slot-scope="lead">{{ lead == null ? 0 : lead }}</span>
      <span slot="spillover" slot-scope="spill">{{ spill == null ? 0 : spill }}</span>
      <span slot="stockistSales" slot-scope="stockist">{{ stockist == null ? 0 : stockist }}</span>
      <span slot="fullName" slot-scope="fn, row">{{ row.first_name }} {{ row.last_name }}</span>
      <span slot="total" slot-scope="total"><b>{{ total }}</b></span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      fixed: 'left',
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
    // {
    //   title: 'Week No.',
    //   dataIndex: 'week',
    // },
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
    {
      title: 'Accumulative',
      dataIndex: 'accumulative_amount',
      scopedSlots: { customRender: 'accumulative' }
    },
    {
      title: 'Leadership',
      dataIndex: 'leadership_amount',
      scopedSlots: { customRender: 'leadership' }
    },
    {
      title: 'Shopping',
      dataIndex: 'shopping_amount',
      scopedSlots: { customRender: 'shopping' }
    },
    {
      title: 'Sponsor Shopping',
      dataIndex: 'sponsor_shopping_amount',
      scopedSlots: { customRender: 'sponsorShopping' }
    },
    {
      title: 'Spillover',
      dataIndex: 'spillover_amount',
      scopedSlots: { customRender: 'spillover' }
    },
    {
      title: 'Stockist Sales',
      dataIndex: 'stockist_sales_amount',
      scopedSlots: { customRender: 'stockistSales' }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      scopedSlots: { customRender: 'total' }
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
    layout: 'admin-dashboard',
    data() {
      return {
        bonuses: '',
        columns,
        week: '',
        referral: this.$auth.user.userType == 1 ? '' : this.$auth.user.referral
      }
    },
    methods: {
      async getCommissions() {
        this.bonuses = (await this.$axios.$post('admin/bonuses', {
          referral: this.referral ,
          week: this.week
        })).data
      },
      downloadBonus() {
        return window.open(`${this.$axios.defaults.baseURL}exportBonuses?referral=${this.referral}&week=${this.week}`)
      },
      getWeekCommissions() {
        this.getCommissions()
      },
      setWeek() {
        this.week = this.$dateFns.getISOWeek(new Date())
      }
    },
    mounted() {
      this.getCommissions()
      this.setWeek()
    }
  }
</script>

<style scoped>

</style>
