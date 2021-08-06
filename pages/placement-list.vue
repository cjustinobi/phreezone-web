<template>
  <div>
    <a-page-header sub-title="Placement Activities"/>
    <a-table v-if="activities" :columns="columns" :data-source="activities" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }">
      <span slot="fullName" slot-scope="fn, rec"><b>{{ rec.referral }}</b>  <br> <span>{{ rec.full_name }}</span></span>
      <span slot="pkg" slot-scope="pkg" v-if="pkg">{{ pkg.name }}</span>
      <span slot="joined" slot-scope="joined">{{ formatDate(joined) }}</span>
      <span slot="rank" slot-scope="rank">None</span>
      <span slot="pv" slot-scope="pv, rec">{{ rec.accumulatedPv ? rec.accumulatedPv : rec.pv }}</span>
      <span slot="sbp" slot-scope="sbp, rec">{{ rec.sbp }}</span>
      <span slot="pw" slot-scope="pw, rec">{{ rec.prevWeekAccumulatedPv ? rec.prevWeekAccumulatedPv : rec.prevWeekPoint }}</span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {
      title: 'Member',
      dataIndex: 'full_name',
      fixed: 'left',
      scopedSlots: { customRender: 'fullName' },
    },
    {
      title: 'Level',
      dataIndex: 'package',
      scopedSlots: { customRender: 'pkg' },
    },
    {
      title: 'Date Joined',
      dataIndex: 'created_at',
      scopedSlots: { customRender: 'joined' },
    },
    {
      title: 'Rank',
      // dataIndex: 'created_at',
      scopedSlots: { customRender: 'rank' },
    },
    {
      title: 'Generation',
      dataIndex: 'depth',
      scopedSlots: { customRender: 'depth' }
    },
    {
      title: 'Previous Week Accumulated Performance',
      dataIndex: 'prevWeekPoint',
      scopedSlots: { customRender: 'pw' },
    },
    {
      title: 'Current Week Accumulated Performance',
      dataIndex: 'currentWeekPoint',
      scopedSlots: { customRender: 'cw' },
    },
    {
      title: 'EPP',
      dataIndex: 'pv',
      scopedSlots: { customRender: 'pv' },
    },
    {
      title: 'SBP',
      dataIndex: 'weekly_stream_pv',
      scopedSlots: { customRender: 'sbp' },
    },
  ]
  import DateFormat from '../mixins/dateFormat'
  export default {
    name: 'network-activities',
    layout: 'dashboard',
    mixins: [DateFormat],
    data() {
      return {
        columns,
        dateFormat: 'd MMM, Y',
        activities: ''
      }
    },
    methods: {
      async getActivites() {
        this.activities = (await this.$axios.$post(`user/accumulatedPv/${this.userId}`)).data
      },

    },
    mounted() {
      this.getActivites()
    }
  }
</script>

<style scoped>

</style>
