<template>
  <div>
    <a-page-header sub-title="Products">
      <template slot="extra">
        <a-button type="primary" @click="productForm = true">New Products</a-button>
      </template>
    </a-page-header>
    <a-row>
      <a-col :span="3">
        <table style="display: none" class="table table-hover table-bordered" id="example">
          <thead>
          <tr>
            <th>Image</th>
            <th>Code</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Pv</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="products.length" v-for="product in products" :key="product.id">
            <td><img :src="product.image_path" /></td>
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.amount}}</td>
            <td>{{product.pv}}</td>
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
      <a-input type="number" style="margin-top: 25px;" v-model="item.amount" placeholder="Amount" />
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
      <span slot="image" slot-scope="image">
        <img width="70" :src="image" alt="">
      </span>
    </a-table>

  </div>
</template>

<script>
  // import 'bootstrap/dist/css/bootstrap.min.css'
  // import 'jquery/dist/jquery.min.js'
  //Datatable Modules
  // import 'datatables.net-dt/js/dataTables.dataTables'
  // import 'datatables.net-dt/css/jquery.dataTables.min.css'
  // import 'datatables.net-buttons/js/dataTables.buttons.js'
  // import 'datatables.net-buttons/js/buttons.colVis.js'
  // import 'datatables.net-buttons/js/buttons.flash.js'
  // import 'datatables.net-buttons/js/buttons.html5.js'
  // import 'datatables.net-buttons/js/buttons.print.js'
  // import $ from 'jquery'

  import upload from '../mixins/upload'


  const columns = [
    {title: 'Image', dataIndex: 'image_path',scopedSlots: {customRender: 'image'}},
    {title: 'Code', dataIndex: 'code',},
    {title: 'Name', dataIndex: 'name',},
    {title: 'Amount', dataIndex: 'amount',},
    {title: 'PV', dataIndex: 'pv',},
    {title: 'Status', dataIndex: 'status', scopedSlots: { customRender: 'status' }},
    {title: 'Action', scopedSlots: { customRender: 'action' }},
  ]

  export default {
    name: 'phreezone-products',
    layout: 'dashboard',
    mixins: [upload],
    data() {
      return {
        loading: false,
        editMode: false,
        productForm: false,
        productId: '',
        columns,
        fileList: '',
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
        if (!this.item.name || !this.item.amount || !this.item.pv) {
          return this.$message.error('All fields are required')
        }
        this.loading = true
        this.item.image_path = (await this.saveFile(this.fileList[0])).secure_url
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
      initTable() {
        setTimeout(function(){
            $('#example').DataTable(
              {
                "paging":   false,
                "ordering": false,
                "info":     false,
                "bFilter": false,

                // pagingType: 'full_numbers',
                // pageLength: 5,
                processing: true,
                dom: 'Bfrtip',
                buttons: ['pdf'],
                // columns: [
                //   {
                //     data: 'code',
                //     render: function(data, type) {
                //       console.log(data)
                //     }
                //   },
                // ]
              }
            );
          },
          5000
        );
      }
    },
    beforeMount() {
      this.getProducts()
      this.getProductCategories()
      // this.initTable()
    }
  }
</script>

<style>
  .buttons-print, .buttons-pdf {
    background: #216ad4;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #fefefe;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
</style>
