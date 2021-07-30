<template>
  <div>
    <a-page-header sub-title="Implemented Stream"/>

    <a-row>
      <a-col span="6">
        <a-input
          placeholder="Enter week number"
          v-model="week"
          style="width: 188px; margin-bottom: 8px;"
          @change="getStreams"
          min="1"
          type="number"/>
      </a-col>
    </a-row>

    <a-table :columns="columns" :data-source="bonuses" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small">

    </a-table>
  </div>
</template>

<script>
  let columns = [
    {
      title: 'Full Name',
      dataIndex: 'user.full_name',
      fixed: 'left',
      // width: 110
    },
    {
      title: 'Member Code',
      dataIndex: 'user.referral',
      scopedSlots: { customRender: 'referral' }
    },

    {
      title: 'Total Amount',
      dataIndex: 'amount',
      scopedSlots: { customRender: 'total' }
    },

    // { title: 'Action', dataIndex: '', scopedSlots: { customRender: 'action' } },
  ];


  export default {
    name: 'implemented-stream',
    layout: 'dashboard',
    data() {
      return {
        columns,
        visible: false,
        bonuses: '',
        week: ''
      }
    },
    methods: {
      async getStreams() {
        this.bonuses = (await this.$axios.$post('user/streams', {
          weekNumber: this.week
        })).data
      },
      async implementStream() {
        this.bonuses = (await this.$axios.$post('user/implementStream', {
          weekNumber: this.week
        })).data
      },
      getWeekCommissions() {
        this.getCommissions()
      },
      setWeek() {
        this.week = this.$dateFns.getWeek(new Date()) - 1
      }
    },

    mounted() {
      this.getStreams()
      this.setWeek()
    }
  }
</script>

<style scoped>

</style>
