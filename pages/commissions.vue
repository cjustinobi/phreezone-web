<template>
  <div>
    <a-page-header sub-title="All Commissions"/>
    <a-table v-if="bonuses" :columns="columns" :data-source="bonuses" :rowKey="record => record.id">
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
      <span slot="active" slot-scope="active">
      <a-tag :color="active == '0' ? 'volcano' : 'green'">
        {{ active == '0' ? 'Not Active' : 'Active'}}
      </a-tag>
    </span>
      <span slot="pkg" slot-scope="pkg">{{ pkg == null ? 'Not subscribed to any package' : pkg }}</span>
      <span slot="performance" slot-scope="perf">{{ perf == null ? 0 : perf }}</span>
      <span slot="shopping" slot-scope="ship">{{ ship == null ? 0 : ship }}</span>
      <span slot="leadership" slot-scope="lead">{{ lead == null ? 0 : lead }}</span>
      <span slot="spillover" slot-scope="spill">{{ spill == null ? 0 : spill }}</span>
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
      title: 'Week No.',
      dataIndex: 'week',
    },
    {
      title: 'Package',
      dataIndex: 'package_name',
      scopedSlots: { customRender: 'pkg' },
    },
    {
      title: 'Referral',
      dataIndex: 'referral',
    },
    {
      title: 'Performance',
      dataIndex: 'performance_amount',
      scopedSlots: { customRender: 'performance' }
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
      title: 'Spillover',
      dataIndex: 'spillover_amount',
      scopedSlots: { customRender: 'spillover' }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      scopedSlots: { customRender: 'total' }
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'active',
    //   scopedSlots: { customRender: 'active' },
    // },
    // { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ];

  export default {
    name: 'commissions',
    layout: 'admin-dashboard',
    data() {
      return {
        bonuses: '',
        columns
      }
    },
    methods: {
      async getCommissions() {
        this.bonuses = (await this.$axios.$get('admin/bonuses')).data
      }
    },
    mounted() {
      this.getCommissions()
    }
  }
</script>

<style scoped>

</style>
