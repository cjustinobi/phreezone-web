<template>
  <div>
    <a-page-header sub-title="Upgrade Order"/>
    <h5 v-if="agentWallet">Available Amount: {{ agentWallet | currency }}</h5>
    <h5 v-else>Available Amount: NGN 0.00</h5> <br>
    <h6 v-if="upgradeUser">{{ upgradeUser.full_name }}</h6>
    <a-row :gutter="4">
      <a-col :md="{ span: 4 }" :xs="{ span: 24 }">
        <a-input v-model="userReferral" @blur="getMember" placeholder="Member code" />
        <br><br>
      </a-col>
      <a-col :md="{ span: 4 }" :xs="{ span: 24 }">
        <a-select v-model="amount" style="width: 295px">
          <a-select-option value="">Select Package</a-select-option>
          <a-select-option v-for="(amt, i) in amounts" :value="amt.amount" :key="i">{{ amt.title }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="24" style="margin-top: 12px">
              <a-popconfirm
                :title="`Are you sure upgrading ${upgradeUser.full_name}?`"
                ok-text="Yes"
                cancel-text="No"
                @confirm="upgrade"
                @cancel="visible = false"
              >
                <a-button type="primary" :disabled="canUpgrade == false">Upgrade</a-button>
              </a-popconfirm>

      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'upgrade-order',
    layout: 'dashboard',
    data() {
      return {
        amount: '',
        visible: false,
        userReferral: '',
        upgradeUser: '',
        agentWallet: ''
      }
    },
    methods: {
      async upgrade() {

        if (this.amount > this.agentWallet) return this.$message.error('Insufficient amount in wallet')

        let res = await this.$axios.$post(`user/uploadConfirmation/null`, {
          userReferral: this.userReferral,
          agentId: this.userId,
          amount: this.amount,
          status: "approved",
          isUpgrade: true })
        if (res.success) {
          this.agentWallet -= this.amount
          this.amount = ''
          this.userReferral = ''
          this.upgradeUser = ''
          this.$message.success('Confirmed payment successfully')
        }
        else {this.$message.error('failed')}
      },
      async getMember() {
        try {
          this.upgradeUser = (await this.$axios.$post(`user/null`, {
            userReferral: this.userReferral
          })).data
        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
      },
      async getAgentWallet() {
        this.agentWallet = (await this.$axios.$get(`admin/agentWallet/${this.userId}`)).data
      }
    },
    computed: {
      canUpgrade() {
        return !(this.amount == '' || this.upgradeUser == '');
      }
    },
    mounted() {
      this.getAgentWallet()

      if (this.$route.params.ref) {
        this.userReferral = this.$route.params.ref
        this.getMember()
      }
    }
  }
</script>

<style scoped>
  div{
    color: rebeccapurple;
  }



</style>
