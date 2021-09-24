<template>
  <div>
    <a-page-header sub-title="Products">
      <template slot="extra">
        <span><b>Product Order</b></span><br>
        <span style="margin: 0;">Total Order Amount: <b>{{ totalOrder }}</b></span><br>
        <span style="margin: 0;">Total PV: <b>{{ totalPv }}</b></span>
      </template>
    </a-page-header>
    <h5 v-if="agentWallet"><span style="color: grey; margin-bottom: 0;" >
      Available Amount: </span>{{ agentBalance | currency }}
    </h5>
    <h5 v-else>Available Amount: NGN 0.00</h5> <br>
    <h6 v-if="upgradeUser">{{ upgradeUser.full_name }}</h6>
    <a-input v-model="userReferral" @blur="getMember" class="user-ref" placeholder="Member code" />

      <a-form-model
        ref="dynamicValidateForm"
        :model="dynamicValidateForm"
        v-bind="formItemLayoutWithOutLabel"
      >
        <a-form-model-item
          v-for="(item, index) in dynamicValidateForm.data"
          :key="index"
          v-bind="index === 0 ? formItemLayout : {}"
          :label="index === 0 ? 'Items to Purchase' : ''"
          :prop="'data.' + index + '.item'"
          :rules="{
        required: true,
        message: 'Field is empty',
        trigger: 'blur',
      }"
        >
          <a-row gutter="2">
            <a-col :xs="23">
              <a-input v-model="item.name" placeholder="Enter Product name" style="margin-right: 8px"/>
            </a-col>
            <a-col :xs="1">
              <a-icon
                v-if="dynamicValidateForm.data.length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="dynamicValidateForm.data.length === 1"
                @click="removeItem(item)"
              />
            </a-col>
          </a-row>
          <a-row gutter="2">
            <a-col :xs="10">
              <a-input
                v-model="item.price"
                @change="setPv(item, index)"
                type="number"
                placeholder="Amount"
                style="margin-right: 8px"
              />
            </a-col>
            <a-col :xs="4">
              <a-input v-model="item.pv" disabled placeholder="PV" style="margin-right: 8px"/>
            </a-col>
            <a-col :xs="10">
              <a-input v-model="item.amount" disabled placeholder="Actual Amount" style="margin-right: 8px"/>
            </a-col>
          </a-row>
          <a-row gutter="2">
            <a-col :xs="10">
              <a-input v-model="item.qty" @change="setSubDetail(item, index)" min="1" type="number" placeholder="Quantity" style="margin-right: 8px"/>
            </a-col>
<!--            <a-col :xs="4">-->
<!--              <a-input v-model="subPv" disabled placeholder="PV" style="margin-right: 8px"/>-->
<!--            </a-col>-->
<!--            <a-col :xs="10">-->
<!--              <a-input v-model="subAmount" disabled placeholder="Actual Amount" style="margin-right: 8px"/>-->
<!--            </a-col>-->
          </a-row>
        </a-form-model-item>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
          <a-button :disabled="noBalance" type="dashed" @click="addItem"><a-icon type="plus" /> Add field</a-button>
        </a-form-model-item>
        <a-form-model-item v-if="dynamicValidateForm.data.length" v-bind="formItemLayoutWithOutLabel">
          <a-button type="primary" :disabled="noBalance" :loading="loading" html-type="submit" @click="submitForm('dynamicValidateForm')">
            Submit
          </a-button>
<!--          <a-button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')">Reset</a-button>-->
        </a-form-model-item>
      </a-form-model>

  </div>
</template>

