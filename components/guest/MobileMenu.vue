<template>
  <div v-if="windowWidth < 992" id="menuArea">
    <input type="checkbox" id="menuToggle" />
    <label for="menuToggle" class="menuOpen">
      <div class="open"></div>
    </label>

    <div class="menu menuEffects">
      <label for="menuToggle"></label>
      <div class="menuContent">
<!--        <img src="~assets/img/logo.png" width="230" alt="Phreezone image">-->
        <Links />
        <a-button @click.prevent="$router.push('/login')" size="large" class="get-started-btn">Get Started</a-button>
<!--        <a-button @click.prevent="$router.push('/login')" size="large" class="login-btn">Login</a-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Links from './Links'
  export default {
    name: 'MobileMenu',
    components: {
      Links
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      }
    },
    watch: {
      '$route': {
        handler: function (val) {
          this.windowWidth < 992 ? document.querySelector('.menuOpen').click() : ''
        }
      }
    }
  }
</script>

<style lang="scss">
  #menuArea {
    input {
      display: none;
    }

    .open {
      background-color: #3c3c3c;
      width: 24px;
      height: 4px;
      display: block;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      top: 8px;
    }

    .open:before {
      content: "";
      background-color: #3c3c3c;
      width: 24px;
      height: 4px;
      display: block;
      border-radius: 2px;
      position: relative;
      top: -8px;
      transform: rotate(0deg);
      transition: all 0.3s ease;
    }

    .open:after {
      content: "";
      background-color: #3c3c3c;
      width: 24px;
      height: 4px;
      display: block;
      border-radius: 2px;
      position: relative;
      top: 4px;
      transform: rotate(0deg);
      transition: all 0.3s ease;
    }

    .menuOpen {
      cursor: pointer;
      float: right;
      position: absolute;
      right: 20px;
      z-index: 9999;
      top: 24px;
    }

    .menuOpen:hover .open:before {
      top: -9px;
    }

    .menuOpen:hover .open:after {
      top: 5px;
    }

    .menu {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background: rgb(23 21 20 / 90%);
    }

    .menu label {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 20px;
      top: 20px;
      background-size: 100%;
      cursor: pointer;
    }

    .menu .menuContent {
      position: relative;
      top: 50%;
      font-size: 28px;
      text-align: center;
      padding-bottom: 20px;
      margin-top: -170px;
    }

    .menu ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
    }

    .menu ul li a {
      display: block;
      color: white;
      text-decoration: none;
      transition: color 0.2s;
      text-transform: uppercase;
      padding: 10px 0;
    }

    .menu ul li a:hover {
      color: #ff8702;
    }

    .menu ul li:hover {
      background: white;
    }

    .menuEffects {
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s, visibility 0.5s;
    }

    .menuEffects ul {
      transform: translateY(0%);
      transition: all 0.5s;
    }

    #menuToggle:checked ~ .menuEffects {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s;
    }

    #menuToggle:checked ~ .menuEffects ul {
      opacity: 1;
    }

    #menuToggle:checked ~ .menuOpen .open {
      background-color: transparent;
    }

    #menuToggle:checked ~ .menuOpen .open:before {
      content: "";
      background-color: white;
      transform: rotate(45deg);
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }

    #menuToggle:checked ~ .menuOpen .open:after {
      content: "";
      background-color: white;
      transform: rotate(-45deg);
      position: relative;
      top: 0;
      right: 0;
      z-index: 1;
    }

    #menuToggle:not(:checked) ~ .menuEffects ul {
      transform: translateY(-30%);
    }
  }
</style>
