<template>
  <section id="contact" class="contact">
    <div class="container">

      <div class="section-title">
        <h3>Contact <span>Us</span></h3>
        <p>We would be glad to hear from you concerning our different offers or any complaint. Our team are ready to be of help.</p>
      </div>

<!--      <div>-->
<!--        <iframe-->
<!--          style="border:0; width: 100%; height: 270px;"-->
<!--          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15491.588360933903!2d7.367567014697706!3d5.111249291660531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104299308f30fbf3%3A0x98345ebf0c8cbca1!2sAba!5e0!3m2!1sen!2sng!4v1616089938573!5m2!1sen!2sng"-->
<!--          allowfullscreen=""-->
<!--          loading="lazy"-->
<!--        />-->
<!--      </div>-->

      <div class="row mt-5">

        <div class="col-lg-4">
          <div class="info">
<!--            <div class="address">-->
<!--              <i class="icofont-google-map"></i>-->
<!--              <h4>Location:</h4>-->
<!--              <p>13c Uqua Road Eket, Akwa Ibom state Nigeria </p>-->
<!--            </div>-->

            <div class="email">
              <i class="icofont-envelope"></i>
              <h4>Email:</h4>
              <p>info@phreezone.com.ng</p>
            </div>

<!--            <div class="phone">-->
<!--              <i class="icofont-phone"></i>-->
<!--              <h4>Call:</h4>-->
<!--              <p>+234 708 1111 234</p>-->
<!--            </div>-->

          </div>

        </div>

        <div class="col-lg-8 mt-5 mt-lg-0">

          <form class="php-email-form">
            <div class="row">
              <div class="col-md-6 form-group">
                <input type="text" v-model="detail.name" class="form-control" id="name" placeholder="Your Name">
              </div>
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input type="number" class="form-control" v-model="detail.phone" id="email" placeholder="Your Phone">
              </div>
            </div>
            <div class="form-group mt-3">
              <input type="text" class="form-control" v-model="detail.subject" id="subject" placeholder="Subject">
            </div>
            <div class="form-group mt-3">
              <textarea class="form-control" v-model="detail.message" rows="5" placeholder="Message"></textarea>
            </div>
            <div class="text-center"><button type="submit" @click.prevent="sendMessage">Send Message</button></div>
          </form>

        </div>

      </div>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'contact',
    auth: 'guest',
    data() {
      return {
        detail: {
          name: '',
          phone: '',
          subject: '',
          message: '',
        }
      }
    },
    methods: {
      async sendMessage() {
        if(this.isInvalidFields()) {
          return
        }
        try {
          const res = await this.$axios.$post('contact', this.detail)
          if (res.success) {
            this.detail = {}
            this.$message.success('Message Sent Successfully')
          }
        } catch (e) {
          this.$message.error('An error occured')
        }
      },
      isInvalidFields() {
        if(
          this.detail.name == '' &&
          this.detail.phone == '' &&
          this.detail.subject == '' &&
          this.detail.message == '' &&
          this.detail.phone.length != 11
        ) {
          this.$message.error('All fields are required')
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
