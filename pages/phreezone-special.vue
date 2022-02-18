<template>
  <div>
    <a-page-header sub-title="Stream Upgrade Order"/>
    <a-modal :visible="cart" :footer="false" @cancel="cart = false">
      <div v-if="selectedProducts.length" class="cart-items">
        <div>
          <div class="cart-item" v-for="item in selectedProducts" :key="item.id">
            <img :src="item.image_path"/>
            <div class="ml-4">
              <p>{{ item.name }} <br><small>{{ item.code }}</small></p>
            </div>
            <div class="ml-4 apart">
              <a-icon @click="removeProduct(item, 1)" class="icon" type="minus-circle" />
              <span style="font-size: 20px;">{{ item.qty }}</span>
              <a-icon @click="addProduct(item, 1)" class="icon" type="plus-circle" />
            </div>
            <div class="ml-4">
              <b>{{ item.subPv }}</b><br>
              <small>{{ item.pv }}</small>
            </div>
            <div class="ml-4">
              <b>{{ item.amount | currency }}</b><br>
              <small>{{ item.price | currency }}</small>
            </div>
            <a-icon @click="deleteSelectedProduct(item.id)" class="icon del" type="delete" />
          </div>
        </div>
        <div>
          <p><b>Total Price:</b> {{ totalOrder | currency }}</p>
          <p><b>Total PV:</b> {{ totalPv }}</p>
          <a-button class="success" @click.prevent="submitOrder" :loading="loading">
            Submit
          </a-button>
            <a-button type="primary" @click="cart = false">
              Continue Shopping
            </a-button>
        </div>
      </div>
      <a-empty v-else />
    </a-modal>
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
          <div>Total Order Amount: {{ totalOrder | currency }}</div>
          <div>Total PV: {{ totalPv }}</div>
        </a-card>
        <br>
        <a-button type="primary" @click="cart = true">View Cart</a-button>
        <a-button class="success" @click.prevent="submitOrder" :loading="loading">Submit</a-button>
      </a-col>
    </a-row>

    <a-tabs @change="getProducts">
      <a-tab-pane v-for="cat in categories" :key="cat.id" :tab="cat.name">
        <div class="items">
          <div class="item" v-for="prod in products">
            <img :src="prod.image_path" alt="">
            <div style="margin-top: 10px; margin-bottom: 10px;">
              <span style="font-weight: bolder; ">{{ prod.name }}</span><br>
              {{ prod.code }}
            </div>
            <p class="apart">
              <span>{{ prod.price | currency }}<br><span>PV: {{ prod.pv }}</span></span>
              <i @click="addProduct(prod, 1)" class="fa fa-cart-plus fa-2x"></i>
            </p>

          </div>
        </div>
