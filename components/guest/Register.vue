<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-outline-secondary">
        <div class="card-header m-b-33">
          <h3 class="mb-0">Sign Up</h3>
        </div>
        <div class="card-body">
          <form autocomplete="off" class="form" role="form">
            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label for="inputName">First Name</label>
                  <input v-model="details.first_name" class="form-control" id="inputName" placeholder="First name" required>
                </div>
                <div class="col-md-6">
                  <label for="lastName">Last Name</label>
                  <input v-model="details.last_name" class="form-control" id="lastName" placeholder="Last Name" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label style="display: block">Gender</label>
                  <div class="form-check">
                    <input v-model="details.gender" class="form-check-input" name="gender" type="radio" required>
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check female">
                    <input v-model="details.gender" class="form-check-input" name="gender" type="radio" required>
                    <label class="form-check-label">Female</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="dob">Date of Birth</label>
                  <a-date-picker class="form-control" @change="onDOBChange" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
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
                <div class="col-md-4">
                  <label for="email">Email</label>
                  <input v-model="details.email" class="form-control" id="email" placeholder="Email" required="" type="email">
                </div>
                <div class="col-md-4">
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
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
                  <label for="country">Country</label>
                  <select v-model="details.country" class="form-control" id="country" required>
                    <option>Select Country</option>
                    <option v-for="(country, i) in countries" :key="i">{{ country.nicename }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="state">State</label>
                  <select v-model="details.state" class="form-control" id="state" required>
                    <option>Select State</option>
                    <option v-for="(state, i) in states" :key="i">{{ state.name }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="lga">LGA</label>
                  <select v-model="details.lga" class="form-control" id="lga" required>
                    <option>Select LGA</option>
                    <option v-for="(lga, i) in lgas" :value="pkg.id">{{ lga.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword3">Password</label>
              <input v-model="details.password" class="form-control" id="inputPassword3" placeholder="Password" required type="password">
              <small class="form-text text-muted" id="passwordHelpBlock">Your password must be 6-20 characters long</small>
            </div>
            <div class="form-group">
              <button @click.prevent="submitForm" class="btn btn-success btn-lg float-right" type="submit">Register</button>
            </div>
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
      countries: '',
      invalidPhone: false,
      referralNotFound: false,
      details: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        gender: '',
        dob: '',
        country: 'Select Country',
        state: 'Select State',
        lga: 'Select LGA',
        address: '',
        parent_id: 1,
        password: ''
      }
    }
  },
  methods: {
    async submitForm() {
      let res = await this.$axios.$post('/auth/register', this.details)
      if (res.success) {
        Object.keys(this.details).map(item => this.details[item] = '')
        this.referral = ''
        this.$store.dispatch('notification/setStatus', {
          success: true,
          messages: ['Account successfully created']
        })
      }

    },
    async getPackages() {
      this.packages = (await this.$axios.$get('/packages')).data
    },
    async getCountries() {
      this.countries = (await this.$axios.$get('/countries')).data
    },
    async getReferral() {
      let res = await this.$axios.$post('/user/referral', {'referral': this.referral})
      if (res.success) {
        return this.details.parent_id = res.data
      }
      document.querySelector('#referral').classList.add('is-invalid')
      return this.referralNotFound = true
    },
    onDOBChange(date, dateString) {
      console.log(dateString);
    },
    validatePhone() {
      let error = false
      if (!this.isNumber(this.details.phone)) {
        error = true
      } else if (this.details.phone.length !== 11) {
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
    this.getCountries()
  }
}
</script>

<style scoped>
  .form-check { display: inline;}
  .female { margin-left: 12px;}
</style>
