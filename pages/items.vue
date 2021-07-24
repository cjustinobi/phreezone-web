<template>
  <div>
    <a-page-header sub-title="Products"/>
    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="productForm = true">New Products</a-button>
      </a-col>
    </a-row>
    <br>
    <a-modal :visible="productForm">
      <template slot="footer">
        <a-button key="back" @click="reset">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createProduct">Submit</a-button>
      </template>
      <a-input style="margin-top: 25px;" v-model="item.name" placeholder="Product name" />
      <a-input style="margin-top: 25px;" v-model="item.code" placeholder="Code" />
      <a-select v-model="item.category_id" placeholder="Select category" style="margin-top: 25px; width: 200px" >
        <a-select-option v-for="cat in categories" :value="cat.id">{{ cat.name }}</a-select-option>
      </a-select>
      <a-input type="number" style="margin-top: 25px;" v-model="item.amount" placeholder="Amount" />
      <a-input type="number" style="margin-top: 25px;" v-model="item.pv" placeholder="PV" />
    </a-modal>
    <a-table v-if="products" :columns="columns" :data-source="products" :rowKey="record => record.id" :scroll="{ x: 1500, y: 300 }" size="small">
      <span slot="action" slot-scope="text">
        <a-popconfirm
          :title="`Sure you want to ${text.status ? 'disable' : 'enable'} product?`"
          ok-text="Yes"
          cancel-text="No"
          @confirm="disableEnableProduct(text)"
          @cancel="visible = false"
        >
          <a href="#">{{ text.status ? 'Disable Product' : 'Enable Product' }}</a>
        </a-popconfirm>
        <a-button v-if="text.status" type="link" @click="editProduct(text)">Edit</a-button>
      </span>
      <span slot="status" slot-scope="status">
         <a-tag :color="status ? 'green' : 'volcano'">{{ status ? 'Enabled' : 'Disabled'}}</a-tag>
      </span>
    </a-table>
  </div>
</template>

<script>
  const columns = [
    {title: 'Code', dataIndex: 'code',},
    {title: 'Name', dataIndex: 'name',},
    {title: 'Amount', dataIndex: 'amount',},
    {title: 'PV', dataIndex: 'pv',},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
    {title: 'Action', scopedSlots: { customRender: 'action' }},
  ]

  export default {
    name: 'items',
    layout: 'dashboard',
    data() {
      return {
        loading: false,
        editMode: false,
        productForm: false,
        productId: '',
        columns,
        item: {
          name: '',
          code: '',
          amount: '',
          pv: '',
          category_id: ''
        },
        products: '',
        categories: ''
      }
    },
    methods: {
      async createProduct() {
        if (!this.item.name || !this.item.code || !this.item.amount || !this.item.pv) {
          return this.$message.error('All fields are required')
        }
        this.loading = true
        const res = this.editMode ?
          await this.$axios.$put(`admin/products/${this.productId}`, this.item) :
          await this.$axios.$post('admin/products', this.item)
        if (res.success) {
          await this.getProducts()
          this.$message.success('Successfully updated')
          this.reset()
        }
      },
      async disableEnableProduct(item) {
        const res = await this.$axios.$put(`admin/products/disable-enable/${item.id}`,
          {status: !item.status}
          )
        if (res.success) {
          const itemIndex = this.products.findIndex(product => product.id == item.id)
          this.products[itemIndex].status = res.data.status
          this.$message.success('Successfully updated')
        }
      },
      async getProducts() {
        this.products = (await this.$axios.$get('admin/products')).data
      },
      async getProductCategories() {
        this.categories = (await this.$axios.$get('admin/product-category')).data
      },
      editProduct(item) {
        this.item = item
        this.productId = item.id
        this.productForm = true
        this.editMode = true
      },
      reset() {
        this.item = {}
        this.loading = false
        this.productForm = false
        this.editMode = false
      }
    },
    beforeMount() {
      this.getProducts()
      this.getProductCategories()
    }
  }
</script>

<style scoped>

</style>
