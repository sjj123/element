<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for='(item,index) in levelList'>
        <el-breadcrumb-item  v-if='item.meta.redirect==="noredirect" || index == levelList.length-1'>
          {{item.meta.title}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :to='item.redirect || item.path'>
          {{item.meta.title}}
        </el-breadcrumb-item>
      </template>  
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data () {
    return {
      levelList: ''
    }
  },
  created () {
    this.getBreadcrumb();
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched
      console.log(matched);
      let first = matched[0];
      console.log(first);
      if(first && first.path !== '/dashboard'){
        matched=[{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched;

    }
  } 
}
</script>

<style scoped>
  .breadcrumb-container{
    height: 40px;
    line-height: 40px;
    background: #e7ebf1;
  }
  .el-breadcrumb{
    line-height: 40px;
    padding: 0 10px;
  }
</style>

