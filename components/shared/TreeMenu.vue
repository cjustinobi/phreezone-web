<template>
  <li>
    <a-card class="bold" @click="toggle">
      <span v-if="isFolder">
        <a-icon v-if="isOpen" type="down" />
        <a-icon v-else type="up" />
      </span>
      <img width="40px" class="img-responsive img-rounded display-block" src="~assets/img/user.jpg" alt="User picture">
      <strong class="display-block">{{ item.referral }}</strong>
      <strong class="display-block">{{ item.full_name }}</strong>
      <span class="display-block">{{ item.phone }}</span>
      <span class="badge badge-pill badge-warning" v-if="item.package">{{ item.package.name }}</span>
      <span v-else class="display-block">No Package</span>
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
  data: function() {
    return {
      isOpen: false
    };
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
  }
}
</script>

<style scoped lang="scss">
  li { list-style: none }
  .bold {
    /*display: flex;*/
    /*justify-content: center;*/
    /*justify-items: center;*/
    margin: 30px 0;
    width: 220px;
  }
</style>


