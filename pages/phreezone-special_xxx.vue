<template>
  <div>
    <a-page-header sub-title="Stream Upgrade Order"/>
    <a-row type="flex" justify="space-between">
      <a-col :md="{ span: 6 }" :xs="{ span: 24 }">
        <h5 v-if="agentWallet"><span style="color: grey;" >Available Amount: </span>{{ agentWallet | currency }}</h5>
        <h5 v-else>Available Amount: NGN 0.00</h5> <br>
        <h6 v-if="upgradeUser">{{ upgradeUser.full_name }}</h6>
        <a-input v-model="userReferral" @blur="getMember" placeholder="Member code" />
        <br><br>
      </a-col>
      <a-col :md="{span: 6}">
        <a-card size="small" title="Product Order" style="width: 230px">
          <div>Total Order Amount: <span id="sub">0</span></div>
          <div>Total PV: <span id="subpv">0</span></div>
        </a-card>
        <br>
        <a-button type="primary" @click.prevent="submitOrder" :loading="loading">Submit</a-button>
      </a-col>
    </a-row>



    <a-tabs default-active-key="1" @change="setTabProducts">
      <a-tab-pane v-for="cat in categories" :key="cat.id" :tab="cat.name">
        <div style="overflow-x: auto">
          <table id="table">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Price</th>
              <th>PV</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Subtotal PV</th>
            </tr>
            <tr v-for="product in tabProducts">
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.amount }}</td>
              <td>{{ product.pv }}</td>
              <td>
                <a-input class="qty" @change="populateField($event, product)" min="0" style="width: 100px" type="number"/>
              </td>
              <td class="sub" :id="`sub-${product.id}`" :ref="`sub-${product.id}`">0.00</td>
              <td class="subpv" :id="`subpv-${product.id}`" :ref="`subpv-${product.id}`">0.00</td>
            </tr>
          </table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  const columns = [
    {title: 'Code', dataIndex: 'code'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Price', dataIndex: 'amount'},
    {title: 'PV', dataIndex: 'pv'},
    {title: 'Quantity', scopedSlots: { customRender: 'qty' }},
    {title: 'Subtotal', scopedSlots: { customRender: 'sub' }},
  ]
  import $ from 'jquery'
  export default {
    name: 'phreezone-special',
    layout: 'dashboard',
    middleware: ['stockist'],
    data() {
      return {
        loading: false,
        columns,
        agentWallet: '',
        categories: '',
        products: [],
        tabProducts: [],
        selectedProducts: [],
        userReferral: '',
        upgradeUser: '',
        percentageRate: ''
      }
    },
    methods: {
      async submitOrder() {
        const totalAmount = document.getElementById('sub').innerText
        if (totalAmount > this.agentWallet) return this.$message.error('Insufficient amount in wallet')

        if (!this.products.length || !this.upgradeUser) {
          return this.$message.error('All fields are required')
        }

        this.loading = true

        const res = (await this.$axios.$post(`user/saveOrders`, {
          soldBy: this.userId,
          boughtBy: this.upgradeUser.id,
          items: this.products,
          totalAmount: document.getElementById('sub').innerText,
          totalPv: document.getElementById('subpv').innerText
        }))
        if (res.success) {
          this.reset()
          this.$message.success('Added successfully')
        }
      },
      async getAgentWallet() {
        this.agentWallet = (await this.$axios.$get(`admin/agentWallet/${this.userId}`)).data
      },
      async getMember() {
        try {
          this.upgradeUser = (await this.$axios.$post(`user/null`, {
            userReferral: this.userReferral
          })).data
        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
      },
      async getProducts(catId = 1) {
        this.products = (await this.$axios.$get(`admin/products?active=true`)).data
      },
      setTabProducts(catId = 1) {
        debugger
        this.tabProducts = this.products.filter(prod => prod.category_id == catId)
        console.log(this.tabProducts)
      },
      async getPercentageRate() {
        this.percentageRate = (await this.$axios.$get('admin/percentageRate')).data
      },
      populateField(event, item) {
        // debugger
        const self = this
        const value = event.target.value

        let children = document.querySelectorAll(`table #sub-${item.id}`);

        // const table = document.querySelector('table')
        // table.querySelector(`#sub-${item.id}`).innerText = value * item.amount


        $(function() {

          let sub = 0, subpv = 0;

          $("tr .sub").each(function(index,value){
            let currentRow = parseFloat($(this).text());
            // console.log(currentRow)
            sub += currentRow
          })
          $("tr .subpv").each(function(index,value){
            let currentRow = parseFloat($(this).text());
            subpv += currentRow
          })


          // document.getElementById('sub').innerHTML = `<b>${sub} * ${self.percentageRate} </b>`
          document.getElementById('sub').innerHTML = `<b>${self.calcSubtotal(sub)}</b>`
          document.getElementById('subpv').innerHTML = `<b>${subpv}</b>`

        })

        document.getElementById(`sub-${item.id}`).innerText = value * item.amount
        document.getElementById(`subpv-${item.id}`).innerText = value * item.pv

        this.addProduct(item, value)


      },
      calcSubtotal(sub) {
        return sub + sub * this.percentageRate
      },
      async getProductCategories() {
        this.categories = (await this.$axios.$get('admin/product-category')).data
      },
      addProduct(item, qty) {
        // Remove item if exist and incoming value is 0.
        if (qty == 0) {
          this.selectedProducts = this.selectedProducts.filter(product => product.id != item.id)
          return
        }

        if (qty) {
          // Check if the product has been added before.
          const itemIndex = this.selectedProducts.findIndex(product => product.id == item.id)
          if(itemIndex > -1) {
            this.selectedProducts[itemIndex].qty = qty
          } else {
            item.qty = qty
            this.selectedProducts.push(item)
          }
        }
      },
      reset() {
        this.agentWallet -= document.getElementById('sub').innerHTML
        this.loading = false
        this.products = []
        this.userReferral = ''
        this.upgradeUser = ''
        document.getElementById('sub').innerHTML = `<b>0</b>`
        document.getElementById('subpv').innerHTML = `<b>0</b>`

        $(function() {
          $("tr .sub").each(function(index,value){
            $(this).text(0)
          })
          $("tr .subpv").each(function(index,value){
            $(this).text(0)
          })
        })
      }
    },
    beforeMount() {
      this.getAgentWallet()
      this.getProducts()
      this.getProductCategories()
      this.getPercentageRate()
    }
  };
</script>

<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
  #subpv, #sub {
    font-weight: 900;
  }
</style>
