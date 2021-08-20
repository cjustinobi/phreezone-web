<template>
  <div>
    <a-page-header sub-title="Stream Upgrade Order"/>
    <a-row type="flex" justify="space-between">
      <a-col :md="{ span: 4 }" :xs="{ span: 24 }">
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
        <a-button type="primary" @click.prevent="submitOrder">Submit</a-button>
      </a-col>
    </a-row>



    <a-tabs default-active-key="1">
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
            <tr v-for="product in cat.products">
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.amount }}</td>
              <td>{{ product.pv }}</td>
              <td>
                <a-input class="qty" @change="populateField($event, product)" min="0" style="width: 100px" type="number"/>
              </td>
              <td class="sub" :id="`sub-${product.id}`">0.00</td>
              <td class="subpv" :id="`subpv-${product.id}`">0.00</td>
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
    layout: 'dashboard',
    middleware: ['auth'],
    data() {
      return {
        columns,
        categories: '',
        products: [],
        userReferral: '',
        upgradeUser: ''
      }
    },
    methods: {
      async submitOrder() {
        if (!this.products.length || !this.upgradeUser) {
          return this.$message.error('Enter a product')
        }

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
      async getMember() {
        try {
          this.upgradeUser = (await this.$axios.$post(`user/null`, {
            userReferral: this.userReferral
          })).data
        } catch (e) {
          this.$message.error('Invalid Referral code entered')
        }
      },
      async getProductCategories() {
        this.categories = (await this.$axios.$get('admin/product-category?active=true')).data
      },
      populateField(event, item) {
        const value = event.target.value
        document.getElementById(`sub-${item.id}`).innerText = value * item.amount
        document.getElementById(`subpv-${item.id}`).innerText = value * item.pv

        $(function() {

          let sub = 0, subpv = 0;

          $("tr .sub").each(function(index,value){
            let currentRow = parseFloat($(this).text());
            sub += currentRow
          })
          $("tr .subpv").each(function(index,value){
            let currentRow = parseFloat($(this).text());
            subpv += currentRow
          })

          document.getElementById('sub').innerHTML = `<b>${sub}</b>`
          document.getElementById('subpv').innerHTML = `<b>${subpv}</b>`
        })

        this.addProduct(item, value)

      },
      addProduct(item, qty) {
        // Remove item if exist and incoming value is 0.
        if (qty == 0) {
          this.products = this.products.filter(product => product.id != item.id)
          return
        }

        if (qty) {
          // Check if the product has been added before.
          const itemIndex = this.products.findIndex(product => product.id == item.id)
          if(itemIndex > -1) {
            this.products[itemIndex].qty = qty
          } else {
            item.qty = qty
            this.products.push(item)
          }
        }
      },
      reset() {
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
      this.getProductCategories()
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
