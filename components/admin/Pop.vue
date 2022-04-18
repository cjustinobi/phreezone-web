<template>
  <div>
    <a-page-header sub-title="List of Proof of Payment">
      <template slot="extra">
        <a-button type="primary" @click="$emit('togglePop', { formVisibility: true })">Add New POP</a-button>
      </template>
    </a-page-header>
    <a-modal
      title="Reason for rejecting PoP"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="rejectPop"
      @cancel="visible = false"
    >
      <a-textarea v-model="rejectReason" placeholder="Reason for rejecting" :auto-size="{ minRows: 2, maxRows: 6 }"/>
    </a-modal>
    <a-modal
      title="Reason for rejecting PoP"
      :visible="visibleShareholding"
      :confirm-loading="confirmLoading"
      @ok="rejectShareholdingPop"
      @cancel="visibleShareholding = false"
    >
      <a-textarea v-model="rejectReason" placeholder="Reason for rejecting" :auto-size="{ minRows: 2, maxRows: 6 }"/>
    </a-modal>
    <a-modal
      :visible="preview"
      @ok="rejectPop"
      @cancel="preview = false"
    >
      <img class="img" @click="viewImage(image)" alt="pop" :src="`${$config.imagePath}/${previewImage}`"/>
    </a-modal>
    <h4 v-if="pops">Agent wallets</h4>
    <a-table v-if="pops" :columns="columns" :data-source="pops['pops']" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small" defaultPageSize="50">
