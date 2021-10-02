<template>
  <div>
    <a-page-header sub-title="Team Performance Activities">
      <template slot="extra" v-if="isAdmin">
        <a-button type="primary" @click="resetWeeklyPv">Reset Weekly Stream</a-button>
      </template>
    </a-page-header>

    <a-row v-if="treeData.length" type="flex" justify="center" style="margin-bottom: 36px;">
      <a-col v-if="treeData.length && treeData[0]" :xs="12" :lg="6">
        <div class="item" style="margin-right: 1px;">
          <a-row :gutter="4">
            <a-col class="col" :xs="24">
              <img
                width="40px"
                class="img-responsive"
                :src="treeData[0].gender == 'm' ? require('@/assets/img/user.jpg') : require('@/assets/img/female.png')"
                alt="User picture"
              >
              <div class="detail">
                {{ treeData[0].full_name }}
                <a-tag class="ref" color="green">
                  {{ treeData[0].referral }}
                </a-tag>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong v-if="treeData[0].rank"><b>{{ treeData[0].rank | rank }}</b></strong>
                <strong v-else>No Rank</strong>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong  v-if="treeData[1].package">{{ treeData[1].package.name }}</strong>
                <strong v-else >No Package</strong>
              </div>
            </a-col>
          </a-row>
          <div class="stream">
            <strong class="detail">Stream PV <span class="spv">{{ treeData[1].downlines_stream_pv }}</span></strong>
          </div>
          <div class="stream">
            <strong class="detail">Member Under {{ treeData[0].member_network_count }}</strong>
          </div>
          <div class="stream" v-if="treeData[0].id != '1'">
            <img src="~/assets/img/arrow_back.svg" @click="getTrees(treeData[0].parent_id)"/>
          </div>
        </div>
      </a-col>

    </a-row>

    <a-row type="flex" justify="center">
      <a-col v-if="treeData.length && treeData[1]" :xs="12" :lg="6">
        <div class="item" style="margin-right: 1px;">
          <a-row :gutter="4">
            <a-col class="col" :xs="24">
              <img
                width="40px"
                class="img-responsive"
                :src="treeData[1].gender == 'm' ? require('@/assets/img/user.jpg') : require('@/assets/img/female.png')"
                alt="User picture"
              >
              <div class="detail">
                {{ treeData[1].full_name }}
                <a-tag class="ref" color="green">
                  {{ treeData[1].referral }}
                </a-tag>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong v-if="treeData[1].rank"><b>{{ treeData[1].rank | rank }}</b></strong>
                <strong v-else>No Rank</strong>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong  v-if="treeData[1].package">{{ treeData[1].package.name }}</strong>
                <strong v-else >No Package</strong>
              </div>
            </a-col>
          </a-row>
          <div class="stream">
            <strong class="detail">Stream PV <span class="spv">{{ treeData[1].downlines_stream_pv }}</span></strong>
          </div>
          <div class="stream">
            <strong class="detail">Member Under {{ treeData[1].member_network_count }}</strong>
          </div>
          <div class="stream">
            <img src="~/assets/img/arrow.svg" @click="getTrees(treeData[1].id)"/>
            </a-space>
          </div>
        </div>
      </a-col>
      <a-col v-if="treeData.length && treeData[2]" :xs="12" :lg="6">
        <div class="item" style="margin-left: 1px;">
          <a-row :gutter="4">
            <a-col class="col" :xs="24">
              <img
                width="40px"
                class="img-responsive"
                :src="treeData[2].gender == 'm' ? require('@/assets/img/user.jpg') : require('@/assets/img/female.png')"
                alt="User picture"
              >
              <div class="detail">
                {{ treeData[2].full_name }}
                <a-tag class="ref" color="green">
                  {{ treeData[2].referral }}
                </a-tag>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong v-if="treeData[2].rank"><b>{{ treeData[2].rank | rank }}</b></strong>
                <strong v-else>No Rank</strong>
              </div>
            </a-col>
            <a-col class="col" :xs="12">
              <div class="detail">
                <strong  v-if="treeData[2].package">{{ treeData[2].package.name }}</strong>
                <strong v-else >No Package</strong>
              </div>
            </a-col>
          </a-row>
          <div class="stream">
            <strong class="detail">Stream PV <span class="spv">{{ treeData[2].downlines_stream_pv }}</span></strong>
          </div>
          <div class="stream">
            <strong class="detail">Member Under {{ treeData[2].member_network_count }}</strong>
          </div><i type="arrow-right" />
          <div class="stream">
            <img src="~/assets/img/arrow.svg" @click="getTrees(treeData[2].id)"/>
          </div>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script>
  export default {
    name: 'team-performance',
    layout: 'dashboard',
    filters: {
      rank (value) {
        if (!value) return ''
        let r;
        switch(value) {
          case 'd1':
            r = 'Diamond 1'
            break;
          case 'd2':
            r = 'Diamond 2'
            break;
          case 'd3':
            r = 'Diamond 3'
            break;
          case 'd4':
            r = 'Diamond 4'
            break;
          default:
            r = 'No rank'
        }
        return r
      }
    },
    data() {
      return {
        treeData: '',
      }
    },
    methods: {
      async getTrees(userId) {
        this.treeData = (await this.$axios.$get(`user/${userId}/trees`)).data
      },
      async resetWeeklyPv() {
        const res = await this.$axios.$get(`resetPvs`)
        if (res) {
          this.getTrees(this.userId)
          this.$message.success('Stream Pvs resetted')
        }
      },
    },
    mounted() {
      this.getTrees(this.userId)
    }
  }
</script>

<style scoped>
  img {
    margin-bottom: 12px;
  }

  .col {
    margin-bottom: 8px;
  }

  .item {
    background: #d48f10;
    border-radius: 10px;
    font-size: 0.5rem;
    padding: 5px;
  }

  .detail {
    background: #fefefe;
    padding: 2px 4px;
    border-radius: 5px;
  }
  .stream {
    display: grid;
    justify-content: center;
    margin-bottom: 12px;
  }
  .spv {
    color: #ba3d3d;
  }
  .ref {
    font-size: 0.9em;
  }
</style>
