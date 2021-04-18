<template>
  <div>
    <a-page-header sub-title="List of Stockist Sales"/>
    <a-modal
      title="Reason for rejecting Sale"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="rejectSale"
      @cancel="visible = false"
    >
      <a-textarea v-model="rejectReason" placeholder="Reason for rejecting" :auto-size="{ minRows: 2, maxRows: 6 }"/>
    </a-modal>
    <a-table v-if="sales" :columns="columns" :data-source="sales" :rowKey="record => record.id" size="small">
<!--      <img width="80px" slot="image" slot-scope="image" alt="pop" :src="`${$config.imagePath}/${image}`"/>-->
      <a-dropdown v-if="sale.status == 'pending'" slot="action" slot-scope="sale" href="javascript:;">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-popconfirm
              title="Are you sure confirming this sale?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmSale(sale.shopping_id)"
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
              @confirm="cancelSale(sale.shopping_id)"
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
  </div>
</template>

<script>
  const columns = [

    {
      title: 'Full Name',
      dataIndex: 'user.full_name'
    },
    // {
    //   title: 'Package',
    //   dataIndex: 'package',
    //   key: 'package'
    // },
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
  ];
  export default {
    name: 'sales-list',
    layout: 'admin-dashboard',
    data() {
      return {
        sales: '',
        columns,
        visible: false,
        confirmLoading: false,
        rejectReason: '',
        selectedSaleId: ''
      }
    },
    methods: {
      async getSales() {
        this.sales = (await this.$axios.$post('admin/sales')).data
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
      async confirmSale(saleId) {
        const self = this
        let res = await this.$axios.$post(`admin/updateSale/${saleId}`, { status: 'approved' })
        if (res.success) {
          this.$message.success('Sale updated successfully')
          return this.getSales()
        }
        this.$message.error('Payment not confirmed')

      },
      async rejectSale() {
        let res = await this.$axios.$post(`admin/updateSale/${this.selectedSaleId}`, { status: 'rejected', reject_reason: this.rejectReason })
        if (res.success) {
          this.reset()
          this.$message.success('Sales Rejected')
          return this.getSales()
        }

        this.$message.error('Rejection not successful')
        this.reset()
      },
      cancelSale(saleId) {
        this.visible = true
        this.selectedSaleId = saleId
      },
      reset() {
        this.rejectReason = ''
        this.selectedSaleId = ''
        this.visible = false
      }
    },
    mounted() {
      this.getSales()
    }
  }
</script>
