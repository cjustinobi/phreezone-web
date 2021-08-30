<template>
  <div>
    <a-page-header sub-title="Team Performance Activities">
      <template slot="extra" v-if="isAdmin">
        <a-button type="primary" @click="resetWeeklyPv">Reset Weekly Stream</a-button>
      </template>
    </a-page-header>
    <div class="tf-tree example">
      <ul id="demo">
        <TreeItem class="item" :item="treeData"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import TreeItem from '@/components/shared/TreeMenu'
  export default {
    name: 'team-performance',
    layout: 'dashboard',
    components: {
      TreeItem
    },
    data() {
      return {
        treeData: '',
      }
    },
    methods: {
      async getTrees() {
        this.treeData = (await this.$axios.$get(`user/${this.userId}/trees`))
      },
      async resetWeeklyPv() {
        const res = await this.$axios.$get(`resetPvs`)
        if (res) {
          this.getTrees()
          this.$message.success('Stream Pvs resetted')
        }
      },
    },
    mounted() {
      this.getTrees()
    }
  }
</script>

<style scoped>
  @import "https://unpkg.com/treeflex/dist/css/treeflex.css";
  #demo {
    list-style-type: none;
  }
  .example .tf-nc {
    color: gold;
  }

  .tf-custom .tf-nc:before,
  .tf-custom .tf-nc:after {
    color: red;
  }

  .tf-custom li li:before {
    color: yellow;
  }
  .tf-dotted-children {
    color: green;
  }
</style>
