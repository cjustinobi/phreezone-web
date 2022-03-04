<template>
  <div>
    <a-page-header sub-title="All Users">
      <template slot="extra">
        <a-button type="primary" @click="() => $router.push('/register')">Add New Member</a-button>
      </template>
    </a-page-header>

    <a-input-search
      v-if="users && users.data.length"
      placeholder="Sponsor ID"
      v-model="userReferral"
      style="width: 188px; margin-bottom: 8px;"
      @search="getUsers(userReferral)"
    />

    <a-table
      v-if="users.data"
      :columns="columns"
      :data-source="users.data"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="false"
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
            <a-popconfirm
              :title="`Sure you want to delete ${text.full_name}`"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteUser(text.id)"
              @cancel="userDelete = false"
            >
              <a href="#">Delete</a>
            </a-popconfirm>
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

    <div class="pagination" v-if="users && users.data.length">
      <a href="#" @click="firstPage">&laquo;</a>
      <a href="#" :disabled="users.prev_page_url == null" @click="prevPage">&lt;</a>
      <a href="#">{{ users.current_page }} of {{ users.last_page }}</a>
      <a href="#" :disabled="users.next_page_url == null" @click="nextPage">&gt;</a>
      <a href="#" @click="lastPage">&raquo;</a>
    </div>
    <a-modal :visible="loading" :footer="null">
      <a-spin style="display: flex; justify-content: center">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
    </a-modal>
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
  import axios from 'axios'
  export default {
    name: 'users',
    layout: 'dashboard',
    validate({ app, params, query, store }) {
      return store.$auth.$state.user.userType == 1
    },
    data() {
      return {
        users: '',
        userReferral: '',
        loading: false,
        visible: false,
        userDelete: false,
        columns
      }
    },
    methods: {
      async getUsers(userReferral = 0) {
        this.loading = true
        const res = await this.$axios.$post('admin/users', {
          userReferral
        })
        if (res) {
          this.loading = false
          this.users = res
        }
      },
      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
      },
      async disableEnableStockist(userId) {
        const { success } = await this.$axios.$post(`admin/disableEnableStockist/${userId}`)
        if (success) {
          let userIndex = this.users.data.findIndex(user => user.id == userId)
          this.users.data[userIndex].isAgent = !this.users[userIndex].isAgent
          this.$message.success('User updated')
        }
      },
      async deleteUser(userId) {
        const { success } = await this.$axios.$delete(`admin/users/${userId}`)
        if (success) {
          this.getUsers()
          this.$message.success('User deleted')
        }
      },
      handleReset(clearFilters) {
        clearFilters()
      },
      async firstPage() {
        this.loading = true
        const res = await this.$axios.$post(this.users.first_page_url)
        if (res) {
          this.loading = false
          this.users = res
        }
      },
      async lastPage() {
        this.loading = true
        const res = await this.$axios.$post(this.users.last_page_url)
        if (res) {
          this.loading = false
          this.users = res
        }
      },
      async prevPage() {
        this.loading = true
        const res = await this.$axios.$post(this.users.prev_page_url)
        if (res) {
          this.loading = false
          this.users = res
        }
      },
      async nextPage() {
        this.loading = true
        const res = await this.$axios.$post(this.users.next_page_url)
        if (res) {
          this.loading = false
          this.users = res
        }
      },
    },
    mounted() {
      this.getUsers()
    }
  }
</script>

<style scoped>
  .pagination {
    display: inline-block;
    float: right;
    margin-top: 20px;
  }

  .pagination a {
    color: black;

    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd !important; /* Gray */
  }
</style>
