<template>
  <div v-if="formVisibilty">
    <a-page-header sub-title="Upload Proof of Payment"/>
    <img class="img-thumbnail" :src="url ? url : img" />
    <input class="hide-input" @change="handleFile" ref="file" type="file">
    <a-input v-model="amount" style="margin-top: 15px; width: 205px; display: block" placeholder="Amount" />
    <div class="buttons">
      <button type="button" class="btn btn-light" @click.prevent="$refs.file.click">Choose file</button>
      <button type="button" class="btn btn-info" @click="upload">Upload</button>
    </div>
  </div>
  <div v-else>
    <a-page-header sub-title="Proof of Payment"/>
    <div v-if="pendingPop">
      <a-card hoverable style="width: 240px">
        <img slot="cover" alt="pop" :src="`${$config.imagePath}/${pendingPop.pop_path}`"/>
        <a-card-meta>
          <template slot="description">
            {{ pendingPop.amount | currency }}
            <a-tag color="orange">{{ pendingPop.status }}</a-tag>
            <p v-if="pendingPop.reject_reason">{{ pendingPop.reject_reason }}</p>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <a-empty
      v-else
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{
      height: '60px',
    }"
    >
      <span slot="description"> Everything looks clean here! </span>
      <a-button @click="formVisibilty = true" type="primary">
        Upload New PoP
      </a-button>
    </a-empty>
  </div>
</template>


<script>

  export default {
    name: 'pop',
    layout: 'dashboard',
    data() {
      return {
        // serverPath: process.env.imageBase,
        img: require('assets/img/africinnovate.png'),
        file: '',
        amount: '',
        url: '',
        formVisibilty: false,
        pendingPop: '',
      }
    },
    computed: {
      form() {
        let form = new FormData()
        form.append('amount', this.amount)
        form.append('file', this.file)
        return form;
      }
    },
    methods : {
      handleFile(event) {
        this.file = event.target.files[0]
        this.url = URL.createObjectURL(this.file);
      },
      async upload() {

        if(this.amount == '' || this.file == '') {
          this.$store.dispatch('notification/setStatus', {
            success: false,
            messages: ['All fields are required']
          })
          return
        }

        let res = await this.$axios.$post(`user/uploadConfirmation/${this.$auth.user.id}`, this.form)
        if (res.success) {
          console.log(res)
          this.url = ''
          this.amount = ''
          this.file = ''
          this.formVisibilty = false
          this.$store.dispatch('notification/setStatus', {
            success: true,
            messages: ['Confirmation uploaded']
          })
        }

      },
      async getPendingPop() {
        this.pendingPop =  (await this.$axios.$get(`user/pop/${this.$auth.user.id}`)).data
      }
    },
    beforeMount() {
      this.getPendingPop()
    }


  }
</script>

<style lang="scss" scoped>
  img {
    max-width: 300px;
  }
  .hide-input {
    display: none;
  }
  .buttons {
    margin-top: 24px;
    .btn-info {
      margin-left: 20px;
    }
  }
</style>
