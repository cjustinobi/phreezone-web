<template>
  <div>
    <a-page-header sub-title="Sponsor's Network Activities"/>
    <a-table v-if="activities" :columns="columns" :data-source="activities" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }">
      <span slot="fullName" slot-scope="fn, rec"><b>{{ rec.referral }}</b>  <br> <span>{{ rec.full_name }}</span></span>
      <span slot="pkg" slot-scope="pkg" v-if="pkg">{{ pkg.name }}</span>
      <span slot="joined" slot-scope="joined">{{ formatDate(joined) }}</span>
      <span slot="rank" slot-scope="rank">None</span>
      <span slot="pv" slot-scope="pv, rec">{{ rec.accumulatedPv ? rec.accumulatedPv : rec.pv }}</span>
      <span slot="pw" slot-scope="pw, rec">{{ rec.prevWeekAccumulatedPv ? rec.prevWeekAccumulatedPv : rec.prevWeekPoint }}</span>
<!--      <span slot="cw" slot-scope="cw, rec">{{ rec.currentWeekAccumulatedPv ? rec.currentWeekAccumulatedPv : rec.currentWeekPoint }}</span>-->
<!--      <span slot="depth" slot-scope="depth">{{ depth - 1 === 0 ? '' : depth - 1 }}</span>-->
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
      title: 'Accumulated Performance',
      dataIndex: 'pv',
      scopedSlots: { customRender: 'pv' },
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
        this.activities = (await this.$axios.$get(`user/accumulatedPv/${this.userId}`)).data
      },

    },
    mounted() {
      this.getActivites()
    }
  }
</script>

<style scoped>

</style>
