<template>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <nuxt-link to="/home">MLM</nuxt-link>
        <div id="close-sidebar">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img class="img-responsive img-rounded" src="~assets/img/user.jpg" alt="User picture">
        </div>
        <div class="user-info">
          <span class="user-name">
            <strong>{{ $auth.user.full_name }}</strong><br>
            <span class="badge badge-pill badge-warning" v-if="$auth.user.package">
              {{ $auth.user.package.name }}
            </span>
          </span>
          <span v-if="isAdmin" class="user-role">Administrator</span>
        </div>
      </div>
      <!-- sidebar-header  -->
      <div class="sidebar-search">
        <div>
          <div class="input-group">
            <input type="text" class="form-control search-menu" placeholder="Search...">
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- sidebar-search  -->
      <div class="sidebar-menu">
        <ul>
          <li class="header-menu">
            <span>General</span>
          </li>
<!--          <li>-->
<!--            <a href="#">-->
<!--              <i class="fa fa-folder"></i>-->
<!--              <span>Membership</span>-->
<!--            </a>-->
<!--          </li>-->

          <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-id-card"></i>
              <span>Membership</span>
<!--              <span class="badge badge-pill badge-warning">New</span>-->
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li v-if="isAdmin">
                  <nuxt-link to="/register">Add new Member</nuxt-link>
                </li>
                <li v-if="isAdmin">
                  <nuxt-link to="/users">All Members</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/pop">{{ isAdmin ? 'View POP' : 'Upload POP' }}</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="#">Search Sponsor Tree Network</nuxt-link>
                </li>
                <li>
                  <a href="#">Search Placement</a>
                </li>
                <li>
                  <a href="#">Performance of Sponsor Network</a>
                </li>
                <li>
                  <a href="#">Placement Tree Performance</a>
                </li>
                <li>
                  <a href="#">Performance Service Organization</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="fa fa-credit-card"></i>
              <span>Commission</span>
<!--              <span class="badge badge-pill badge-danger">3</span>-->
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <nuxt-link to="/commissions">Commission</nuxt-link>
                </li>
                <li>
                  <a href="#">Incentive Point Management</a>
                </li>
                <li>
                  <a href="#">Credit cart</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="far fa-envelope"></i>
              <span>Message Control</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <a href="#">View Announcement</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Tables</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <div class="sidebar-footer">
      <a href="#">
        <i class="fa fa-bell"></i>
        <span class="badge badge-pill badge-warning notification">3</span>
      </a>
      <a href="#">
        <i class="fa fa-envelope"></i>
        <span class="badge badge-pill badge-success notification">7</span>
      </a>
      <a href="#">
        <i class="fa fa-cog"></i>
        <span class="badge-sonar"></span>
      </a>
      <a @click="$auth.logout()" href="#">
        <i class="fa fa-power-off"></i>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'dashboardSidebar'
  }
</script>

<style scoped>

</style>
