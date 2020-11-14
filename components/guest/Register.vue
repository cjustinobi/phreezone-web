<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card card-outline-secondary">
        <div class="card-header m-b-33">
          <h3 class="mb-0">Sign Up</h3>
        </div>
        <div class="card-body">
          <form autocomplete="off" class="form" role="form">
            <div class="form-group">
              <label for="inputName">Name</label>
              <input v-model="details.fullName" class="form-control" id="inputName" placeholder="Full name" required>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                v-model="details.phone"
                @change="validatePhone"
                @input="removeErrorClass('#phone'); invalidPhone = false"
                class="form-control"
                id="phone"
                placeholder="Phone"
                required
              >
              <div v-if="invalidPhone" class="invalid-feedback">
                Invalid Phone number.
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="details.email" class="form-control" id="email" placeholder="Email" required="" type="email">
            </div>
            <div class="form-group">
              <label for="referral">Referral ID</label>
              <input
                v-model="referral"
                @input="removeErrorClass('#referral'); referralNotFound = false"
                @change="getReferral"
                placeholder="Your sponsor ID"
                class="form-control"
                id="referral"
                required
              >
              <div v-if="referralNotFound" class="invalid-feedback">
                Invalid Referral code.
              </div>
            </div>
            <div class="form-group">
              <label for="package">Package</label>
              <select v-model="details.package_id" class="form-control" id="package" required>
                <option>Select Package</option>
                <option v-for="(pkg, i) in packages" :value="pkg.id">{{ pkg.name }} - {{ pkg.amount }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="inputPassword3">Password</label>
              <input v-model="details.password" class="form-control" id="inputPassword3" placeholder="Password" required type="password">
              <small class="form-text text-muted" id="passwordHelpBlock">Your password must be 6-20 characters long</small>
            </div>
            <div class="form-group">
              <button @click.prevent="submitForm" class="btn btn-success btn-lg float-right" type="submit">Register</button>
            </div>
            <small @click="$emit('loginRegister', 'Login')">Already have an account? <a href="#">Sign in</a>.</small>
          </form>
        </div>
      </div><!-- /form card register -->
    </div>
  </div>
</template>

<script>
import utils from "@/mixins/utils";
export default {
  name: 'register',
  mixins: [utils],
  data() {
    return {
      referral: '',
      packages: '',
      invalidPhone: false,
      referralNotFound: false,
      details: {
        fullName: '',
        phone: '',
        email: '',
        parent_id: 1,
        package_id: 'Select Package',
        password: ''
      }
    }
  },
  methods: {
    async submitForm() {
      let res = await this.$axios.$post('/auth/register', this.details)
      this.$store.dispatch('notification/setStatus', {
        success: true,
        messages: ['Account successfully created']
      })
      this.login({phone: this.details.phone, password: this.details.password})
    },
    async getPackages() {
      this.packages = (await this.$axios.$get('/getPackages')).data
    },
    async getReferral() {
      let res = await this.$axios.$post('/user/getReferral', {'referral': this.referral})
      if (res.success) {
        return this.details.parent_id = res.data
      }
      document.querySelector('#referral').classList.add('is-invalid')
      return this.referralNotFound = true
    },
    validatePhone() {
      let error = false
      if (!this.isNumber(this.details.phone)) {
        error = true
      } else if (this.details.phone.length < 11 || this.details.phone.length > 11) {
        error = true
      }
      if (error) {
        document.querySelector('#phone').classList.add('is-invalid')
        this.invalidPhone = true
      }
    },
    validateFields() {
      this.$store.dispatch('notification/setStatus', {
        success: true,
        messages: ['Account successfully created']
      })
    }
  },
  mounted() {
    this.getPackages()
  }
}
</script>

<style scoped>

</style>
