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
                    <input v-model="details.gender" class="form-check-input" value="m" name="gender" type="radio">
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check female">
                    <input v-model="details.gender" class="form-check-input" value="f" name="gender" type="radio">
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
                <div class="col-md-3">
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
                    Invalid Phone number
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="email">Email</label>
                  <input v-model="details.email" class="form-control" id="email" placeholder="Email" required="" type="email">
                </div>
                <div class="col-md-3">
                  <label for="referral">Sponsor ID</label>
                  <input
                    v-model="referralId"
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
                <div class="col-md-3">
                  <label for="placement">Placement ID</label>
                  <input
                    v-model="placement"
                    @input="removeErrorClass('#placement'); placementNotFound = false"
                    @change="getPlacement"
                    placeholder="Your Placement ID"
                    class="form-control"
                    id="placement"
                    required
                  >
                  <div v-if="placementNotFound" class="invalid-feedback">
                    Invalid Placement code.
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
                  <label for="account-number">Account Number</label>
                  <input
                    v-model="details.account_number"
                    @change="getAccountName"
                    class="form-control"
                    id="account-number"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="Account Number"
                    required
                  >
                </div>
                <div class="col-md-4">
                  <label for="bank">Bank</label>
                  <select v-model="details.bank_name" class="form-control" id="bank" @change="getAccountName">
                    <option>Select Bank</option>
                    <option v-for="(bank, i) in banks" :key="i">{{ bank.name }}</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="account-name">Account Name</label>
                  <input v-model="details.account_name" placeholder="Account Name" class="form-control" id="account-name" disabled>
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
                <div class="col-md-4" v-if="details.country == 'Nigeria'">
                  <label for="state">State</label>
                  <select v-model="details.state" class="form-control" id="state" required>
                    <option>Select State</option>
                    <option v-for="(state, i) in states" :key="i">{{ state.name }}</option>
                  </select>
                </div>
                <div class="col-md-4" v-if="details.country == 'Nigeria'">
                  <label for="lga">LGA</label>
                  <select v-model="details.lga" class="form-control" id="lga" required>
                    <option>Select LGA</option>
                    <option v-for="(lga, i) in lgas" :value="lga.name">{{ lga.name }}</option>
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
              <button @click.prevent="submitForm" class="btn btn-success btn-sm float-right" type="submit">Register</button>
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
      referralId: '',
      placement: '',
      packages: '',
      countries: '',
      states: '',
      lgas: '',
      banks: '',
      invalidPhone: false,
      referralNotFound: false,
      placementNotFound: false,
      details: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        gender: '',
        dob: '',
        account_number: '',
        account_name: '',
        bank_name: 'Select Bank',
        country: 'Nigeria',
        state: 'Select State',
        lga: 'Select LGA',
        address: '',
        parent_id: '',
        brought_by: '',
        password: ''
      }
    }
  },

  methods: {
    isInValidField() {
      let error = false
      if (this.details.gender == '') {
        error = true
        this.$message.error("Gender is required")
      }
      if (this.details.first_name == '') {
        error = true
        this.$message.error("First Name is required")
      }
      if (this.details.last_name == '') {
        error = true
        this.$message.error("Last Name is required")
      }
      if (this.details.dob == '') {
        error = true
        this.$message.error("Date of birth is required")
      }
      if (this.details.lga == 'Select LGA') {
        error = true
        this.$message.error("Select Local Government")
      }
      if (this.details.password == '') {
        error = true
        this.$message.error("Password is required")
      }
      if (this.details.password.length < 6) {
        error = true
        this.$message.error("Password must be at least 6 characters")
      }

      return error

    },
    async submitForm() {
       if (this.isInValidField()) {
         return
       }

      try {
        let res = await this.$axios.$post('/auth/register', this.details)
        if (res.success) {
          Object.keys(this.details).map(item => this.details[item] = '')
          this.referralId = ''
          this.$store.dispatch('notification/setStatus', {
            success: true,
            messages: ['Account successfully created']
          })
          this.$router.push('/upgrade-order')
        }
      } catch (e) {
        this.$message.error(e.response.data.message)
      }

    },
    async getPackages() {
      this.packages = (await this.$axios.$get('/packages')).data
    },
    async getCountries() {
      this.countries = (await this.$axios.$get('/countries')).data
    },
    async getStates() {
      this.states = (await this.$axios.$get('/states')).data
    },
    async getLgas(state) {
      if (state) {
        this.lgas = (await this.$axios.$post('/lgas', {state})).data
      }
    },
    async getBanks() {
      this.banks = (await this.$axios.$get('/banks')).data
    },

    async getAccountName() {
      if (
        this.details.bank_name != '' &&
        this.details.account_number != '' &&
        this.details.bank_name != undefined &&
        this.details.account_number != undefined &&
        this.banks &&
        this.banks.length
      ) {
        const bank = this.banks.find(bank => bank.name == this.details.bank_name)

        if (bank) {
          const bank_code = bank.code
          const res = await this.$axios.$post('/banks', {
            account_number: this.details.account_number,
            bank_code
          })
          if (res.status) {
            this.details.account_name = res.data.account_name
          } else {
            this.details.account_name = ''
          }
        }
      }
    },
    async getReferral() {
      let res = await this.$axios.$post('/user/referral', {'referral': this.referralId})
      if (res.success) {
        return this.details.brought_by = res.data
      }
      document.querySelector('#referral').classList.add('is-invalid')
      return this.referralNotFound = true
    },
    async getPlacement() {
      let res = await this.$axios.$post('/user/referral', {'referral': this.placement})
      if (res.success) {
        return this.details.parent_id = res.data
      }
      document.querySelector('#placement').classList.add('is-invalid')
      return this.placementNotFound = true
    },
    onDOBChange(date, dateString) {
      this.details.dob = dateString
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
    this.getStates()
    this.getBanks()
  },
  watch: {
    'details.state': {
      handler: function (val) {
        this.getLgas(val)
      }
    }
  }
}
</script>

<style scoped>
  .form-check { display: inline;}
  .female { margin-left: 12px;}
</style>
