<template>
  <li>
    <div :class="{bold: isFolder}" @click="toggle">
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      <img width="40px" class="img-responsive img-rounded" src="~assets/img/user.jpg" alt="User picture">
      <strong class="display-block">{{ item.full_name }}</strong>
      <span class="display-block">{{ item.phone }}</span>
      <span class="badge badge-pill badge-warning" v-if="item.package">{{ item.package.name }}</span>
      <span v-else class="display-block">No Package</span>
    </div>
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

<style lang="scss">
  .bold {
    margin: 30px 0;
  }
</style>


