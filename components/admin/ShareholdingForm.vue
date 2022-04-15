<template>
  <div>
    <a-row :gutter="4">
      <a-col>
        <a-input v-model.number="details.qty" placeholder="Number of Slots" />
        <br><br>
        <a-input v-model="details.price" placeholder="Price per slot" />
        <br><br>
        <a-button type="primary" @click="saveShare">
          {{ loading ? 'Saving ...' : 'Save' }}
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'ShareholdingForm',
    data() {
      return {
        loading: false,
        details: {
          qty: '',
          price: ''
        }
      }
    },
    methods: {
      async saveShare() {
        if (!this.details.qty && !this.details.price) {
          return this.$message.error('All fields are required')
        }

        this.loading = true
        const res = (await this.$axios.$post('admin/shares', this.details)).data
        if (res) {
          this.loading = false
          window.location.reload()
        }
        console.log(res)
      }
    }
  }
</script>

<style scoped>

</style>
