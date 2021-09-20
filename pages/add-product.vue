<template>
  <div>
    <a-page-header sub-title="Products">
      <template slot="extra">
        <a-button type="primary" @click="$router.push('/items')">All Products</a-button>
      </template>
    </a-page-header>

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
              <a-input v-model="item.amount" @change="setPv(item, index)" type="number" placeholder="Amount" style="margin-right: 8px"/>
            </a-col>
            <a-col :xs="4">
              <a-input v-model="item.pv" disabled placeholder="PV" style="margin-right: 8px"/>
            </a-col>
            <a-col :xs="10">
              <a-input v-model="item.actual_amount" disabled placeholder="Actual Amount" style="margin-right: 8px"/>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" @click="addItem"><a-icon type="plus" /> Add field</a-button>
        </a-form-model-item>
        <a-form-model-item v-if="dynamicValidateForm.data.length" v-bind="formItemLayoutWithOutLabel">
          <a-button type="primary" :loading="loading" html-type="submit" @click="submitForm('dynamicValidateForm')">
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
              amount: '',
              pv: '',
              actual_amount: '',
              user_id: ''
            }
          ],
          stockistId: this.$auth.user.id
        },
        products: '',
      }
    },
    methods: {
      async submitForm() {
        if (!this.validForm()) {
          return this.$message.error('All fields are required')
        }
        this.loading = true
        const res = this.editMode ?
          await this.$axios.$put(`admin/products/${this.productId}`, this.dynamicValidateForm.data) :
          await this.$axios.$post('admin/products', this.dynamicValidateForm.data)
        if (res.success) {
          this.$message.success('Successfully updated')
          this.resetForm()
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
            amount: '',
            pv: '',
            user_id: '',
            actual_amount: ''
          }
        ]
        this.loading = false
        this.productForm = false
        this.editMode = false
      },
      removeItem(item) {
        let index = this.dynamicValidateForm.data.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.data.splice(index, 1);
        }
      },
      addItem() {
        // if (this.canSubmit) {
        this.dynamicValidateForm.data.push({
          code: '',
          name: '',
          amount: '',
          pv: '',
          user_id: '',
          actual_amount: ''
        })
        // }
      },
      setPv(item, index) {
        if (item.amount < 125) return

        item.user_id = this.userId
        item.code = this.setCode(item).code
        item.pv = ((+item.amount / 125) * 0.25).toFixed(2) // Formula product PV
        item.actual_amount = +item.amount + (0.2 * item.amount)
        this.dynamicValidateForm.data[index] = item
      },
      validForm() {
        return this.dynamicValidateForm.data.every(i => Object.values(i).every(v => v))
      }
    },
    beforeMount() {
      if(!this.isStockist) {
        this.$router.push('/home')
      }
    }
  }
</script>

<style>

</style>
