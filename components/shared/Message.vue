<template>
  <div>
    <a-page-header v-if="$route.path === '/home'" sub-title="Message Notifications">
      <template slot="extra" v-if="isAdmin">
        <a-button type="primary" @click="visible = true">Add Message</a-button>
      </template>
    </a-page-header>
    <a-modal v-model="visible" title="Create Message" :confirm-loading="loading" @cancel="cancel" @ok="saveMessage">
      <a-input v-model="title" placeholder="Message Title" />
      <br><br>
      <a-textarea
        v-model="description"
        placeholder="Enter the message ..."
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
      <br><br>
      <img class="img-thumbnail" :src="url ? url : ''"/>
      <input class="hide-input" @change="handleFile" ref="file" type="file">
      <br><br>
      <button type="button" class="btn btn-light" @click.prevent="$refs.file.click">Choose file</button>
    </a-modal>

    <a-modal v-model="readingMode" title="Message" :footer="null">
      <h6>{{ title }}</h6>
      <p>{{ description }}</p>
      <img alt="pop" :src="`${$config.imagePath}/${file}`"/>
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
        readingMode: false,
        file: '',
        url: ''
      }
    },
    methods: {
      async getMessages() {
        this.messages = (await this.$axios.$get('admin/message')).data
      },
      async saveMessage() {
        if (this.title == '' || this.description) {
          return this.$message.error('Fill in the required field')
        }
        this.loading = true
        const res = await this.$axios.$post(`admin/message`, this.form)
        if (res.success) {
          this.$set(this.messages, 0, res.data)
          return this.cancel()
        }
        this.$message.error('Message not saved')
        this.loading = false
      },
      handleFile(event) {
        this.file = event.target.files[0]
        this.url = URL.createObjectURL(this.file);
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
        this.file = item.image_path
        this.readingMode = true
      }
    },
    computed: {
      form() {
        let form = new FormData()
        form.append('title', this.title)
        form.append('description', this.description)
        form.append('file', this.file)
        return form;
      },

    },
    mounted() {
      this.getMessages()
    }
  }
</script>

<style scoped>
 .hide-input {
    display: none;
  }
  img {
    height: auto;
    width: 100%;
  }
</style>
