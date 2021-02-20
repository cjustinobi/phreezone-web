<template>
  <div>
    <a-page-header v-if="$route.path === '/home'" sub-title="Message Notifications">
      <template slot="extra" v-if="isAdmin">
        <a-button type="primary" @click="visible = true">Add Message</a-button>
      </template>
    </a-page-header>
    <a-modal v-model="visible" title="Create Message" :footer="false" :confirm-loading="loading" @cancel="cancel" @ok="saveMessage">
      <a-input v-model="title" placeholder="Message Title" />
      <br><br>
      <a-textarea
        v-model="description"
        placeholder="Enter the message ..."
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </a-modal>

    <a-modal v-model="readingMode" title="Message" :footer="null">
      <a-input v-model="title"/>
      <br><br>
      <a-textarea v-model="description" :auto-size="{ minRows: 3, maxRows: 5 }"/>
    </a-modal>

    <a-table v-if="messages" :columns="columns" :data-source="messages" :rowKey="record => record.id">
      <span slot="topic" slot-scope="txt, rec">
        <a href="javascript:;" @click="readMessage(rec)">{{ txt }}</a>
      </span>
      <span slot="created" slot-scope="created">{{ formatDate(created) }}</span>
    </a-table>
  </div>
</template>

<script>

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      scopedSlots: { customRender: 'topic' },
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
        loading: false,
        visible: false,
        title: '',
        description: '',
        readingMode: false
      }
    },
    methods: {
      async getMessages() {
        this.messages = (await this.$axios.$get('admin/message')).data
      },
      async saveMessage() {
        this.loading = true
        const res = await this.$axios.$post(`admin/message`, {
          title: this.title,
          description: this.description,
        })
        if (res.success) {
          this.$set(this.messages, 0, res.data)
          return this.cancel()
        }
        this.$message.error('Message not saved')
        this.loading = false
      },
      cancel() {
        this.title = ''
        this.description = ''
        this.loading = false
        this.visible = false
      },
      readMessage(item) {
        this.title = item.title
        this.description = item.description
        this.readingMode = true
      }
    },
    mounted() {
      this.getMessages()
    }
  }
</script>

<style scoped>

</style>
