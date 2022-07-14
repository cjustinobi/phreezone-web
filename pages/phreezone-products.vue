<template>
  <div>
    <a-page-header sub-title="Products">
      <template slot="extra">
        <a-button type="primary" @click="productForm = true">New Products</a-button>
      </template>
    </a-page-header>
    <a-row>
      <a-col :span="3">
        <table :style="{display: showTable}" class="table table-hover table-bordered" ref="example">
          <thead>
          <tr>
            <th width="25%">Image</th>
            <th width="15%">Code</th>
            <th width="35%">Name</th>
            <th width="10%">PV</th>
            <th width="15%">Amount</th>
<!--            <th>Pv</th>-->
          </tr>
          </thead>
          <tbody>
          <tr class="pr-tr" v-if="products.length" v-for="product in products" :key="product.id">
            <td><img width="100" :src="product.image_path" /></td>
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.pv}}</td>
            <td>{{product.actual_amount}}</td>
          </tr>
          </tbody>
        </table>
      </a-col>
    </a-row>
    <br>
    <a-modal :visible="productForm" @cancel="productForm = false">
      <template slot="footer">
        <a-button key="back" @click="reset">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createProduct">Submit</a-button>
      </template>

      <a-input style="margin-top: 25px;" v-model="item.name" @change="setCode" placeholder="Product name" />
      <a-input style="margin-top: 25px;" v-model="item.pv" @change="setCode" placeholder="PV" />
      <a-input type="number" style="margin-top: 25px;" v-model="item.price" placeholder="Amount" />
      <a-input type="number" style="margin-top: 25px;" v-model="item.actual_amount" placeholder="Actual Amount" />
      <a-select style="margin-top: 25px; width: 100%; display: block" v-model="item.category_id" placeholder="Select Category">
        <a-select-option v-for="cat in categories" :key="cat.id">{{ cat.name }}</a-select-option>
      </a-select>

      <a-upload list-type="picture" :default-file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
        <a-button style="margin-top: 25px;">
          <a-icon type="upload"/>
          Upload Product Image
        </a-button>
      </a-upload>
    </a-modal>
    <a-space>
      <a-input v-model="searchQuery" @change="search" placeholder="Search Product"/>
      <a-button type="primary" :loading="searching" @click="resetProducts">
        {{ searching ? 'Searching ... ' : 'Reset' }}
      </a-button>
    </a-space>
    <br><br>
    <a-button v-if="products.length" type="primary" @click="printProduct">Download</a-button>
    <a-table
      id="products"
      v-if="products"
      :columns="columns"
      :data-source="products"
      :rowKey="record => record.id"
      :scroll="{ x: 1500 }"
      pagination={false}
      size="small">
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
        <a-icon @click="deleteProduct(text.id)" type="delete" />
      </span>
      <span slot="status" slot-scope="status">
         <a-tag :color="status ? 'green' : 'volcano'">{{ status ? 'Enabled' : 'Disabled'}}</a-tag>
      </span>
      <span slot="image" slot-scope="image">
        <img width="70" :src="image" alt="">
      </span>
      <span slot="price" slot-scope="price"><span>{{ price | currency }}</span></span>
      <span slot="amount" slot-scope="amount"><span>{{ amount | currency }}</span></span>
    </a-table>

  </div>
</template>

<script>

  import upload from '../mixins/upload'

  const columns = [
    {title: 'Image', dataIndex: 'image_path',scopedSlots: {customRender: 'image'}},
    {title: 'Code', dataIndex: 'code'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Amount', dataIndex: 'price',scopedSlots: {customRender: 'price'}},
    {title: 'Actual Amount', dataIndex: 'actual_amount',scopedSlots: {customRender: 'amount'}},
    {title: 'PV', dataIndex: 'pv',},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
    {title: 'Action', scopedSlots: { customRender: 'action' }},
  ]

  const columns2 = [
    {title: 'Image', dataIndex: 'image_path',scopedSlots: {customRender: 'image'}},
    // {title: 'Code', dataIndex: 'code'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Actual Amount', dataIndex: 'actual_amount',scopedSlots: {customRender: 'amount'}},
    {title: 'Actual Amount', dataIndex: 'actual_amount',scopedSlots: {customRender: 'amount'}},
  ]

  export default {
    name: 'phreezone-products',
    layout: 'dashboard',
    mixins: [upload],
    data() {
      return {
        showTable: 'none',
        searching: false,
        loading: false,
        editMode: false,
        productForm: false,
        defaultPageSize: 2000,
        searchQuery: '',
        productId: '',
        columns,
        fileList: '',
        item: {
          name: '',
          code: '',
          price: '',
          actual_amount: '',
          pv: '',
          category_id: ''
        },
        products: '',
        categories: '',
        excelFields: {
          Image: 'image_path',
          Code: 'code',
          AccountNumber: {
            field: 'code',
            callback: val => {
              return JSON.stringify(val)
            }
          }
        }
      }
    },
    methods: {
      async createProduct() {
        if (
          !this.item.name ||
          !this.item.price ||
          !this.item.actual_amount ||
          !this.item.pv
        ) {
          return this.$message.error('All fields are required')
        }
        this.loading = true
        try {
          this.item.image_path = (await this.saveFile(this.fileList[0])).secure_url
        } catch (e) {
          this.$message.error(e)
        }
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
      async deleteProduct(id) {
        const { success } = await this.$axios.$delete(`admin/products/${id}`)
        if (success) {
          this.getProducts()
          this.$message.success('Successfully deleted')
        }
      },
      async search() {
        if (this.searchQuery == '') return;
        this.searching = true
        const res = await this.$axios.$post('admin/product-search', {
          searchQuery: this.searchQuery
        })
        if (res.data.length) {
          this.searching = false
          return this.products = res.data
        }
        this.searching = false
      },
      resetProducts() {
        this.searchQuery = ''
        this.getProducts()
      },
      setCode() {
        const item = this.item
        if(item.name.length <= 2) return item.code = ''
        if (!item.code && item.name.length >= 3) {
          item.code = item.name.substring(0, 3).toUpperCase()
          item.code += Math.floor(100 + Math.random() * 900)
        }
      },
      reset() {
        this.item = {}
        this.loading = false
        this.productForm = false
        this.editMode = false
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file)
        const newFileList = this.fileList.slice()
        newFileList.splice(index, 1)
        this.fileList = newFileList
      },
      beforeUpload(file) {
        this.fileList = [...this.fileList, file]
        return false
      },
      printProduct()  {
        this.showTable = 'block'
        this.$nextTick(function() {
          let div2Print = this.$refs.example
          let newWin = window.open('')
          newWin.document.write(div2Print.outerHTML)
          newWin.print()
          newWin.close()
          this.showTable = 'none'
        })
    return true;
  }
    },
    beforeMount() {
      this.getProducts()
      this.getProductCategories()
      // this.initTable()
    }
  }
</script>

<style scoped>
  .pr-tr {
    margin-bottom: 20px;
  }
</style>
