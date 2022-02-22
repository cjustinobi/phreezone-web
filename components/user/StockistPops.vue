<template>
  <div>
    <a-page-header sub-title="Stockist POPs"/>

    <a-table v-if="pops" :columns="columns" :data-source="pops" :rowKey="record => record.id" size="small">
      <span slot="agent" slot-scope="agent">
        <p style="margin-bottom: 0">{{ agent.full_name}}</p>
        <a-tag color="green">{{ agent.referral }}</a-tag>
      </span>
      <span slot="date" slot-scope="date">{{ getTime(date) }}</span>
<!--      <span slot="date" slot-scope="date">{{ formatDate(date) }}</span>-->
      <span slot="amount" slot-scope="amount">{{ amount | currency }}</span>
      <span slot="status" slot-scope="status, rec">
        <a-tag color="green" v-if="status == 'approved'">{{ status }}</a-tag>
        <a-tag color="orange" v-if="status == 'pending'">{{ status }}</a-tag>
        <a-tag color="red" v-if="status == 'rejected'">{{ status }}</a-tag><br>
        <small v-if="status == 'rejected'">{{ rec.reject_reason }}</small>
      </span>
      <span slot="image" slot-scope="image">
        <img width="100px" :src="`${$config.imagePath}/${image}`">
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Date Uploaded', dataIndex: 'created_at', scopedSlots: { customRender: 'date' }},
    {title: 'Name', dataIndex: 'agent', scopedSlots: { customRender: 'user' }},
    {title: 'Image', dataIndex: 'pop_path', scopedSlots: { customRender: 'image' }},
    {title: 'Ref', dataIndex: 'ref'},
    {title: 'Amount', dataIndex: 'amount', scopedSlots: { customRender: 'amount' }},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
  ]

  import getTime from 'date-fns/getTime'
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
        dateFormat2: 'PPpp',
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
