<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <breadcrumb/>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components/index'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb
  },
  computed: {
    classObj () {
      return {
        hideSidebar: !this.$store.state.sidebar.opened,
        openSidebar: this.$store.state.sidebar.opened
      }
    }
  }
}
</script>

<style scoped>
  .app-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .sidebar-container{
    position: fixed;
    width: 200px !important;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    background: rgb(84, 92, 100);
  }
  .main-container{
    margin-left: 200px;
  }
  .navbar{
    height: 50px;
    line-height: 50px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  }
  .app-main{
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: rgba(231, 235, 241, 1);
  }
  .app-main .box{
    background: #fff;
    margin: 10px;
    padding: 15px;
  }
  #app .hideSidebar .sidebar-container{
    width: 64px !important
  }
  #app .hideSidebar .main-container{
    margin-left: 64px !important
  }
</style>
