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
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Slots', dataIndex: 'qty'},
    {title: 'Sold', dataIndex: 'sold'},
    {title: 'Available', scopedSlots: { customRender: 'available' }},
    {title: 'Status', dataIndex: 'available', scopedSlots: { customRender: 'active' }},
  ]
  export default {
    data() {
      return {
        columns,
        shares: []
      }
    },
    methods: {
      async getShares() {
        this.shares = (await this.$axios.$get('admin/shares')).data
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
