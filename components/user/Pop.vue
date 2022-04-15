<template>
  <div>
    <div v-if="formVisibility">
      <a-page-header v-if="isStockist" sub-title="Upload Proof of Payment">
        <template slot="extra">
          <a-button type="primary" @click="$emit('togglePop', { formVisibility: false })">View POP</a-button>
        </template>
      </a-page-header>
      <div>
        <a-radio-group v-model="walleType">
          <a-radio-button value="agentWallet">Agent Wallet</a-radio-button>
          <a-radio-button value="shareholding">Shareholding Wallet</a-radio-button>
        </a-radio-group>
      </div>
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
        <button type="button" class="btn btn-info" @click="upload">{{ loading ? 'Uploading ...' : 'Upload' }}</button>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'pop',
    layout: 'dashboard',
    data() {
      return {
        img: '',
        file: '',
        ref: '',
        amount: '',
        url: '',
        pendingPop: '',
        theMember: '',
        sponsor: '',
        userReferral: '',
        loading: false,
        walleType: ''
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
      },
      endpoint() {
        return this.walleType === 'agentWallet' ?
          `user/uploadConfirmation/${this.userId}` :
          `user/uploadShareholdingConfirmation/${this.userId}`
      }
    },
    methods : {
      handleFile(event) {
        this.file = event.target.files[0]
        this.url = URL.createObjectURL(this.file);
      },
      async upload() {

        if(!this.walleType) return this.$message.error('Select wallet type you want to credit')

        if(this.amount == '' || this.ref == '' || this.file == '') {
          this.$message.error('All fields are required')
          return
        }

        this.loading = true
        let res = await this.$axios.$post(this.endpoint, this.form)
        if (res.success) {
          this.loading = false
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
    margin-right: 5px;
  }
  .ant-radio-button-wrapper-checked, .ant-radio-button-wrapper-checked:hover {
    background: #1890ff;
    font-weight: 700;
    color: #fefefe;
  }
</style>
