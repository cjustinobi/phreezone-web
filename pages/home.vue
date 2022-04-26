<template>
  <div>
    <Message />
  </div>
</template>

<script>

import Message from '@/components/shared/Message'
export default {
  name: 'home',
  layout: 'dashboard',
  components: {
    Message

  },
  data() {
    return {
      loading: false,
      visible: false,
      title: '',
      description: '',
    }
  }
}
</script>
