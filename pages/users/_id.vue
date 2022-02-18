<template>
  <div>
    <a-page-header sub-title="Edit User"/>
    <a-form-model v-bind="formItemLayout">
      <a-form-model-item label="First Name">
        <a-input v-model="user.first_name" placeholder="First Name" />
      </a-form-model-item>
      <a-form-model-item label="Last Name">
        <a-input v-model="user.last_name" placeholder="Last Name" />
      </a-form-model-item>
      <a-form-model-item label="Phone">
        <a-input v-model="user.phone" placeholder="Phone" />
      </a-form-model-item>
      <a-form-model-item label="Email">
        <a-input v-model="user.email" placeholder="Email" />
      </a-form-model-item>
      <a-form-model-item label="State">
        <a-input v-model="user.state" placeholder="State" />
      </a-form-model-item>
      <a-form-model-item label="LGA">
        <a-input v-model="user.lga" placeholder="LGA" />
      </a-form-model-item>
      <a-form-model-item label="Bank Name">
        <select v-model="user.bank_name" class="form-control" id="bank" @change="getAccountName">
          <option>Select Bank</option>
          <option v-for="(bank, i) in banks" :key="i">{{ bank.name }}</option>
        </select>
<!--        <a-input v-model="user.bank_name" placeholder="Bank Name" />-->
      </a-form-model-item>
      <a-form-model-item label="Account Number">
        <a-input v-model="user.account_number" @change="getAccountName" placeholder="Account Number" />
      </a-form-model-item>
      <a-form-model-item label="Account Name">
        <a-input v-model="user.account_name" placeholder="Account Name" disabled />
      </a-form-model-item>
      <a-form-model-item label="Package" v-if="user && user.package">
        <a-input :value="user.package.name" disabled/>
      </a-form-model-item>
      <!--<a-form-model-item label="Package">
        <a-select v-model="selectedPkgId" placeholder="Select package">
          <a-select-option v-for="pkg in pkgs" :key="pkg.id">{{ pkg.name }}</a-select-option>
        </a-select>
      </a-form-model-item>-->
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button @click="updateUser" type="primary">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: 'user',
    layout: 'dashboard',
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    data() {
      return {
        user: '',
        pkgs: '',
        selectedPkgId: '',
        banks: ''
      }
    },
    methods: {
      async getUser() {
        this.user = (await this.$axios.$post(`user/${this.$route.params.id}`)).data
      },
      async getPackages() {
        this.pkgs = (await this.$axios.$get('getPackages')).data
      },
      async updateUser() {
        if (this.isValidFields() == true) {

          let res = await this.$axios.$put(`user/${this.$route.params.id}`, this.user)
          res.success ? this.$message.success(res.message) : this.$message.error(res.message)
          this.$router.push(`/users/${this.$route.params.id}`)
        }
      },

      getAccountName() {
        if (this.banks.length) {
          setTimeout(async function () {
            const bank = this.banks.find(bank => bank.name == this.user.bank_name)

            if (bank) {
              const bank_code = bank.code
              const res = await this.$axios.$post('/banks', {
                account_number: this.user.account_number,
                bank_code
              })
              if (res.status) {
                this.user.account_name = res.data.account_name
              } else {
                this.user.account_name = ''
              }
            }
          }, 5000)
        }

      },
      isValidFields() {
        let valid = true
        let msgs = []
        if (this.user.first_name == '') {
          valid = false
          msgs.push('First Name is required')
        }
        if (this.user.last_name == '') {
          valid = false
          msgs.push('Last Name is required')
        }
        if (this.user.phone == '') {
          valid = false
          msgs.push('Phone is required')
        }
        if (this.user.bank_name == '') {
          valid = false
          msgs.push('Bank name is required')
        }
        if (!valid) {
          this.$store.dispatch('notification/setStatus', {
            messages: msgs, success: false
          })
        }
        return valid
      },
      async getBanks() {
        this.banks = (await this.$axios.$get('/banks')).data
      },
    },
    computed: {
      formItemLayout() {
        const layout = 'horizontal'
        return layout === 'horizontal'
          ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
          : {};
      },
    },
    beforeMount() {
      this.getUser()
      this.getPackages()
      this.getBanks()
    },
    watch: {
      user: {
        handler: function (val) {
          if (val) {
            this.selectedPkgId = val.package_id
          }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>

</style>
