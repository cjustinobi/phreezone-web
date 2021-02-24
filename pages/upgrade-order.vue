<template>
  <div>
    <a-page-header sub-title="Upgrade Order"/>
    <a-row>
      <a-col :span="4">
        <a-input v-model="referralCode" />
      </a-col>
      <a-col :span="4">
        <a-select v-model="amount" style="width: 200px">
          <a-select-option value="">Select Amount</a-select-option>
          <a-select-option v-for="(amt, i) in amounts" :value="amt" :key="i">{{ amt }}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
              <a-popconfirm
                title="Are you sure confirming this payment?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirmPop(pop.id)"
                @cancel="visible = false"
              >
                <a href="#">Upgrade</a>
              </a-popconfirm>

      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'upgrade-order',
    layout: 'admin-dashboard',
    data() {
      return {
        amount: '',
        visible: false,
        referralCode: ''
      }
    },
    methods: {
      async upgrade() {

      }
    }
  }
</script>

<style scoped>

</style>
