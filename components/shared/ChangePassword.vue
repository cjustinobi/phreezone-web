<template>
  <form autocomplete="off" class="form" role="form">
    <div class="form-group">
      <div class="row">
        <div class="col-md-6">
          <label for="old-pass">Old Password</label>
          <input v-model="oldPass" class="form-control" id="old-pass" placeholder="Old Password" @change="checkPassword">
        </div>
        <div class="col-md-6">
          <label for="new-pass">New Password</label>
          <input v-model="newPass" class="form-control" id="new-pass" placeholder="New Password" >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'ChangePassword',
    data() {
      return {
        oldPass: '',
        newPass: ''
      }
    },
    methods: {
      async checkPassword() {
        let result = await this.$axios.$post(`changePass/${this.$auth.user.id}`, {newPass: this.newPass})
        console.log(result)
      }
    }
  }
</script>

<style scoped>

</style>
