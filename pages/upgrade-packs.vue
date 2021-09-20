<template>
  <div>
    <a-page-header sub-title="EP Upgrade Series"/>
    <h6 v-if="upgradeUser">{{ upgradeUser.full_name }}</h6>
    <a-input-search v-model="userReferral" @blur="getMember" style="width: 150px;" placeholder="Member code" />
    <br><br>
    <a-table
      v-if="upgrades"
      :columns="columns"
      :data-source="upgrades"
      :rowKey="record => record.id"
      :scroll="{ x: 1500, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >

      <span slot="redeemed" slot-scope="redeemed">
        <img
          :src="redeemed == 0 ? require('@/assets/img/close-pkg.jpg') : require('@/assets/img/open-pack.png')"
          alt="pack"
          width="50px"
        >
    </span>
      <span slot="user" slot-scope="txt">
        <span>{{ txt.full_name }} <br> <b>{{ txt.referral }}</b></span>
      </span>
      <span slot="agent" slot-scope="txt">
        <span>{{ txt.full_name }} <br> <b>{{ txt.referral }}</b></span>
      </span>
      <span slot="pkg" slot-scope="pkg">{{ pkg == null ? 'N/P' : pkg }}</span>
      <span slot="created" slot-scope="created">{{ formatDate(created) }}</span>
      <span slot="redeem" slot-scope="text" v-if="$auth.user.isAgent == '1' && text.redeemed == '0'">
        <a-popconfirm
          :title="`Sure you want to redeem?`"
          ok-text="Yes"
          cancel-text="No"
          @confirm="redeem(text.id)"
          @cancel="visible = false"
        >
              <a href="#">Redeem</a>
            </a-popconfirm>
      </span>
    </a-table>
  </div>


</template>

<script>
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'user',
      scopedSlots: { customRender: 'user' },
      width: '10%'
    },
    {
      title: 'Package',
      dataIndex: 'package.name',
      width: '10%'
    },
    {
      title: 'Pack Prize',
      dataIndex: 'pack',
      width: '10%'
    },
    {
      title: 'Stockist',
      dataIndex: 'agent',
      scopedSlots: { customRender: 'agent' },
      width: '10%'
    },
    {
      title: 'Redeemed',
      dataIndex: 'redeemed',
      scopedSlots: { customRender: 'redeemed' },
      width: '10%'
    },
    {
      title: 'Upgrade Date',
      dataIndex: 'created_at',
      scopedSlots: { customRender: 'created' },
      width: '10%'
    },
    {
      title: 'Redeem',
      scopedSlots: { customRender: 'redeem' },
      width: '10%'
    },
  ]
  import dateFormat from '@/mixins/dateFormat'

  export default {
    name: 'upgrade-pack',
    mixins: [dateFormat],
    layout: 'dashboard',
    data() {
      return {
        dateFormat: 'd MMM, Y',
        upgrades: '',
        visible: false,
        columns,
        userReferral: '',
        upgradeUser: ''
      }
    },
    methods: {
      async getUpgrades() {
        this.upgrades = (await this.$axios.$get(`user/upgradePacks/${this.upgradeUser ? this.upgradeUser.id : this.userId}`)).data
      },
      async redeem(upgradeId) {
        const { success } = await this.$axios.$post(`user/redeemPack/${upgradeId}`)
        if (success) {
          let upgradeIndex = this.upgrades.findIndex(upgrade => upgrade.id == upgradeId)
          this.upgrades[upgradeIndex].redeemed = this.upgrades[upgradeIndex].redeemed == '1' ? 0 : 1
          this.$message.success('Pack Redeemed')
        }
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
    },
    mounted() {
      this.getUpgrades()
    },
    watch: {
      upgradeUser(val) {
        if (val) {
          this.getUpgrades()
        }
      }
    }
  }
</script>
