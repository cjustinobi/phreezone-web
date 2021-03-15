<template>
  <div>
    <a-page-header sub-title="Shopping Credit"/>
    <a-input-search
      class="ref"
      v-model="userReferral"
      enter-button="Send"
      @search="getShoppingBonus"
      placeholder="Member Referral"
    />
    <div style="background: #ECECEC; padding: 30px">
      <a-row :gutter="4">
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              title="Total Shopping Earned"
              :value="userBonus.totalShoppingBonus | currency"
              :precision="2"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            />

          </a-card>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              title="Total Shopping Paid"
              :value="userBonus.totalShoppingBonusPaid | currency"
              class="demo-class"
              :value-style="{ color: '#2d5d89' }"
            />
          </a-card>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-card>
            <a-statistic
              title="Available Balance"
              :value="availableBalance | currency"
              class="demo-class"
              :value-style="{ color: '#1890ff' }"
            />
          </a-card>
        </a-col>
      </a-row>
    </div>

    <h4 v-if="userBonus" class="text-muted">Items for {{ userBonus.user.full_name }}</h4>
    <a-form-model
      v-if="userBonus"
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
          <a-col :xs="10" :md="8">
            <a-input v-model="item.item" placeholder="Enter Product name" style="margin-right: 8px"/>
          </a-col>
          <a-col :xs="10" :md="4">
            <a-input v-model="item.amount" placeholder="Enter Amount" style="margin-right: 8px"/>
          </a-col>
          <a-col :xs="4" :md="2">
            <a-icon
              v-if="dynamicValidateForm.data.length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="dynamicValidateForm.data.length === 1"
              @click="removeItem(item)"
            />
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" @click="addItem"><a-icon type="plus" /> Add field</a-button>
      </a-form-model-item>
      <a-form-model-item v-if="dynamicValidateForm.data.length" v-bind="formItemLayoutWithOutLabel">
        <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')">Reset</a-button>
      </a-form-model-item>
    </a-form-model>

  </div>
</template>

<script>
  export default {
    name: 'shopping-credit',
    layout: 'dashboard',
    data() {
      return {
        canSubmit: true,
        userBonus: '',
        userReferral: '',
        enteredAmount: 0,
        availableBalance: 0,
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
          data: [],
        },
      };
    },
    methods: {
      async getShoppingBonus() {
        try {
          this.userBonus = (await this.$axios.$post('user/shoppingBonus', { referral: this.userReferral })).data
        } catch (e) {
          this.$message.error('Invalid referral entered')
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (this.userReferral && this.canSubmit && valid) {
            try {
              this.$axios.$post('user/spendShoppingBonus', this.dynamicValidateForm).then(res => {
                this.getShoppingBonus()
                this.$message.success('Added successfully')
              })
            } catch (e) {
              console.log(e.response.data.message)
            }
          }


        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeItem(item) {
        let index = this.dynamicValidateForm.data.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.data.splice(index, 1);
        }
      },
      addItem() {
        if (this.canSubmit) {
          this.dynamicValidateForm.data.push({
            item: '',
            amount: '',
            user_id: this.userBonus.user.id
          })
        }
      },
    },
    watch: {
      'dynamicValidateForm.data': {
        handler: function (data) {
          this.enteredAmount = data.reduce((prev, cur) => {
            return +prev + +cur.amount;
          }, 0)

          if (this.enteredAmount > this.availableBalance) {
            this.$message.error('Item amount has exceeded available balance')
            this.canSubmit = false
          } else {
            this.canSubmit = true
          }
        },
        deep: true
      },
      userBonus: {
        handler: function (data) {
          this.availableBalance = data.totalShoppingBonus - data.totalShoppingBonusPaid
        }
      }
    }
  }
</script>

<style scoped>
  .ref {
    width: 200px;
    margin-bottom: 25px;
  }
  .text-muted {
    margin: 12px 0;
  }
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
