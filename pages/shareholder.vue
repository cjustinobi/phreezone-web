<template>
  <div>
    <a-page-header sub-title="Shareholder">
      <template v-if="isAdmin" slot="extra">
        <a-button type="primary" @click="showCreateShare = true">
          Create Shares
        </a-button>
      </template>
    </a-page-header>

    <Shares v-if="isAdmin" />

    <a-modal v-model="showCreateShare" title="Create Shares" :footer="null">
      <ShareholdingForm />
    </a-modal>
    <h5 class="am" v-if="sponsorWallet">Available Amount: {{ sponsorWallet | currency }}</h5>
    <h5 v-else>Available Amount: NGN 0.00</h5> <br>
    <small v-if="slot && share">Total Amount: {{ (+slot * share.price) | currency }}</small>
    <h6 class="sponsor" v-if="sponsor">Sponsor: {{ sponsor.full_name }}</h6>
    <h6 v-if="shareholder">Member: {{ shareholder.full_name }}</h6>
    <a-row :gutter="4">
      <a-col :md="{ span: 4 }" :xs="{ span: 24 }">
        <a-input v-model="sponsorRef" @blur="getMember(false)" placeholder="Sponsor code" />
        <br><br>
        <a-input v-model="shareholderRef" @blur="getMember(true)" placeholder="Member code" />
        <br><br>
        <a-input v-model="slot" type="number" placeholder="Number of slots"/>

      </a-col>

      <a-col :span="24" style="margin-top: 12px">
          <a-popconfirm
            :title="`About to purchase slot for ${shareholder.full_name}?`"
            ok-text="Yes"
            cancel-text="No"
            @confirm="saveShareholder"
            @cancel="visible = false"
          >
            <a-button type="primary" :loading="loading" :disabled="canUpgrade == false">
              Buy Slot
            </a-button>
          </a-popconfirm>

      </a-col>
    </a-row>
    <Shareholders v-if="isAdmin" />
  </div>
</template>

<script>
  import Shares from '~/components/admin/Shares'
  import ShareholdingForm from '~/components/admin/ShareholdingForm'
  import Shareholders from '~/components/admin/Shareholders'
  export default {
    name: 'shareholder',
    layout: 'dashboard',
    components: {
      Shares,
      Shareholders,
      ShareholdingForm
    },
    data() {
      return {
        amount: '',
        visible: false,
        loading: false,
        showCreateShare: false,
        sponsor: '',
        sponsorRef: '',
        shareholder: '',
        shareholderRef: '',
        sponsorWallet: '',
        slot: '',
        share: '',
      }
    },
    methods: {
      async saveShareholder() {
        if (!this.share) return this.$message.error('No available share found')
        if (this.share.price * this.slot > this.sponsorWallet) return this.$message.error('Insufficient amount in wallet')

        this.loading = true
        let res = await this.$axios.$post(`admin/shareholders`, {
          user_id: this.shareholder.id,
          sponsor_id: this.sponsor.id,
          amount: this.amount,
          slot: this.slot,
          status: 'approved'
          })
        if (res.success) {
          window.location.reload()
          this.loading = false
          this.sponsorWallet -= this.amount
          this.amount = ''
          this.sponsor = ''
          this.shareholder = ''
          this.$message.success('Confirmed payment successfully')
        }
        else {
          this.loading = false
          this.$message.error(res.message)
        }
      },
      async getMember(shareholder = false) {
        try {
          if (shareholder) {
            this.shareholder = (await this.$axios.$post(`user/null`, {
              userReferral: this.shareholderRef
            })).data
          } else {
            this.sponsor = (await this.$axios.$post(`user/null`, {
              userReferral: this.sponsorRef
            })).data
          }

        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
      },
      async getSponsorWallet() {
        this.sponsorWallet = (await this.$axios.$get(`admin/sponsorWallet/${this.userId}`)).data
      },
      async getActiveShare() {
        this.share = (await this.$axios.$get(`admin/activeShare`)).data
      }
    },
    computed: {
      canUpgrade() {
        return !(!this.sponsor || !this.shareholder);
      }
    },
    beforeMount() {
      this.getSponsorWallet()
      this.getActiveShare()
    }
  }
</script>

<style scoped>
  div{
    color: rebeccapurple;
  }
  .am {
    margin-bottom: 0;
  }
  .sponsor {
    margin-top: 30px;
  }

</style>
