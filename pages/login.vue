<template>
  <div class="container">
    <component @loginRegister="setFacet" :is="loginRegister"></component>
  </div>
</template>

<script>
  import Register from "@/components/guest/Register";
  import Login from "@/components/guest/Login";
  export default {
    layout: 'blank',
    name: 'landing',
    auth: 'guest',
    components: {
      Login,
      Register
    },
    data() {
      return {
        loginRegister: 'Login'
      }
    },
    methods: {
      setFacet(val) {
        this.loginRegister = val
      }
    },
  }
</script>

<style scoped>

</style>
