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
              <label for="referral">Username</label>
              <input v-model="details.referral" class="form-control" id="referral"  required="">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="details.password" autocomplete="new-password" class="form-control" required="" type="password">
            </div>
            <div class="form-group">
              <label>Check code</label> : <span style="font-weight: bolder">{{randomNumber}}</span>
              <input v-model="checkCode" placeholder="Enter above code here" class="form-control" required>
            </div>
<!--            <small @click="$emit('loginRegister', 'Register')">Create account? <a href="#">Register</a></small>-->
            <!--        <div class="form-check small">-->
            <!--          <label class="form-check-label">-->
            <!--            <input class="form-check-input" type="checkbox">-->
            <!--            <span>Remember me on this computer</span>-->
            <!--          </label>-->
            <!--        </div>-->
            <button @click.prevent="submitForm" :disabled="!isValidCode" class="btn btn-success btn-sm float-right" type="submit">Login</button>
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
      checkCode: '',
      randomNumber: '',
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
    },
    getRandomNumber(min = 10000, max = 99999) {
      min = Math.ceil(min);
      max = Math.floor(max);
      this.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // this.randomNumber = Math.random() * (max - min) + min;
    }
  },
  beforeMount() {
    this.getRandomNumber()
  },
  computed: {
    isValidCode() {
      return this.checkCode == this.randomNumber
    }
  }
}
</script>

<style scoped>
</style>
