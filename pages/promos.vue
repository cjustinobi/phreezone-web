<template>
  <div>
    <a-page-header sub-title="Promos">
      <template v-if="isAdmin" slot="extra">
        <a-button type="primary" @click="() => $router.push('/add-promo')">Add Promo</a-button>
      </template>
    </a-page-header>

    <a-modal v-model="showQualifiers" :title="`Members`" :footer="null">
      <a-table
        v-if="qualifiers.length"
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
        <span v-if="selectedPromo.balanced_leg" slot="tp" slot-scope="tp, rec">
          <span v-if="rec.hasOwnProperty('left_downline_points')">
            LL {{ rec.left_downline_points ? rec.left_downline_points + '/' + selectedPromo.pv : '0/' + selectedPromo.pv }}
            <a-tag :color="rec.left_downline_points >= selectedPromo.pv ? 'green' : 'volcano'">
            {{ rec.left_downline_points >= selectedPromo.pv ? 'Qualified' : 'Not Qualified' }}
            </a-tag>
          </span>
           <span v-else>LL 0/{{ selectedPromo.pv }} <a-tag :color="'volcano'">Not Qualified</a-tag></span> <br>

          <span v-if="rec.hasOwnProperty('right_downline_points')">
            RL {{ rec.right_downline_points ? rec.right_downline_points + '/' + selectedPromo.pv : '0/' + selectedPromo.pv }}
            <a-tag :color="rec.right_downline_points >= selectedPromo.pv ? 'green' : 'volcano'">
            {{ rec.right_downline_points >= selectedPromo.pv ? 'Qualified' : 'Not Qualified' }}
            </a-tag>
          </span>
          <span v-else>RL 0/{{ selectedPromo.pv }} <a-tag :color="'volcano'">Not Qualified</a-tag></span>
        </span>
<!--        <span v-else slot="tp" slot-scope="tp">-->
<!--          <a-tag :color="status.point >= selectedPromo.pv ? 'green' : 'volcano'">-->
<!--          {{ status.point >= selectedPromo.pv ? 'Qualified' : 'Not Qualified' }}-->
<!--          </a-tag>-->
<!--        </span>-->
        <span v-if="selectedPromo.balanced_leg" slot="pp" slot-scope="pp, rec">
          {{ pp }}/{{ selectedPromo.pv }}
          <a-tag :color="pp >= selectedPromo.pv ? 'green' : 'volcano'">
          {{ pp >= selectedPromo.pv ? 'Qualified' : 'Not Qualified' }}
          </a-tag>
        </span>
      </a-table>
      <a-empty v-else />
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
      <a-button type="link" slot="promoTitle" slot-scope="promoTitle, rec" @click="getQualifiers(rec)">
        {{ promoTitle }}
      </a-button>
      <span slot="image" slot-scope="image"><img :src="image"></span>
      <span slot="point" slot-scope="point, rec">
        Personal Point: <b>{{ point }}</b> <br>
        <span v-if="rec.balanced_leg">Each leg point: <b>{{ rec.leg_pv }}</b></span>
      </span>
      <span slot="pp" slot-scope="pp">{{ pp == '0' ? 'No' : 'Yes' }}</span>
      <span slot="bl" slot-scope="bl">{{ bl == '0' ? 'No' : 'Yes' }}</span>
      <span slot="start" slot-scope="start">{{ formatDate(start) }}</span>
      <span slot="end" slot-scope="end">{{ formatDate(end) }}</span>

<!--      <a-dropdown slot="action" slot-scope="text" href="javascript:;">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item v-if="text.active" key="1">-->
      <span v-if="isAdmin" slot="action" slot-scope="text">
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
    { title: 'Point', dataIndex: 'pv', scopedSlots: { customRender: 'point' }},
    { title: 'Personal Point', dataIndex: 'personal_points', scopedSlots: { customRender: 'pp' }},
    { title: 'Balanced Leg', dataIndex: 'balanced_leg', scopedSlots: { customRender: 'bl' }},
    { title: 'Start', dataIndex: 'start_date', scopedSlots: { customRender: 'start' } },
    { title: 'End', dataIndex: 'end_date', scopedSlots: { customRender: 'end' } },
    { title: 'Actions', scopedSlots: { customRender: 'action' } },
  ]

  const qualifierColumns = [
    { title: 'Full Name', dataIndex: 'user', scopedSlots: { customRender: 'name' }, fixed: 'left'},
    { title: 'PP', dataIndex: 'point', scopedSlots: { customRender: 'pp' }},
    { title: 'Total PV', scopedSlots: { customRender: 'tp' }},
    // { title: 'Action', scopedSlots: { customRender: 'action' }},
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
        selectedPromo: '',
        dateFormat: 'd MMM, Y',
      }
    },
    methods: {
      async getPromos() {
        this.promos = (await this.$axios.$get('admin/promos')).data
      },
      async deletePromo(id) {
        const res = await this.$axios.$delete(`admin/promos/${id}`)
        if (res.success) {
          this.$message.success('Promo Deleted')
          this.promos = this.promos.filter(promo => promo.id != id)
        }
      },
      async getQualifiers(promo) {
        const res = (await this.$axios.$post(`admin/promo-qualifiers/${promo.id}`)).data
        this.qualifiers = this.isAdmin ? res : res.filter(item => item.user_id == this.userId)
        this.showQualifiers = true
        this.selectedPromo = promo
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
