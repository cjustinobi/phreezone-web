<template>
  <div v-if="messages && messages.length" class="notify">
    <div
      v-for="(message, i) in messages"
      :key="i"
      :class="success ? 'alert-info' : 'alert-danger'"
      class="alert alert-dismissible fade show"
      role="alert"
    >
      <span>{{ message }}</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'notification',
  computed: {
    ...mapGetters({
      success: 'notification/success',
      messages: 'notification/messages'
    })
  },
  watch: {
    success(e) {
      if (e === false || e === true) {
        setTimeout(() => {
          this.$store.dispatch('notification/setStatus', { messages: [], success: null })
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>
.notify {
  position: fixed;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  padding: 12px 10px;
  color: #737373;
  transition: 1s ease-in;
  z-index: 90000;
  min-width: 200px;
}
@media(max-width: 767px) {
  .notify {
    width: 80%;
  }
}
</style>
