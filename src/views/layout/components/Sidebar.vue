<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo">
      <img src='@/assets/logo.png'/>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse='!$store.state.sidebar.opened'
      router >
      <template v-for="(item,index) in $router.options.routes" v-if='!item.hidden'>
        <el-menu-item v-if='item.children.length===1' :index='item.path'>
          <i class="iconfont" :class="item.meta.icon"></i>
          <span slot='title'>{{item.meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index='item.children[0].path'>
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" :to="child.path" v-if='!child.hidden'>{{child.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <template>
    </template>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Sidebar',
  data(){
    return {
      isCollapse: true
    }
  },
  methods: {
      handleOpen( key, keyPath) {
        console.log( key, keyPath);
      },
      handleClose( key, keyPath) {
        console.log( key, keyPath);
      }
  },
  mounted () {

  }
}
</script>

<style scoped>
  #app .el-menu{
    border-right: none !important;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden !important
  }
  .logo{
    text-align: center;
  }
  .logo img{
    display: inline-block;
    margin-top: 10px;
  }
  .openSidebar .logo{
    height: 60px;
  }
  .openSidebar .logo img {
    height: 40px;
  }
  .hideSidebar .logo{
    height: 40px;
  }
  .hideSidebar .logo img{
    height: 20px;
  }
  .el-menu-item i,.el-submenu__title i{
    color:#fff;
    font-weight: 500;
  }
</style>
