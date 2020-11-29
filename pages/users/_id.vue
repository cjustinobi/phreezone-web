<template>
  <div>
    <a-form-model v-bind="formItemLayout">

      <a-form-model-item label="Full Name">
        <a-input v-model="user.fullName" placeholder="Full Name" />
      </a-form-model-item>
      <a-form-model-item label="Phone">
        <a-input v-model="user.phone" placeholder="Phone" />
      </a-form-model-item>
      <a-form-model-item label="Email">
        <a-input v-model="user.email" placeholder="Email" />
        {{user.package}}
      </a-form-model-item>
      <!--<a-form-model-item v-if="user.package.id" label="Package">
        <a-select v-model="user.package.id" placeholder="please select your zone">
          <a-select-option v-for="(pkg, i) in packages" :value="pkg.name">
            {{ pkg.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>-->
    </a-form-model>
    <p>{{user}}</p>
  </div>
</template>

<script>
  export default {
    name: 'user',
    layout: 'admin-dashboard',
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    data() {
      return {
        user: '',
        packages: '',
      }
    },
    methods: {
      async getUser() {
        if (this.$route.params.user) {
          this.user = this.$route.params.user
        } else {
          this.user = (await this.$axios.$get(`user/${this.$route.params.id}`)).data
        }
      },
      async getPackages() {
        this.packages = (await this.$axios.$get('getPackages')).data
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
    }
  }
</script>

<style scoped>

</style>
