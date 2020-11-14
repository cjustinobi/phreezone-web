<template>
  <div class="container">
    <img class="img-thumbnail" :src="url ? url : img" />
    <input @change="handleFile" ref="file" type="file">
    <div class="buttons">
      <button type="button" class="btn btn-light" @click.prevent="$refs.file.click">Choose file</button>
      <button type="button" class="btn btn-info" @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pop',
  layout: 'dashboard',
  data() {
    return {
      img: require('assets/img/africinnovate.png'),
      file: '',
      url: ''
    }
  },
  computed: {
    form() {
      let form = new FormData()
      form.append('file', this.file)
      return form;
    }
  },
  methods : {
    handleFile(event) {
      this.file = event.target.files[0]
      this.url = URL.createObjectURL(this.file);
    },
    async upload() {
      let res = await this.$axios.$post(`user/uploadConfirmation/${this.$auth.user.id}`, this.form)
      console.log(res)
        if (res.success) {
          this.file = ''
          this.$store.dispatch('notification/setStatus', {
            success: true,
            messages: ['Confirmation uploaded']
          })
        }

    }
  }

}
</script>

<style lang="scss" scoped>
img {
  max-width: 300px;
}
input {
  display: none;
}
.buttons {
  margin-top: 24px;
  .btn-info {
    margin-left: 20px;
  }
}
</style>
