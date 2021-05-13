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
        selectedPkgId: ''
      }
    },
    methods: {
      async getUser() {
        if (this.$route.params.user) {
          this.user = this.$route.params.user
        } else {
          this.user = (await this.$axios.$post(`user/${this.$route.params.id}`)).data
        }
      },
      async getPackages() {
        this.pkgs = (await this.$axios.$get('getPackages')).data
      },
      async updateUser() {
        if (this.isValidFields() == true) {

          let formData = new FormData();
          formData.append('id', this.user.id)
          formData.append('first_name', this.user.first_name)
          formData.append('last_name', this.user.last_name)
          formData.append('phone', this.user.phone)
          formData.append('email', this.user.email)
          formData.append('_method', 'PUT')

          let res = await this.$axios.$post(`user/${this.$route.params.id}`, formData)
          res.success ? this.$message.success(res.message) : this.$message.error(res.message)
          this.$router.push('/users')
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
        if (!valid) {
          this.$store.dispatch('notification/setStatus', {
            messages: msgs, success: false
          })
        }
        return valid
      }
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
