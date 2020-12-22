<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card card-outline-secondary">
        <div class="card-header m-b-33">
          <h3 class="">Login</h3>
        </div>
        <div class="card-body">
          <form autocomplete="off" class="form" id="formLogin" name="formLogin" role="form">
            <div class="form-group">
              <label for="referral">Referral</label>
              <input v-model="details.referral" class="form-control" id="referral"  required="">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="details.password" autocomplete="new-password" class="form-control" required="" type="password">
            </div>
<!--            <small @click="$emit('loginRegister', 'Register')">Create account? <a href="#">Register</a></small>-->
            <!--        <div class="form-check small">-->
            <!--          <label class="form-check-label">-->
            <!--            <input class="form-check-input" type="checkbox">-->
            <!--            <span>Remember me on this computer</span>-->
            <!--          </label>-->
            <!--        </div>-->
            <button @click.prevent="submitForm" class="btn btn-success btn-lg float-right" type="button">Login</button>
          </form>
        </div><!--/card-block-->
      </div><!-- /form card login -->
    </div>
  </div>
</template>

<script>
import utils from '@/mixins/utils'
export default {
  name: 'login',
  mixins: [utils],
  data() {
    return {
      details: {
        referral: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.details.referral || !this.details.password) {
        this.$store.dispatch('notification/setStatus', {
          messages: ['All fields are required'],
          success: false
        })
        return
      }

      try {
        this.login({ referral: this.details.referral, password: this.details.password })
      } catch (err) {
        console.log(err.status)
      }
    }
  }
}
</script>

<style scoped>
</style>
