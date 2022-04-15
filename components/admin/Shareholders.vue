<template>
  <div class="shareholders">
    <h5>Shareholders</h5>
    <a-table :columns="columns" :data-source="shareholders" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small" defaultPageSize="50">
      <span slot="user" slot-scope="user">
        <span>{{ user.full_name }}</span><br>
        <a-tag color="green">{{ user.referral }}</a-tag>
      </span>
      <span slot="sponsor" slot-scope="sponsor">
        <span>{{ sponsor.full_name }}</span><br>
        <a-tag color="green">{{ sponsor.referral }}</a-tag>
      </span>
      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Full Name', dataIndex: 'user', scopedSlots: {customRender: 'user'}},
    {title: 'Sponsor', dataIndex: 'sponsor', scopedSlots: {customRender: 'sponsor'}},
    {title: 'Slot', dataIndex: 'slot'},
    {title: 'Date', dataIndex: 'created_at', scopedSlots: {customRender: 'date'}},
  ]
  import DateFormat from '@/mixins/dateFormat'

  export default {
    mixins: [DateFormat],
    data() {
      return {
        columns,
        shareholders: [],
        dateFormat: 'p d MMM, Y',
      }
    },
    methods: {
      async getShareholders() {
        this.shareholders = (await this.$axios.$get('admin/shareholders')).data
      }
    },
    beforeMount() {
      this.getShareholders()
    }
  }
</script>

<style scoped>
  .shareholders {
    margin-top: 30px;
  }
</style>
