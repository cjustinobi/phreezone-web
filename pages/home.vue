<template>
  <div>
    <a-page-header sub-title="Message Notifications">
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
    </a-modal>
    <Message />

<!--    <div class="bonuses">-->
<!--      <div v-if="pckLevel" class="shadow-sm p-3 mb-5 bg-white rounded">-->
<!--        <p>Next package <span class="badge badge-pill badge-primary">{{ pckLevel.nextPackage.name }}</span></p>-->
<!--        <h2>-->
<!--          <a-progress type="circle" :percent="pckLevel.packageLevel"/>-->
<!--        </h2>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <p>Next package <span class="badge badge-pill badge-primary">QSilver</span></p>-->
<!--        <h2>-->
<!--          <a-progress type="circle" class="ant-progress-status-exception" :percent="0"/>-->
<!--        </h2>-->
<!--      </div>-->

<!--    </div>-->

  </div>
</template>

<script>

import TreeItem from '@/components/shared/TreeMenu'
import Message from '@/components/shared/Message'
export default {
  name: 'home',
  layout: 'dashboard',
  components: {
    Message

  },
  data() {
    return {
      loading: false,
      visible: false,
      title: '',
      description: '',
    }
  },
  methods: {
    async saveMessage() {
      this.loading = true
      const res = await this.$axios.$post(`admin/message`, {
        title: this.title,
        description: this.description,
      })
      console.log(res)
    },
    // async getPackageLevel() {
    //   this.pckLevel = (await this.$axios.$get(`user/${this.userId}/packageLevel`)).data
    // }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>

</style>
