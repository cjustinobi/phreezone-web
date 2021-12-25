<template>
  <div>
    <a-page-header sub-title="Settings"/>
    <ChangePassword />

    <div v-if="isAdmin">
      <p>Dollar Rate: <b>{{ dollar }}</b></p>
      <div class="mb">
        <a-input v-model="dollarRate" type="number" style="width: 200px" placeholder="Update dollar rate"/>
        <a-button @click="updateDollarRate" type="primary">Update</a-button>
      </div>
      <p>Percentage Rate: <b>{{ percentage }}</b></p>
      <div class="mb">
        <a-input v-model="percentageRate" type="number" style="width: 200px" placeholder="Percentage rate"/>
        <a-button @click="updatePercentageRate" type="primary">Update</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ChangePassword from '~/components/shared/ChangePassword'
  export default {
    name: 'settings',
    layout: 'dashboard',
    components: {
      ChangePassword
    },
    data() {
      return {
        dollar: '',
        dollarRate: '',
        percentage: '',
        percentageRate: '',
      }
    },
    methods: {
      async updateDollarRate() {
        if (!this.dollarRate) return this.$message.error('Enter valid input')
        const res = this.$axios.$put('admin/dollarRate', {dollarRate: parseInt(this.dollarRate)})
        if (res) {
          this.getDollarRate()
          this.dollarRate = ''
          this.$message.success('Saved successfully')
        }
      },
      async updatePercentageRate() {
        if (!this.percentageRate) return this.$message.error('Enter valid input')
        const res = this.$axios.$put('admin/percentageRate', {percentageRate: this.percentageRate})
        if (res) {
          this.getPercentageRate()
          this.percentageRate = ''
          this.$message.success('Saved successfully')
        }
      },
      async getDollarRate() {
        this.dollar = (await this.$axios.$get('admin/dollarRate')).data
      },
      async getPercentageRate() {
        this.percentage = (await this.$axios.$get('admin/percentageRate')).data
      },
    },
    beforeMount() {
      this.getDollarRate()
      this.getPercentageRate()
    }
  }
</script>

<style scoped>
  .mb {
    margin-bottom: 10px;
  }
</style>
