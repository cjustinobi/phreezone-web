<template>
  <div>
    <a-table v-if="messages" :columns="columns" :data-source="messages" :rowKey="record => record.id">
      <span slot="created" slot-scope="created">{{ formatDate(created) }}</span>
    </a-table>
  </div>
</template>

<script>

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      scopedSlots: { customRender: 'title' },
    },
    {
      title: 'Release Time',
      dataIndex: 'created_at',
      scopedSlots: { customRender: 'created' },
    }
  ]

  import DateFormat from '@/mixins/dateFormat'
  export default {
    name: 'Message',
    mixins: [DateFormat],
    data() {
      return {
        columns,
        messages: '',
        dateFormat: 'd MMM, Y',
      }
    },
    methods: {
      async getMessages() {
        this.messages = (await this.$axios.$get('admin/message')).data
      }
    },
    mounted() {
      this.getMessages()
    }
  }
</script>

<style scoped>

</style>
