<template>
  <div>
    <a-table v-if="users" :columns="columns" :data-source="users" rowKey="{record => record.id}">
      <a-dropdown slot="action" slot-scope="text" href="javascript:;">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <nuxt-link :to="{ name: 'users-id', params: { id: text.id , user: text }}">Edit</nuxt-link>
          </a-menu-item>
          <a-menu-item key="2">
            Delete
          </a-menu-item>
        </a-menu>
        <a-button> Actions <a-icon type="down" /> </a-button>
      </a-dropdown>
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
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      scopedSlots: {
        customRender: 'fullName',
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
      },
      onFilter: (value, record) =>
        record.fullName
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Package',
      dataIndex: 'package.name',
      key: 'package',
    },
    {
      title: 'Referral',
      key: 'referral',
      dataIndex: 'referral',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      scopedSlots: { customRender: 'active' },
    },
    { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
  ];
  export default {
    name: 'users',
    layout: 'admin-dashboard',
    validate({ app, params, query, store }) {
      return store.$auth.$state.user.userType == 1
    },
    data() {
      return {
        users: '',
        columns
      }
    },
    methods: {
      async getUsers() {
        this.users = (await this.$axios.$get('admin/users')).data
      },
      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },

      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },
    },
    mounted() {
      this.getUsers()
    }
  }
</script>