<script>
  export default {
    name: 'add-product',
    layout: 'dashboard',
    data() {
      return {
        agentWallet: '',
        upgradeUser: '',
        loading: false,
        editMode: false,
        productForm: false,
        productId: '',
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        },
        formItemLayoutWithOutLabel: {
          wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
          },
        },
        dynamicValidateForm: {
          data: [
            {
              code: '',
              name: '',
              price: '',
              pv: '',
              qty: '',
              amount: '',
              subNormalAmount: '',
              subPv: '',
              subAmount: ''
            }
          ],
        },
        totalNormalOrder: '',
        totalOrder: '',
        totalPv: ''

      }
    },
    methods: {
      async submitForm() {
        if (!this.upgradeUser) return this.$message.error('No member code entered')
        if (this.agentBalance <= 0) return this.$message.error('Insufficient amount in wallet')
        if (!this.validForm()) {
          return this.$message.error('All fields are required')
        }

        this.loading = true

        const res = (await this.$axios.$post(`user/saveOrders`, {
          soldBy: this.userId,
          boughtBy: this.upgradeUser.id,
          items: this.dynamicValidateForm.data,
          totalNormalAmount: this.totalNormalOrder,
          totalAmount: this.totalOrder,
          totalPv: this.totalPv,
        }))
        if (res.success) {
          this.resetForm()
          this.$message.success('Added successfully')
        }
      },

      editProduct(item) {
        this.item = item
        this.productId = item.id
        this.productForm = true
        this.editMode = true
      },
      setCode(item) {
        if(item.name.length <= 2) return item.code = ''
        if (!item.code && item.name.length >= 3) {
          item.code = item.name.substring(0, 3).toUpperCase()
          item.code += Math.floor(100 + Math.random() * 900)
        }
        return item
      },

      resetForm(formName) {
        this.dynamicValidateForm.data = [
          {
            code: '',
            name: '',
            price: '',
            pv: '',
            qty: '',
            amount: '',
            subNormalAmount: '',
            subPv: '',
            subAmount: ''
          }
        ]
        this.loading = false
        this.productForm = false
        this.editMode = false
        this.totalNormalOrder = ''
        this.totalOrder = ''
        this.totalPv = ''
        this.upgradeUser = ''
      },
      removeItem(item) {
        let index = this.dynamicValidateForm.data.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.data.splice(index, 1);

          this.totalNormalOrder -= item.subNormalAmount
          this.totalOrder -= item.subAmount
          this.totalPv -= item.subPv

        }
      },
      addItem() {

        this.dynamicValidateForm.data.push({
          code: '',
          name: '',
          amount: '',
          price: '',
          pv: '',
          qty: '',
          subNormalAmount: '',
          subPv: '',
          subAmount: ''
        })
      },

      setPv(item, index) {
        if (item.price < 125) return
        item.user_id = this.userId
        item.code = this.setCode(item).code
        item.pv = item.qty ? ((+item.price / 125) * 0.25).toFixed(2) * +item.qty :  ((+item.price / 125) * 0.25).toFixed(2)// Formula product PV
        item.amount = item.qty ? (+item.price + (0.4 * item.price)) * +item.qty : +item.price + (0.4 * item.price)
        this.dynamicValidateForm.data[index] = item

        this.setSubDetail(item, index)
      },
      setSubDetail(item, index) {
        if (item.amount) {

          item.subPv = +item.pv * +item.qty
          item.subAmount = +item.amount * +item.qty
          item.subNormalAmount = +item.price * +item.qty

          this.totalNormalOrder = this.dynamicValidateForm.data.reduce((prev, cur) => {
            return (+prev + +cur.subNormalAmount).toFixed(2)
          }, 0)
            this.totalOrder = this.dynamicValidateForm.data.reduce((prev, cur) => {
              return (+prev + +cur.subAmount).toFixed(2)
            }, 0)
            this.totalPv = this.dynamicValidateForm.data.reduce((prev, cur) => {
              return (+prev + +cur.subPv).toFixed(2)
            }, 0)

          if (item.price < 125) return
          item.user_id = this.userId
          item.code = this.setCode(item).code
          item.pv = item.qty ? ((+item.price / 125) * 0.25).toFixed(2) * +item.qty :  ((+item.price / 125) * 0.25).toFixed(2)// Formula product PV
          item.amount = item.qty ? (+item.price + (0.4 * item.price)) * +item.qty : +item.price + (0.4 * item.price)
          this.dynamicValidateForm.data[index] = item

        }
      },
      validForm() {
        return this.dynamicValidateForm.data.every(i => Object.values(i).every(v => v))
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
    },
    computed: {
      agentBalance() {
        return this.agentWallet - this.totalOrder
      },
      noBalance() {
        return this.agentBalance <= 0
      }
    },
    beforeMount() {
      this.getAgentWallet()
      if(!this.isStockist) {
        this.$router.push('/home')
      }
    },
    watch: {
      totalOrder: {
        handler: function (val) {
          if (val) {
            const bal = this.agentWallet - this.totalOrder
            if (bal >= 0) {
              return this.agentBalance = val
            }
            return this.agentBalance = 0
          }
        }
      }
    }
  }
</script>

<style scoped>
  .user-ref {
    margin-bottom: 10px;
    margin-top: 0;
    width: 150px;
  }
</style>
