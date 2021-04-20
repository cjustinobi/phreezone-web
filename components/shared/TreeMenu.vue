<template>
  <li>
    <a-card class="tf-nc"  @click="toggle">
      <span v-if="isFolder">
        <a-icon v-if="isOpen" type="down" />
        <a-icon v-else type="up" />
      </span>
      <img
        width="40px"
        class="img-responsive img-rounded display-block"
        :src="item.gender == 'm' ? require('@/assets/img/user.jpg') : require('@/assets/img/female.png')"
        alt="User picture"
      >
      <strong class="display-block">{{ item.referral }}</strong>
      <strong class="display-block">{{ item.full_name }}</strong>
      <span class="display-block">No Rank</span>
      <span class="badge badge-pill badge-warning" v-if="item.package">{{ item.package.name }}</span>
      <span v-else class="display-block">No Package</span>
<!--      <span class="display-block">{{ getAccumPV(item.id) }}</span>-->
      <span class="display-block">
        Member Under Network {{ item.member_network_count }}
      </span>
    </a-card>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />

    </ul>
  </li>
</template>

<script>

export default {
  name: 'tree-item',
  props: ['item'],
  data() {
    return {
      isOpen: false,
      pvs: ''
    };
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    async getAccumPV(id) {
      return (await this.$axios.$post(`user/treeAccumulatedPoints/${id}`, {
        type: 'placement'
      })).data
    }
  },
  mounted() {
    document.querySelector('.tf-nc').click()
  }
}
</script>

<style scoped lang="scss">
  li { list-style: none }

</style>


