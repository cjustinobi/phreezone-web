<template>
  <div class="shares">
    <h5>Shares</h5>
    <a-table :columns="columns" :data-source="shares" :rowKey="record => record.id" size="small" defaultPageSize="50">
      <span slot="active" slot-scope="active">
        <a-tag :color="active == '1' ? 'green' : 'volcano'">
          {{ active == '1' ? 'Active' : 'Sold Out' }}
        </a-tag>
      </span>
      <span slot="available" slot-scope="rec">{{ rec.qty - rec.sold }}</span>
      <span slot="dividend" slot-scope="rec">{{ rec | currency }}</span>

      <a-dropdown  slot="action" slot-scope="action" href="javascript:;">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-popconfirm
              title="About to declare dividend?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="shareDividend(action.id)"
              @cancel="declareDividend = false"
            >
              <a href="#">Declare Dividend</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item key="2">
            <a href="javascript:;" @click="showDividend(action.id)">Add Dividend</a>
          </a-menu-item>
        </a-menu>
        <a-icon type="more" />
      </a-dropdown>
    </a-table>
    <a-modal
      v-model="visible"
      title="Add Dividend"
      :confirm-loading="loading"
      @cancel="visible = false"
      @ok="saveDividend">
      <a-input v-model="dividend" placeholder="Dividend" />
    </a-modal>
  </div>
</template>

<script>
  const columns = [
    {title: 'Slots', dataIndex: 'qty'},
    {title: 'Sold', dataIndex: 'sold'},
    {title: 'Available', scopedSlots: { customRender: 'available' }},
    {title: 'Dividend', dataIndex: 'dividend', scopedSlots: { customRender: 'dividend' }},
    {title: 'Status', dataIndex: 'available', scopedSlots: { customRender: 'active' }},
    {title: 'Actions', scopedSlots: { customRender: 'action' }},
  ]
  export default {
    data() {
      return {
        visible: false,
        loading: false,
        declareDividend: false,
        selectedShare: '',
        columns,
        dividend: '',
        shares: []
      }
    },
    methods: {
      async getShares() {
        this.shares = (await this.$axios.$get('admin/shares')).data
      },
      async saveDividend() {
        const res = await this.$axios.$post(`admin/set-dividend/${this.selectedShare}`, {
          dividend: this.dividend
        })
        if (res.success) {
          this.getShares()
          this.dividend = ''
          this.visible = false
          this.$message.success('Dividend added')
        }
      },
      async shareDividend(id) {
        const res = await this.$axios.$get(`admin/declare-dividend/${id}`)
        if (res.success) {
          this.$message.success('Dividend declared')
        }
      },
      showDividend(id) {
        this.selectedShare = id
        this.visible = true
      }
    },
    beforeMount() {
      this.getShares()
    }
  }
</script>

<style scoped>
  .shares {
    margin: 30px 0;
  }
</style>
