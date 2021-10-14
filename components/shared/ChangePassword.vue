<template>
  <form autocomplete="off" class="form" role="form">
    <div class="form-group">
      <label for="old-pass">Change Password</label>
      <div class="row">
        <div class="col-md-6">
          <input v-model="oldPass" class="form-control" id="old-pass" placeholder="Old Password">
        </div>
        <div class="col-md-6">
          <input v-model="newPass" class="form-control" id="new-pass" placeholder="New Password">
        </div>
      </div>
    </div>
    <div class="form-group">
      <a-button @click.prevent="changePass" :loading="loading" class="btn btn-success btn-sm float-right" type="submit">
        Change Password
      </a-button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'ChangePassword',
    data() {
      return {
        oldPass: '',
        newPass: '',
        loading: false
      }
    },
    methods: {
      async changePass() {
        this.loading = true
        let { success } = await this.$axios.$post(`changePass/${this.$auth.user.id}`, {
          newPass: this.newPass,
          oldPass: this.oldPass,
        })
        if (success) {
          this.loading = false
          this.oldPass = ''
          this.newPass = ''
          return this.$store.dispatch('notification/setStatus', {
            success: true,
            messages: ['Password changed successfully']
          })
        }
        this.$store.dispatch('notification/setStatus', {
          this.loading = false
          success: false,
          messages: ['Password not changed']
        })
      }
    }
  }
</script>

<style scoped>

</style>