<!--      <img width="80px" @click="viewImage(image)" slot="image" slot-scope="image" alt="pop" :src="`${$config.imagePath}/${image}`"/>-->
      <a href="#" slot="image" slot-scope="image" @click.prevent="viewImage(image)">View</a>
      <a-dropdown v-if="pop.status == 'pending'" slot="action" slot-scope="pop" href="javascript:;">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-popconfirm
              title="Are you sure confirming this payment?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmPop(pop.id, pop.agent.id, pop.user_id, false)"
              @cancel="visible = false"
            >
              <a href="#">Confirm</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item key="2">
            <a-popconfirm
              title="You about to reject this payment?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="cancelPop(pop.id)"
              @cancel="visible = false"
            >
              <a href="#">Reject</a>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
        <a-button> Actions
          <a-icon type="down"/>
        </a-button>
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
<!--      <a-tag v-if="record.userType == '2'" color="geekblue">Stockist</a-tag>-->
        <!--        <template-->
        <!--          v-for="(fragment, i) in text-->
        <!--            .toString()-->
        <!--            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"-->
        <!--        >-->
        <!--          <mark-->
        <!--            v-if="fragment.toLowerCase() === searchText.toLowerCase()"-->
        <!--            :key="i"-->
        <!--            class="highlight"-->
        <!--          >{{ fragment }}</mark-->
        <!--          >-->
        <!--          <template v-else>{{ fragment }}</template>-->
        <!--        </template>-->
      </span>
        <!--      <template v-else>-->
        <!--        {{ text }}-->
        <!--        &lt;!&ndash;          <small style="display: inline">{{ record.referral }}</small>&ndash;&gt;-->
        <!--        <a-tag v-if="record.userType == '2'" color="geekblue">Stockist</a-tag>-->

        <!--      </template>-->
      </template>
      <span slot="status" slot-scope="status">
      <a-tag :color="status == 'pending' ? 'volcano' : status == 'rejected' ? 'red' : 'green' ">{{ status }}</a-tag>
    </span>
      <span slot="amount" slot-scope="amount, rec">
        <span>{{ amount | currency }}</span>
      </span>

    </a-table>

    <h4 v-if="pops">Shareholder wallets</h4>

    <a-table
      v-if="pops"
      :columns="shareholdingColumns"
      :data-source="pops['shareholdingPops']"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      defaultPageSize="50"
    >
      <a href="#" slot="image" slot-scope="image" @click.prevent="viewImage(image)">View</a>
      <a-dropdown v-if="pop.status == 'pending'" slot="action" slot-scope="pop" href="javascript:;">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-popconfirm
              title="Are you sure confirming this payment?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmPop(pop.id, pop.sponsor.id, pop.user_id, true)"
              @cancel="visible = false"
            >
              <a href="#">Confirm</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item key="2">
            <a-popconfirm
              title="You about to reject this payment?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="cancelShareholdingPop(pop.id)"
              @cancel="visibleShareholding = false"
            >
              <a href="#">Reject</a>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
        <a-button> Actions
          <a-icon type="down"/>
        </a-button>
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

      </span>

      </template>
      <span slot="status" slot-scope="status">
      <a-tag :color="status == 'pending' ? 'volcano' : status == 'rejected' ? 'red' : 'green' ">{{ status }}</a-tag>
    </span>
      <span slot="amount" slot-scope="amount, rec">
        <span>{{ amount | currency }}</span>
      </span>

    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'agent.full_name',
      fixed: 'left',
      scopedSlots: {
        // customRender: 'fullName',
        // filterDropdown: 'filterDropdown',
        // filterIcon: 'filterIcon',
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
      title: 'Image',
      dataIndex: 'pop_path',
      scopedSlots: {customRender: 'image'}
    },
    {
      title: 'Sponsor ID',
      dataIndex: 'agent.referral'
    },
    {
      title: 'Ref',
      dataIndex: 'ref'
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      scopedSlots: { customRender: 'amount'}
    },
    {
      title: 'Status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
    },
    { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ]

  const shareholdingColumns = [
    {
      title: 'Full Name',
      dataIndex: 'sponsor.full_name',
      fixed: 'left',
      scopedSlots: {
        // customRender: 'fullName',
        // filterDropdown: 'filterDropdown',
        // filterIcon: 'filterIcon',
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
      title: 'Image',
      dataIndex: 'pop_path',
      scopedSlots: {customRender: 'image'}
    },
    {
      title: 'Sponsor ID',
      dataIndex: 'sponsor.referral'
    },
    {
      title: 'Ref',
      dataIndex: 'ref'
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      scopedSlots: { customRender: 'amount'}
    },
    {
      title: 'Status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
    },
    { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ]
  export default {
    name: 'pops-list',
    layout: 'dashboard',
    data() {
      return {
        pops: '',
        columns,
        shareholdingColumns,
        visible: false,
        preview: false,
        visibleShareholding: false,
        previewImage: '',
        confirmLoading: false,
        rejectReason: '',
        selectedPopId: ''
      }
    },
    methods: {
      async getPops() {
        this.pops = (await this.$axios.$get('admin/pops')).data
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
      async confirmPop(walletId, agentId, userId, isShareholding) {
        const self = this
        let res = await this.$axios.$post(`admin/approveTopUp/${walletId}`, {
          status: 'approved' ,
          agentId,
          userId,
          isShareholding
        })
        if (res.success && isShareholding) {
          this.$message.success('Confirmed payment successfully')
          const popIndex = self.pops['shareholdingPops'].findIndex(pop => pop.id == res.data.id)
          return self.$set(self.pops['shareholdingPops'], popIndex, res.data)
        } else {
          this.$message.success('Confirmed payment successfully')
          const popIndex = self.pops['pops'].findIndex(pop => pop.id == res.data.id)
          return self.$set(self.pops['pops'], popIndex, res.data)
        }
        this.$message.error('Payment not confirmed')
      },
      async rejectPop() {
        let res = await this.$axios.$post(`admin/approveTopUp/${this.selectedPopId}`, {
          status: 'rejected',
          reject_reason: this.rejectReason
        })
        res.success ? this.$message.success('Payment Rejected') :
          this.$message.error('Rejection not successful')
        this.rejectReason = ''
        this.selectedPopId = ''
        this.visible = false
      },
      async rejectShareholdingPop(isShareholding) {
        let res = await this.$axios.$post(`admin/approveTopUp/${this.selectedPopId}`, {
          status: 'rejected',
          reject_reason: this.rejectReason,
          isShareholding
        })
        res.success ? this.$message.success('Payment Rejected') :
          this.$message.error('Rejection not successful')
        this.rejectReason = ''
        this.selectedPopId = ''
        this.visible = false
      },
      cancelPop(popId) {
        this.visible = true
        this.selectedPopId = popId
      },
      cancelShareholdingPop(popId) {
        this.visibleShareholding = true
        this.selectedPopId = popId
      },
      viewImage(image) {
        this.previewImage = image
        this.preview = true
      }
    },
    mounted() {
      this.getPops()
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    height: auto;
  }
</style>
