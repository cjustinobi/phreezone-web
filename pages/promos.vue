<template>
  <div>
    <a-page-header sub-title="Promos">
      <template slot="extra">
        <a-button type="primary" @click="() => $router.push('/add-promo')">Add Promo</a-button>
      </template>
    </a-page-header>

    <a-modal v-model="showQualifiers" :title="`Members`" :footer="null">
      <a-table
        :columns="qualifierColumns"
        :data-source="qualifiers"
        :rowKey="record => record.id"
        size="small"
        :scroll="{ x: 800, y: 300 }"
      >
        <span slot="name" slot-scope="name">
          {{ name.full_name }}<br>
          <a-tag :color="'green'">
            {{ name.referral }}
          </a-tag>
        </span>
        <span slot="status" slot-scope="status">
          <a-tag :color="status.point >= benchmark ? 'green' : 'volcano'">
          {{ status.point >= benchmark ? 'Qualified' : 'Not Qualified' }}
          </a-tag>
        </span>
      </a-table>
    </a-modal>

    <a-table
      v-if="promos"
      :columns="columns"
      :data-source="promos"
      :rowKey="record => record.id"
      :scroll="{ x: 1000, y: 300 }"
      size="small"
      :pagination="{ pageSize: 50 }"
    >
      <a-button type="link" slot="promoTitle" slot-scope="promoTitle, rec" @click="getQualifiers(rec.id)">
        {{ promoTitle }}
      </a-button>
      <span slot="image" slot-scope="image"><img :src="image"></span>
      <span slot="pp" slot-scope="pp">{{ pp == '0' ? 'No' : 'Yes' }}</span>
      <span slot="bl" slot-scope="bl">{{ bl == '0' ? 'No' : 'Yes' }}</span>
      <span slot="start" slot-scope="start">{{ formatDate(start) }}</span>
      <span slot="end" slot-scope="end">{{ formatDate(end) }}</span>

<!--      <a-dropdown slot="action" slot-scope="text" href="javascript:;">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item v-if="text.active" key="1">-->
      <span slot="action" slot-scope="text">
        <a-popconfirm
          :title="`Sure you want to delete Promo?`"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deletePromo(text.id)"
          @cancel="visible = false"
        >
          <a href="#">Delete</a>
        </a-popconfirm>
      </span>
<!--          </a-menu-item>-->
<!--          <a-menu-item key="2">-->
<!--            <nuxt-link :to="{ name: 'users-id', params: { id: text.id , user: text }}">Edit</nuxt-link>-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="3">-->
<!--            Delete-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button> Actions <a-icon type="down" /> </a-button>-->
<!--      </a-dropdown>-->

      <span slot="active" slot-scope="active">
        <a-tag :color="active == '0' ? 'volcano' : 'green'">
          {{ active == '0' ? 'Not Active' : 'Active'}}
        </a-tag>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    { title: 'Image', dataIndex: 'image_path', scopedSlots: { customRender: 'image' }},
    { title: 'Title', dataIndex: 'title', scopedSlots: { customRender: 'promoTitle' }},
    { title: 'Personal Point', dataIndex: 'personal_points', scopedSlots: { customRender: 'pp' }},
    { title: 'Balanced Leg', dataIndex: 'balanced_leg', scopedSlots: { customRender: 'bl' }},
    { title: 'Start', dataIndex: 'start_date', scopedSlots: { customRender: 'start' } },
    { title: 'End', dataIndex: 'end_date', scopedSlots: { customRender: 'end' } },
    { title: 'Actions', scopedSlots: { customRender: 'action' } },
  ]

  const qualifierColumns = [
    { title: 'Full Name', dataIndex: 'user', scopedSlots: { customRender: 'name' }, fixed: 'left'},
    { title: 'Points', dataIndex: 'point', scopedSlots: { customRender: 'point' }},
    { title: 'Status', scopedSlots: { customRender: 'status' }},
    { title: 'Action', scopedSlots: { customRender: 'action' }},
  ]

  import dateFormat from '@/mixins/dateFormat'

  export default {
    layout: 'dashboard',
    name: 'promo',
    mixins: [dateFormat],
    data() {
      return {
        showQualifiers: false,
        qualifierColumns,
        columns,
        qualifiers: '',
        promos: '',
        benchmark: '',
        dateFormat: 'd MMM, Y',
      }
    },
    methods: {
      async getPromos() {
        this.promos = (await this.$axios.$get('admin/promos')).data
      },
      async deletePromo(id) {
        alert(id)
      },
      async getQualifiers(i, benchmark) {
        this.qualifiers = (await this.$axios.$post(`admin/promo-qualifiers/${i}`)).data
        this.showQualifiers = true
        this.benchmark = benchmark
      }
    },
    beforeMount() {
      this.getPromos()
    }
  }
</script>

<style scoped>
  img {
    width: 120px;
  }
</style>
