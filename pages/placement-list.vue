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
      <span slot="rank" slot-scope="rank, txt">{{ txt.rank | capitalize }}</span>
<!--      <span slot="total" slot-scope="total, rec">-->

<!--        {{ rec.accumulatedEpp + rec.accumulatedSbp }}-->
<!--      </span>-->
<!--      <span slot="cw_epp" slot-scope="cw_epp, rec">-->
<!--        {{ rec.currentWeekPoint }}-->
<!--&lt;!&ndash;        {{ rec.currentWeekPoint + rec.streamCurrentWeekPoint }}&ndash;&gt;-->
<!--      </span>-->
<!--      <span slot="pw_epp" slot-scope="pw_epp, rec">-->
<!--        {{ rec.prevWeekPoint }}-->
<!--&lt;!&ndash;        {{ rec.prevWeekPoint + rec.streamPrevWeekPoint }}&ndash;&gt;-->
<!--      </span>-->
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
      dataIndex: 'rank',
      scopedSlots: { customRender: 'rank' },
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
  import DateFormat from '../mixins/dateFormat'
  export default {
    name: 'network-activities',
    layout: 'dashboard',
    mixins: [DateFormat],
    filters: {
      capitalize(string) {
        if (string == 0) return 'None'
        return string.charAt(0).toUpperCase() + string.slice(1);
     }
    },
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
