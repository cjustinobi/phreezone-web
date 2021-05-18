<template>
  <div>
    <div v-if="formVisibility">
      <a-page-header v-if="isStockist" sub-title="Upload Proof of Payment">
        <template slot="extra">
          <a-button type="primary" @click="$emit('togglePop', { formVisibility: false })">View POP</a-button>
        </template>
      </a-page-header>
      <img class="img-thumbnail" :src="url ? url : img"/>
      <input class="hide-input" @change="handleFile" ref="file" type="file">
      <a-form-model-item label="">
        <h6 v-if="theMember">{{ theMember.full_name }}</h6>
        <a-input v-model="userReferral" class="add-width" @blur="getMember" placeholder="Member code" />
        <br>
        <a-input v-model="ref" class="add-width" placeholder="Transaction Reference" />
        <br>
        <a-input v-model="amount" type="number" class="add-width" placeholder="Enter amount"/>
<!--        <a-select v-model="amount" class="add-width">-->
<!--          <a-select-option value="">Select Amount</a-select-option>-->
<!--          <a-select-option v-for="(amt, i) in amounts" :value="amt.amount" :key="i">{{ amt.amount }}</a-select-option>-->
<!--        </a-select>-->
      </a-form-model-item>
      <div class="buttons">
        <button type="button" class="btn btn-light" @click.prevent="$refs.file.click">Choose file</button>
        <button type="button" class="btn btn-info" @click="upload">Upload</button>
      </div>
    </div>
<!--    <div v-else>-->
<!--      <a-page-header sub-title="Proof of Payment">-->
<!--        <template slot="extra">-->
<!--          <a-button type="primary" @click="$emit('togglePop', { formVisibility: true })">Upload New POP</a-button>-->
<!--        </template>-->
<!--      </a-page-header>-->
<!--      <div v-if="pendingPop">-->
<!--        <a-card hoverable style="width: 240px">-->
<!--          <img slot="cover" alt="pop" :src="`${$config.imagePath}/${pendingPop.pop_path}`"/>-->
<!--          <a-card-meta>-->
<!--            <template slot="description">-->
<!--              <span v-if="pendingPop.status == 'pending'">{{ pendingPop.pending_amount | currency }}</span>-->
<!--              <span v-else>{{ pendingPop.amount | currency }}</span>-->
<!--              <a-tag color="orange">{{ pendingPop.status }}</a-tag>-->
<!--              <p v-if="pendingPop.reject_reason">{{ pendingPop.reject_reason }}</p>-->
<!--            </template>-->
<!--          </a-card-meta>-->
<!--        </a-card>-->
<!--      </div>-->
<!--      <a-empty-->
<!--        v-else-->
<!--        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"-->
<!--        :image-style="{-->
<!--      height: '60px',-->
<!--    }"-->
<!--      >-->
<!--        <span slot="description"> Everything looks clean here! </span>-->
<!--        <a-button @click="formVisibilty = true" type="primary">-->
<!--          Upload New PoP-->
<!--        </a-button>-->
<!--      </a-empty>-->
<!--    </div>-->
  </div>
</template>


<script>
  export default {
    name: 'pop',
    layout: 'dashboard',
    data() {
      return {
        img: '',
        // img: require('assets/img/logo.png'),
        file: '',
        ref: '',
        amount: '',
        url: '',
        pendingPop: '',
        theMember: '',
        userReferral: ''
      }
    },
    computed: {
      form() {
        let form = new FormData()
        form.append('amount', this.amount)
        form.append('file', this.file)
        form.append('ref', this.ref)
        form.append('userReferral', this.userReferral)
        return form;
      },
      formVisibility() {
        return this.$store.getters['popVisibility']
      }
    },
    methods : {
      handleFile(event) {
        this.file = event.target.files[0]
        this.url = URL.createObjectURL(this.file);
      },
      async upload() {

        if(this.amount == '' || this.ref == '' || this.file == '') {
          this.$message.error('All fields are required')
          return
        }

        let res = await this.$axios.$post(`user/uploadConfirmation/${this.userId}`, this.form)
        if (res.success) {
          console.log(res)
          this.url = ''
          this.amount = ''
          this.ref = ''
          this.file = ''
          this.$store.dispatch('formVisibility', false)
          this.$message.success('Confirmation uploaded')
          window.location.href = '/pop'
        }

      },
      async getPendingPop() {
        this.pendingPop =  (await this.$axios.$get(`user/pop/${this.$auth.user.id}`)).data
      },
      async getMember() {
        try {
          this.theMember = (await this.$axios.$post(`user/null`, {
            userReferral: this.userReferral
          })).data
        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
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
  .add-width {
    width: 200px;
  }
</style>
