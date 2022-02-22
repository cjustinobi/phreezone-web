<template>
  <div>
    <a-page-header sub-title="Stockist POPs"/>

    <a-table v-if="pops" :columns="columns" :data-source="pops" :rowKey="record => record.id" size="small">
      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>
      <span slot="status" slot-scope="status, rec">
        <a-tag color="green" v-if="status == 'approved'">{{ status }}</a-tag>
        <a-tag color="orange" v-if="status == 'pending'">{{ status }}</a-tag>
        <a-tag color="red" v-if="status == 'rejected'">{{ status }}</a-tag><br>
        <small v-if="status == 'rejected'">{{ rec.reject_reason }}</small>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Amount', dataIndex: 'amount'},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
    {title: 'Date Uploaded', dataIndex: 'created_at', scopedSlots: { customRender: 'date' }},
  ]

  import DateFormat from '@/mixins/dateFormat'
  export default {
    name: 'sales-pop',
    layout: 'dashboard',
    mixins: [DateFormat],
    data() {
      return {
        pops: '',
        columns,
        dateFormat: 'd MMM, Y',
      }
    },
    methods: {
      async getPops() {
        this.pops = (await this.$axios.$get(`user/stockist-pops`,)).data
      }
    },
    mounted() {
      this.getPops()
    }
  }
</script>
