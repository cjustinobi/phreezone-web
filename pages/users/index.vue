<template>
  <div>
    <a-page-header sub-title="All Users"/>
    <a-row>
      <a-col :span="3">
      <a-button type="primary" @click="() => $router.push('/register')">Add New Member</a-button>
      </a-col>
    </a-row>
    <br>
    <a-table
      v-if="users"
      :columns="columns"
      :data-source="users"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >
      <a-dropdown slot="action" slot-scope="text" href="javascript:;">
        <a-menu slot="overlay">
          <a-menu-item v-if="text.active" key="1">
            <a-popconfirm
              :title="`Sure you want to ${text.isAgent == 1 ? 'disable' : 'enable'} stockist?`"
              ok-text="Yes"
              cancel-text="No"
              @confirm="disableEnableStockist(text.id)"
              @cancel="visible = false"
            >
              <a href="#">{{ text.isAgent == 1 ? 'Disable Stockist' : 'Enable Stockist' }}</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item key="2">
            <nuxt-link :to="{ name: 'users-id', params: { id: text.id , user: text }}">Edit</nuxt-link>
          </a-menu-item>
          <a-menu-item key="3">
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
      <span slot="active" slot-scope="active">
        <a-tag :color="active == '0' ? 'volcano' : 'green'">
          {{ active == '0' ? 'Not Active' : 'Active'}}
        </a-tag>
      </span>
      <span slot="fullName" slot-scope="fullName, rec">
        <span>{{ fullName }}</span> <br>
        <a-tag v-if="rec.isAgent == '1'" color="green">Agent</a-tag>
      </span>
      <span slot="pkg" slot-scope="pkg">{{ pkg == null ? 'N/P' : pkg }}</span>
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
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%'
    },
    {
      title: 'Package',
      dataIndex: 'package.name',
      scopedSlots: { customRender: 'pkg' },
      width: '10%'
    },
    {
      title: 'Sponsor ID',
      dataIndex: 'referral',
      width: '10%'
    },
    {
      title: 'Status',
      dataIndex: 'active',
      scopedSlots: { customRender: 'active' },
      width: '10%'
    },
    {
      title: 'Action',
      scopedSlots: { customRender: 'action' },
      width: '15%'
    },

  ];
  export default {
    name: 'users',
    layout: 'dashboard',
    validate({ app, params, query, store }) {
      return store.$auth.$state.user.userType == 1
    },
    data() {
      return {
        users: '',
        visible: false,
        columns
      }
    },
    methods: {
      async getUsers() {
        this.users = (await this.$axios.$get('admin/users')).data
      },
      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
      },
      async disableEnableStockist(userId) {
        const { success } = await this.$axios.$post(`admin/disableEnableStockist/${userId}`)
        if (success) {
          let userIndex = this.users.findIndex(user => user.id == userId)
          this.users[userIndex].isAgent = this.users[userIndex].isAgent ? 0 : 1
          this.$message.success('User updated')
        }
      },
      handleReset(clearFilters) {
        clearFilters()
      },
    },
    mounted() {
      this.getUsers()
    }
  }
</script>
