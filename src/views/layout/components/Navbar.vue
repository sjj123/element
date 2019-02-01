<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :routes='this.$router.options' :toggleClick="toggleSideBar" :is-active="$store.state.sidebar.opened"></hamburger>
    <div class="right-menu">
      <div class="right-menu-item screenfull">
        <screenfull></screenfull>
      </div>
      <el-dropdown class="right-menu-item avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src='userinfo.avatar' alt="" class="user-avatar">
          <span>{{userinfo.loginname}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
export default {
  name: 'Navbar',
  components: {
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapState([
      'sidebar',
      'userinfo'
    ])
  },
  methods: {
    toggleSideBar(){
      console.log('点击了sidebar')
      this.$store.commit('toggleSideBar')
    }
  }
}
</script>

<style scoped>
  .navbar .hamburger-container{
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .right-menu{
    float: right;
    height: 100%;
  }
  .right-menu .right-menu-item{
    display: inline-block;
    margin: 0 8px;
  }
  .right-menu-item.screenfull{
    height: 20px;
  }
  .avatar-container {
    height: 50px;
    margin-right: 30px;
  }
  .avatar-container .avatar-wrapper{
    /* margin-top: 10px; */
  }
  .avatar-container .user-avatar{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
  }
</style>

