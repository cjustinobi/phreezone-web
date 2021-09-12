<template>
  <div>
    <a-page-header sub-title="Upgrades"/>
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
          :src="redeemed == 0 ? require('@/assets/img/close-pkg.jpg') : require('@/assets/img/open-pkg.png')"
          alt="pack"
          width="50px"
        >
<!--      <a-tag :color="redeemed == '0' ? 'volcano' : 'green'">-->
<!--        {{ active == '0' ? 'Not Redeemed' : 'Redeemed'}}-->
<!--      </a-tag>-->
    </span>
      <span slot="pkg" slot-scope="pkg">{{ pkg == null ? 'N/P' : pkg }}</span>
      <span slot="created" slot-scope="created">{{ formatDate(created) }}</span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'Package',
      dataIndex: 'package.name',
      width: '15%'
    },
    {
      title: 'Upgraded By',
      dataIndex: 'agent.full_name',
      width: '15%'
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
      width: '15%'
    },

    [ { "id": 1, "user_id": 1, "stockist_id": 1, "package_id": 5,
      "pack": 84000, "redeemed": 0, "created_at": "2021-09-11T22:34:30.000000Z",
      "updated_at": "2021-09-11T22:34:30.000000Z" }, { "id": 2, "user_id": 1, "stockist_id": 1,
      "package_id": 5, "pack": 84000, "redeemed": 0, "created_at": "2021-09-11T22:56:47.000000Z",
      "updated_at": "2021-09-11T22:56:47.000000Z" }, { "id": 3, "user_id": 1, "stockist_id": 1, "package_id": 5,
      "pack": 84000, "redeemed": 0, "created_at": "2021-09-11T22:56:47.000000Z", "updated_at": "2021-09-11T22:56:47.000000Z" },
      { "id": 4, "user_id": 1, "stockist_id": 1, "package_id": 1, "pack": 1666, "redeemed": 0,
        "created_at": "2021-09-11T23:16:23.000000Z", "updated_at": "2021-09-11T23:16:23.000000Z" },
      { "id": 5, "user_id": 1, "stockist_id": 1, "package_id": 2, "pack": 4998, "redeemed": 0,
        "created_at": "2021-09-11T23:17:07.000000Z", "updated_at": "2021-09-11T23:17:07.000000Z" }
        ]

  ];
  import dateFormat from '@/mixins/dateFormat'

  export default {
    name: 'packages',
    mixins: [dateFormat],
    layout: 'dashboard',
    data() {
      return {
        dateFormat: 'd MMM, Y',
        upgrades: '',
        visible: false,
        columns
      }
    },
    methods: {
      async getUpgrades() {
        this.upgrades = (await this.$axios.$get(`user/upgradePacks/${this.userId}`)).data
      },
      async disableEnableStockist(userId) {
        const { success } = await this.$axios.$post(`admin/disableEnableStockist/${userId}`)
        if (success) {
          let userIndex = this.users.findIndex(user => user.id == userId)
          this.users[userIndex].isAgent = this.users[userIndex].isAgent ? 0 : 1
          this.$message.success('User updated')
        }
      }
    },
    mounted() {
      this.getUpgrades()
    }
  }
</script>