<!--        <div style="overflow-x: auto">-->
<!--          <table id="table">-->
<!--            <tr>-->
<!--              <th>Code</th>-->
<!--              <th>Name</th>-->
<!--              <th>Price</th>-->
<!--              <th>PV</th>-->
<!--              <th>Quantity</th>-->
<!--              <th>Subtotal</th>-->
<!--              <th>Subtotal PV</th>-->
<!--            </tr>-->
<!--            <tr v-for="product in tabProducts">-->
<!--              <td>{{ product.code }}</td>-->
<!--              <td>{{ product.name }}</td>-->
<!--              <td>{{ product.amount }}</td>-->
<!--              <td>{{ product.pv }}</td>-->
<!--              <td>-->
<!--                <a-input class="qty" @change="populateField($event, product)" min="0" style="width: 100px" type="number"/>-->
<!--              </td>-->
<!--              <td class="sub" :id="`sub-${product.id}`" :ref="`sub-${product.id}`">0.00</td>-->
<!--              <td class="subpv" :id="`subpv-${product.id}`" :ref="`subpv-${product.id}`">0.00</td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </div>-->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  const columns = [
    {title: 'Code', dataIndex: 'code'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Price', dataIndex: 'price'},
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
        cart: false,
        loading: false,
        columns,
        agentWallet: '',
        categories: '',
        products: [],
        // tabProducts: [],
        selectedProducts: [],
        userReferral: '',
        upgradeUser: '',
        percentageRate: '',
        totalOrder: 0,
        totalPv: 0,
      }
    },
    methods: {
      async submitOrder() {
        if (this.totalOrder > this.agentWallet) return this.$message.error('Insufficient amount in wallet')

        if (!this.products.length || !this.upgradeUser) {
          return this.$message.error('All fields are required')
        }

        this.loading = true

        const res = (await this.$axios.$post(`user/saveOrders`, {
          soldBy: this.userId,
          boughtBy: this.upgradeUser.id,
          items: this.selectedProducts,
          totalAmount: this.totalOrder,
          totalPv: this.totalPv,
          totalNormalAmount: this.selectedProducts.reduce((prev, cur) => {
            return (+prev + +cur.normalAmount).toFixed(2)
          }, 0)
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
      async getProducts(catId = true) {
        this.products = (await this.$axios.$get(`admin/products?active=true&category=${catId}`)).data
      },
      async getPercentageRate() {
        this.percentageRate = (await this.$axios.$get('admin/percentageRate')).data
      },
      async getProductCategories() {
        this.categories = (await this.$axios.$get('admin/product-category')).data
      },
      deleteSelectedProduct(itemId) {
        this.selectedProducts = this.selectedProducts.filter(prod => prod.id != itemId)

        this.totalOrder = this.selectedProducts.reduce((prev, cur) => {
          return (+prev + +cur.amount).toFixed(2)
        }, 0)

      },
      removeProduct(item, qty) {

        if (item.qty > 1) {
          // Check if the product has been added before.
          const itemIndex = this.selectedProducts.findIndex(prod => prod.id == item.id)
          if(itemIndex > -1) {
            item.qty = this.selectedProducts[itemIndex].qty - qty
            item.amount = item.qty * (+item.price + (+item.price * this.percentageRate))
            item.normalAmount = item.qty * +item.price
            this.$set(this.selectedProducts, itemIndex, item)
          }
        }

        this.totalOrder = this.selectedProducts.reduce((prev, cur) => {
          return (+prev + +cur.amount).toFixed(2)
        }, 0)
      },
      addProduct(item, qty) {
        // Remove item if exist and incoming value is 0.
        if (qty == 0) {
          this.selectedProducts = this.selectedProducts.filter(prod => prod.id != item.id)
          return
        }

        if (qty) {
          // Check if the product has been added before.
          const itemIndex = this.selectedProducts.findIndex(prod => prod.id == item.id)
          if(itemIndex > -1) {
            item.qty = this.selectedProducts[itemIndex].qty + qty
            item.amount = item.qty * (+item.price + (+item.price * this.percentageRate))
            item.normalAmount = item.qty * +item.price
            this.$set(this.selectedProducts, itemIndex, item)
          } else {
            item.qty = qty
            item.amount = item.qty * (+item.price + (+item.price * this.percentageRate))
            item.normalAmount = item.qty * +item.price
            this.selectedProducts.push(item)
          }
        }

        this.totalOrder = this.selectedProducts.reduce((prev, cur) => {
          return (+prev + +cur.amount).toFixed(2)
        }, 0)
      },
      reset() {
        this.agentWallet -= document.getElementById('sub').innerHTML
        this.cart = false
        this.loading = false
        this.selectedProducts = []
        this.userReferral = ''
        this.upgradeUser = ''
        this.totalOrder = 0
        this.totalPv = 0
        // document.getElementById('sub').innerHTML = `<b>0</b>`
        // document.getElementById('subpv').innerHTML = `<b>0</b>`
        //
        // $(function() {
        //   $("tr .sub").each(function(index,value){
        //     $(this).text(0)
        //   })
        //   $("tr .subpv").each(function(index,value){
        //     $(this).text(0)
        //   })
        // })
      }
    },
    beforeMount() {
      this.getAgentWallet()
      this.getProducts()
      this.getProductCategories()
      this.getPercentageRate()
    },
    watch: {
      selectedProducts: {
        handler: function(items) {
          items.forEach((item, i) => {
            item.subPv = item.qty * item.pv
          })
          this.totalPv = this.selectedProducts.reduce((prev, cur) => {
            return (+prev + +cur.subPv).toFixed(2)
          }, 0)
        },
        deep: true
      }
    }
  }
</script>

<style>
  /*table {*/
  /*  font-family: arial, sans-serif;*/
  /*  border-collapse: collapse;*/
  /*  width: 100%;*/
  /*}*/

  /*td, th {*/
  /*  border: 1px solid #dddddd;*/
  /*  text-align: left;*/
  /*  padding: 8px;*/
  /*}*/

  /*tr:nth-child(even) {*/
  /*  background-color: #dddddd;*/
  /*}*/
  /*#subpv, #sub {*/
  /*  font-weight: 900;*/
  /*}*/
  img {
    height: 200px;
  }
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .item {
    border: 1px solid #d3cfcf;
    border-radius: 5px;
    padding: 20px;
    margin: 24px;
  }
  .del {
    color: #cb1212;
  }
  .apart {
    display: flex;
    justify-content: space-between;
  }
  .fa-cart-plus {
    cursor: pointer;
  }
  .success {
    margin-top: 10px;
    margin-bottom: 10px;
    background: #09be09;
    color: #fefefe;
    border: 1px solid #08d208;
  }
  .success:hover {
    background: #08d208;
    color: #fefefe;
    border: 1px solid #08d208;
  }
  .ant-modal {
    width: 50% !important;
  }
  .cart-items {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 24px;
  }
  .cart-item {
    display: grid;
    grid-template-columns: 15% 25% 20% 10% 20% 5%;
    margin-bottom: 15px;
  }
  .icon {
    font-size: xx-large;
  }


  @media (min-width: 768px) {
    .cart-items {
      grid-template-columns: 70% 30%;
    }
  }
  @media (max-width: 767px) {
    .ant-modal {
      width: 90% !important;
    }
  }
</style>
