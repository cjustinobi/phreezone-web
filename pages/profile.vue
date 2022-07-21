<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-outline-secondary">
        <div class="card-header m-b-33">
          <h3 class="mb-0">Profile</h3>
        </div>
        <div class="card-body">
          <form autocomplete="off" class="form" role="form">
            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label for="inputName">First Name</label>
                  <input disabled v-model="details.first_name" class="form-control" id="inputName" placeholder="First name">
                </div>
                <div class="col-md-6">
                  <label for="lastName">Last Name</label>
                  <input disabled v-model="details.last_name" class="form-control" id="lastName" placeholder="Last Name">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <label style="display: block">Gender</label>
                  <div class="form-check">
                    <input disabled v-model="details.gender" class="form-check-input" value="m" name="gender" type="radio">
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check female">
                    <input disabled v-model="details.gender" class="form-check-input" value="f" name="gender" type="radio">
                    <label class="form-check-label">Female</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label >Date of Birth</label>
                  <input disabled v-model="details.dob" class="form-control" placeholder="DOB">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="phone">Phone</label>
                  <input disabled
                    v-model="details.phone"
                    class="form-control"
                    id="phone"
                    placeholder="Phone"
                  >
                </div>
                <div class="col-md-3">
                  <label for="email">Email</label>
                  <input disabled v-model="details.email" class="form-control" id="email" placeholder="Email" required="" type="email">
                </div>
                <div class="col-md-3">
                  <label for="referral">Sponsor ID<small v-if="sponsor">: {{sponsor }}</small></label>
                  <input disabled
                    v-model="details.brought_by"
                    placeholder="Your sponsor ID"
                    class="form-control"
                    id="referral"
                  >
                </div>
                <div class="col-md-3">
                  <label for="placement">Placement ID<small v-if="parent">: {{ parent }}</small></label>
                  <input disabled
                    v-model="details.parent_id"
                    placeholder="Your Placement ID"
                    class="form-control"
                    id="placement"
                    required
                  >
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
                  <label for="account-number">Account Number</label>
                  <input disabled
                    v-model="details.account_number"
                    class="form-control"
                    id="account-number"
                    placeholder="Account Number"
                  >
                </div>
                <div class="col-md-4">
                  <label for="bank">Bank</label>
                  <input disabled v-model="details.bank_name" placeholder="Account Name" class="form-control" id="bank">
                </div>
                <div class="col-md-4">
                  <label for="account-name">Account Name</label>
                  <input disabled v-model="details.account_name" placeholder="Account Name" class="form-control" id="account-name">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-4">
                  <label for="country">Country</label>
                  <input disabled v-model="details.country" placeholder="Country" class="form-control" id="country">
                </div>
                <div class="col-md-4" v-if="details.country == 'Nigeria'">
                  <label for="state">State</label>
                  <input disabled v-model="details.state" placeholder="State" class="form-control" id="state">
                </div>
                <div class="col-md-4" v-if="details.country == 'Nigeria'">
                  <label for="lga">LGA</label>
                  <input disabled v-model="details.lga" placeholder="LGA" class="form-control" id="lga">
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import utils from "@/mixins/utils";
  export default {
    name: 'profile',
    layout: 'dashboard',
    mixins: [utils],
    data() {
      return {
        referralId: '',
        placement: '',
        lgas: '',
        banks: '',
        sponsor: '',
        parent: '',
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
        }
      }
    },

    methods: {
      async getDetails() {
        this.details = (await this.$axios.$post(`user/${this.userId}`)).data
      },
      async getRefById(id, key) {
        this.details[key] = (await this.$axios.$get(`user/getReferral/${id}`)).data
      },

    },
    mounted() {
      this.getDetails()
    },
    watch: {
      'details.brought_by': {
        handler: function (val) {
          this.getRefById(val, 'brought_by')
        },
        immediate: true
      },
      'details.parent_id': {
        handler: function (val) {
          this.getRefById(val, 'parent_id')
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>
  .form-check { display: inline;}
  .female { margin-left: 12px;}
</style>
