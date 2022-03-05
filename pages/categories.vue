<template>
  <div>
    <a-page-header sub-title="Categories"/>
    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="categoryForm = true">New Category</a-button>
      </a-col>
    </a-row>
    <br>
    <a-modal :visible="categoryForm" @click="categoryForm = false">
      <template slot="footer">
        <a-button key="back" @click="reset">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createCategory">Submit</a-button>
      </template>
      <a-input style="margin-top: 27px;" v-model="name" placeholder="Category name" />
    </a-modal>
    <a-table v-if="categories" :columns="columns" :data-source="categories" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small">
      <span slot="action" slot-scope="text">
        <a-popconfirm
          :title="`Sure you want to ${text.status ? 'disable' : 'enable'} category?`"
          ok-text="Yes"
          cancel-text="No"
          @confirm="disableEnableCategory(text)"
          @cancel="visible = false"
        >
          <a href="#">{{ text.status ? 'Disable Category' : 'Enable Category' }}</a>
        </a-popconfirm>
        <a-button v-if="text.status" type="link" @click="editCategory(text)">Edit</a-button>
      </span>
      <span slot="status" slot-scope="status">
         <a-tag :color="status ? 'green' : 'volcano'">{{ status ? 'Enabled' : 'Disabled'}}</a-tag>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Name', dataIndex: 'name',},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
    {title: 'Action', scopedSlots: { customRender: 'action' }},
  ]

  export default {
    name: 'mainstream-categories',
    layout: 'dashboard',
    data() {
      return {
        loading: false,
        editMode: false,
        categoryForm: false,
        categoryId: '',
        columns,
        name: '',
        categories: ''
      }
    },
    methods: {
      async createCategory() {
        if (!this.name.length) return this.$message.error('Enter Category name')
        this.loading = true
        const res = this.editMode ?
          await this.$axios.$put(`admin/product-category/${this.categoryId}`, {name: this.name}) :
          await this.$axios.$post('admin/product-category', {name: this.name})
        if (res.success) {
          !this.editMode ? this.categories.unshift(res.data) : this.getCategories()
          this.$message.success('Successfully updated')
          this.reset()
        }
      },
      async disableEnableCategory(item) {
        const res = await this.$axios.$put(`admin/product-category-disable-enable/${item.id}`,
          {status: !item.status}
          )
        if (res.success) {
          const itemIndex = this.categories.findIndex(category => category.id == item.id)
          this.categories[itemIndex].status = res.data.status
          this.$message.success('Successfully updated')
        }
      },
      async getCategories() {
        this.categories = (await this.$axios.$get('admin/product-category')).data
      },
      editCategory(val) {
        this.name = val.name
        this.categoryId = val.id
        this.categoryForm = true
        this.editMode = true
      },
      reset() {
        this.name = ''
        this.loading = false
        this.categoryForm = false
        this.editMode = false
      }
    },
    beforeMount() {
      this.getCategories()
    }
  }
</script>

<style scoped>

</style>
