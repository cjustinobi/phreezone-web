<template>
  <div>
    <a-page-header sub-title="Placement Activities"/>
    <a-table
      v-if="activities"
      :columns="columns"
      :data-source="activities"
      :rowKey="record => record.id"
      bordered
      :scroll="{ x: 1500, y: 300 }">

      <span slot="fullName" slot-scope="fn, rec"><b>{{ rec.referral }}</b>  <br> <span>{{ rec.full_name }}</span></span>
      <span slot="pkg" slot-scope="pkg" v-if="pkg">{{ pkg.name }}</span>
      <span slot="joined" slot-scope="joined">{{ formatDate(joined) }}</span>
      <span slot="rnk" slot-scope="rnk" v-if="rnk">{{ rnk | rank }}</span>
      <span  v-else>No rank</span>
    </a-table>
  </div>
</template>

<script>

  const columns = [
    {
      title: 'Member',
      dataIndex: 'full_name',
      // fixed: 'left',
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
      dataIndex: 'rank',
      scopedSlots: { customRender: 'rnk' },
    },
    {
      title: 'Generation',
      dataIndex: 'depth',
      scopedSlots: { customRender: 'depth' }
    },
    {
      title: 'Previous Week Accumulated',
      children: [
        {
          title: 'EPP',
          dataIndex: 'prevWeekPoint',
          scopedSlots: { customRender: 'pw_epp' }
        },
        {
          title: 'SBP',
          dataIndex: 'streamPrevWeekPoint',
          scopedSlots: { customRender: 'pw_sbp' }
        }
      ]
    },
    {
      title: 'Current Week Accumulated',
      children: [
        {
          title: 'EPP',
          dataIndex: 'currentWeekPoint',
          scopedSlots: { customRender: 'cw_epp' }
        },
        {
          title: 'SBP',
          dataIndex: 'streamCurrentWeekPoint',
          scopedSlots: { customRender: 'cw_sbp' }
        }
      ]
    },
    {
      title: 'Personal Accumulated PV',
      scopedSlots: { customRender: 'total' },
      children: [
        {title: 'EPP', dataIndex: 'totalPersonalEpp'},
        {title: 'SBP', dataIndex: 'totalPersonalSbp'}
      ]
    },
    {
      title: 'Total Accumulated PV',
      scopedSlots: { customRender: 'total' },
      children: [
        {title: 'EPP', dataIndex: 'accumulatedEpp'},
        {title: 'SBP', dataIndex: 'accumulatedSbp'}
      ]
    },
    // {
    //   title: 'SBP',
    //   dataIndex: 'weekly_stream_pv',
    //   scopedSlots: { customRender: 'sbp' },
    // },
  ]

  import rank from '../mixins/rank'
  import DateFormat from '../mixins/dateFormat'
  export default {
    name: 'network-activities',
    layout: 'dashboard',
    mixins: [DateFormat, rank],
    data() {
      return {
        columns,
        dateFormat: 'd MMM, Y',
        activities: ''
      }
    },
    methods: {
      async getActivites() {
        this.activities = (await this.$axios.$post(`user/accumulatedPv/${this.userId}`, {
          // type: 'placement'
        })).data
      },

    },
    mounted() {
      this.getActivites()
    }
  }
</script>

<style scoped>

</style>
