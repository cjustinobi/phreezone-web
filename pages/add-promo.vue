<template>
  <a-row>
    <a-page-header sub-title="Add Promos">
      <template slot="extra">
        <a-button type="primary" @click="() => $router.push('/promos')">All Promos</a-button>
      </template>
    </a-page-header>
    <a-col :md="12">
      <a-form-model
        ref="promoForm"
        :model="details"
        :rules="rules"
        :hideRequiredMark="true"
      >
        <a-form-model-item prop="title">
          <a-input v-model="details.title" size="large" placeholder="Promo Title" style="margin-top:5px;"/>
        </a-form-model-item>
        <a-form-model-item prop="point">
          <a-input v-model="details.pv" size="large" placeholder="Promo Point" style="margin-top:5px;"/>
        </a-form-model-item>
        <quill-editor
          class="quill"
          v-model="details.description"
          :options="editorOption"
        >
        </quill-editor><br>
        <a-form-model-item>
          <a-upload list-type="picture" :default-file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
            <a-button>
              <a-icon type="upload"/>
              Upload Promo Image
            </a-button>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item prop="personal_points">
          <a-radio-group v-model="details.personal_points">
            <label>For Personal Point?</label><br>
            <a-radio value="1">
              Yes
            </a-radio>
            <a-radio value="0" style="margin-left: 80px">
              No
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-if="details.personal_points == '0'" prop="balanced_leg">
          <a-radio-group v-model="details.balanced_leg">
            <label>Both legs must be balanced?</label><br>
            <a-radio value="1">
              Yes
            </a-radio>
            <a-radio value="0" style="margin-left: 80px">
              No
            </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item v-if="details.balanced_leg == '1'" prop="balanced_leg_value">
          <a-input v-model="details.leg_pv" size="large" placeholder="Enter point for each leg " style="margin-top:5px;"/>
        </a-form-model-item>

        <a-row type="flex" justify="space-around">
          <a-col>
            <a-form-model>
              <label>Start Date</label>
              <a-date-picker :disabled-date="disabledDate" class="form-control" @change="startDate" />
            </a-form-model>
          </a-col>
          <a-col>
            <a-form-model>
              <label>End Date</label>
              <a-date-picker :disabled-date="disabledDate" :disabled="disableEndDate" class="form-control" @change="endDate"/>
            </a-form-model>
          </a-col>
        </a-row>

        <a-form-model-item>
          <a-button class="btn-auth app-btn" :loading="loading" @click="submitPromo('promoForm')" type="primary">
            Submit
          </a-button>
        </a-form-model-item>

      </a-form-model>
    </a-col>
  </a-row>
</template>

<script>
  import moment from 'moment'
  import upload from '@/mixins/upload'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'add-promo',
    layout: 'dashboard',
    components: { quillEditor },
    mixins: [upload],
    data() {
      let validateBalancedLeg = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('Leg balancing not specified'));
        }
        callback()
      }
      let validateBalancedLegValue = (rule, value, callback) => {
        if (this.details.balanced_leg == '1' && value == '') {
          return callback(new Error('Downline point not specified'));
        }
        callback()
      }
      return {
        loading: false,
        editorOption: {},
        fileList: '',
        details: {
          title: '',
          pv: '',
          leg_pv: '',
          description: '',
          balanced_leg: '',
          personal_points: '',
          start_date: '',
          end_date: '',
          image_path: ''
        },
        rules:{
          title: [{required: true, message: 'Name is required', trigger: 'change'}],
          pv: [{required: true, message: 'Point is required', trigger: 'change'}],
          balanced_leg: [{ validator: validateBalancedLeg, trigger: 'change' }],
          balanced_leg_value: [{ validator: validateBalancedLegValue, trigger: 'change' }],
          personal_points: [{required: true, message: 'Type of point is required', trigger: 'change'}],
        }
      }
    },
    methods: {
      moment,
      async submitPromo(formName) {
        if (!this.validateDate()) return this.$message.error('End date must be greater than Start date')

        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.loading = true
            this.details.image_path = (await this.saveFile(this.fileList[0])).secure_url
            const res = await this.$axios.$post('admin/promos', this.details)

            if (res.success) {
              this.loading = false
              this.fileList = ''
              this.details = {}
              return this.$message.success('Successfully saved')
            }
            this.loading = false
            return this.$message.error('Encountered error')
          }
        })
      },
      startDate(date, dateString) {
        this.details.start_date = dateString
      },
      endDate(date, dateString) {
        this.details.end_date = dateString
      },
      disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day')
      },
      validateDate() {
        const startDate = Date.parse(this.details.start_date)
        const endDate = Date.parse(this.details.end_date)
        return endDate > startDate
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
    },
    computed: {
      disableEndDate() {
        return !this.details.start_date
      }
    }
  }
</script>

<style scoped>

</style>
