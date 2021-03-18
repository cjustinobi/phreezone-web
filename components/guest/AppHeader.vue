<template>
  <header id="header" class="fixed-top ">
    <MobileMenu />
    <div class="container d-flex align-items-center">
       <nuxt-link to="/" class="logo me-auto"><img src="~assets/img/logo.png" alt="phreezone logo" class="img-fluid"></nuxt-link>
      <nav id="nav" class="nav-menu d-none d-lg-block">
        <Links />
      </nav>
<!--      <a-button v-if="windowWidth > 640" size="large" class="get-started-btn">Get Started</a-button>-->
      <a-button @click="$router.push('/login')" v-if="windowWidth > 640" size="large" class="login-btn">Login</a-button>
    </div>
  </header>

</template>

<script>
  import MobileMenu from './MobileMenu'
  import Links from './Links'
  export default {
    name: 'AppHeader',
    components: {
      Links,
      MobileMenu
    },


  }
</script>

<style>
  #header {
    transition: all 0.5s;
    z-index: 997;
    padding: 15px 0;
  }

  #header.header-scrolled, #header.header-inner-pages {
    background: #fefefe;
    box-shadow: 0 0 22px rgb(0 0 0 / 10%);
    color: var(--mute_txt);
  }

  #header .logo {
    font-size: 30px;
    margin: 0;
    padding: 0;
    line-height: 1;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  #header .logo a {
    color: #fff;
  }

  #header .logo img {
    max-height: 40px;
  }

  /*--------------------------------------------------------------
  # Navigation Menu
  --------------------------------------------------------------*/
  /* Desktop Navigation */
  .nav-menu ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-menu > ul {
    display: flex;
  }

  .nav-menu > ul > li {
    position: relative;
    white-space: nowrap;
    padding: 10px 0 10px 28px;
  }

  .nav-menu a {
    display: block;
    position: relative;
    transition: 0.3s;
    font-size: 15px;
    letter-spacing: 0.5px;
    font-weight: 900;
    font-family: "Open Sans", sans-serif;
  }

  .nav-menu a:hover, .nav-menu li > a, .nav-menu li:hover > a {
    color: var(--pri-txt__muted);
  }


  .nav-menu .drop-down ul {
    border-radius: 8px;
    display: block;
    position: absolute;
    left: 14px;
    top: calc(100% + 30px);
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
    transition: 0.3s;
  }

  .nav-menu .drop-down:hover > ul {
    opacity: 1;
    top: 100%;
    visibility: visible;
  }

  .nav-menu .drop-down li {
    min-width: 180px;
    position: relative;
  }

  .nav-menu .drop-down ul a {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    text-transform: none;
    color: #0c3c53;
  }

  .nav-menu .drop-down ul a:hover, .nav-menu .drop-down ul .active > a, .nav-menu .drop-down ul li:hover > a {
    color: var(--app-color);
  }

  .nav-menu .drop-down > a:after {
    content: "\ea99";
    font-family: IcoFont;
    padding-left: 5px;
  }

  .nav-menu .drop-down .drop-down ul {
    top: 0;
    left: calc(100% - 30px);
  }

  .nav-menu .drop-down .drop-down:hover > ul {
    opacity: 1;
    top: 0;
    left: 100%;
  }

  .nav-menu .drop-down .drop-down > a {
    padding-right: 35px;
  }

  .nav-menu .drop-down .drop-down > a:after {
    content: "\eaa0";
    font-family: IcoFont;
    position: absolute;
    right: 15px;
  }

  @media (max-width: 1366px) {
    .nav-menu .drop-down .drop-down ul {
      left: -90%;
    }
    .nav-menu .drop-down .drop-down:hover > ul {
      left: -100%;
    }
    .nav-menu .drop-down .drop-down > a:after {
      content: "\ea9d";
    }
  }

  /* Get Startet Button */
  .get-started-btn {
    margin-left: 25px;
    color: #fefefe;
    background: var(--app-color);
    transition: 0.3s;
    font-size: 14px;
    border: 2px solid var(--app-color);
    font-weight: 900;
  }

  .get-started-btn:hover {
    color: #fefefe;
    background: var(--app-color);
  }
  .login-btn {
    margin-left: 15px;
    color: var(--app-color);
    border: 2px solid var(--app-color);
    font-weight: 900;
  }


  @media (max-width: 768px) {
    .get-started-btn {
      //margin: 0 48px 0 0;
      padding: 6px 20px 7px 20px;
    }
  }

  /* Mobile Navigation */
  .mobile-nav-toggle {
    position: fixed;
    top: 20px;
    right: 15px;
    z-index: 9998;
    border: 0;
    background: none;
    font-size: 24px;
    transition: all 0.4s;
    outline: none !important;
    line-height: 1;
    cursor: pointer;
    text-align: right;
  }

  .mobile-nav-toggle i {
    color: #fff;
  }

  .mobile-nav {
    position: fixed;
    top: 55px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    z-index: 9999;
    overflow-y: auto;
    background: #fff;
    transition: ease-in-out 0.2s;
    opacity: 0;
    visibility: hidden;
    border-radius: 10px;
    padding: 10px 0;
  }

  .mobile-nav * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .mobile-nav a {
    display: block;
    position: relative;
    color: #37517e;
    padding: 10px 20px;
    font-weight: 500;
    outline: none;
  }

  .mobile-nav a:hover, .mobile-nav .active > a, .mobile-nav li:hover > a {
    color: var(--app-color);
    text-decoration: none;
  }

  .mobile-nav .drop-down > a:after {
    content: "\ea99";
    font-family: IcoFont;
    padding-left: 10px;
    position: absolute;
    right: 15px;
  }

  .mobile-nav .active.drop-down > a:after {
    content: "\eaa1";
  }

  .mobile-nav .drop-down > a {
    padding-right: 35px;
  }

  .mobile-nav .drop-down ul {
    display: none;
    overflow: hidden;
  }

  .mobile-nav .drop-down li {
    padding-left: 20px;
  }

  .mobile-nav-overly {
    width: 100%;
    height: 100%;
    z-index: 9997;
    top: 0;
    left: 0;
    position: fixed;
    background: rgba(40, 58, 90, 0.6);
    overflow: hidden;
    display: none;
    transition: ease-in-out 0.2s;
  }

  .mobile-nav-active {
    overflow: hidden;
  }

  .mobile-nav-active .mobile-nav {
    opacity: 1;
    visibility: visible;
  }

  .mobile-nav-active .mobile-nav-toggle i {
    color: #fff;
  }





</style>
