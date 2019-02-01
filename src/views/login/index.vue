<template>
    <div class="login-container">
      <el-form :model='form' :rules="rules" ref="userForm" class="login-form">
        <div class="title-container">
          <h3 class="title">筋斗云</h3>
        </div>
        <el-form-item prop='userName'>
          <el-input v-model='form.userName'></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { API_GetDomainInfo, API_Permission_User} from '@/fetch/fetchApi' 
import {initMenu} from '@/utils/MenuUtils'
import router from '@/router/index.js'
export default {
  name: 'Login',
  data: function () {
    return {
      form: {
        userName:'m_admin',
        password:'byte1234'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      loading: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    login: function(data){
      window.sessionStorage.setItem('permission', JSON.stringify( data) );
      MenuUtils(routers, data);
    },
    handleLogin: function () {  
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          let loginname = this.form.userName;
          let pwd = this.form.password;
          API_GetDomainInfo ({
            loginname: loginname,
            pwd: pwd
          }).then( success => {
            // this.$router.push( {name: 'authoritymanage'} )
            this.$store.commit( 'setUserInfo', success.data );
            if( success.data.token ){
                  console.log('登录成功')
                    let List = {
                    "error":0,
                    "message":"ok",
                    "data":{
                        "list":[
                            {
                                "path": '/authoritymanage',
                                "name": 'manage',
                                "id":1,
                                "pid":0,
                                "label":"权限管理",
                                "level":1,
                                "component":"layout",
                                "meta":{
                                  "title": '安全管理',
                                  "redirect": 'noredirect',
                                  "icon": 'icon-anquan'
                                },
                                "children":[
                                    {
                                        "path": '/authoritymanage',
                                        "name": 'authoritymanage',
                                        "id":2,
                                        "pid":1,
                                        "label":"权限管理",
                                        "level":2,
                                        "component":"configurationList",
                                        "meta":{
                                            "title": '权限管理',
                                            "buttonlist":[
                                                {
                                                    "name":"查看",
                                                    "status":0
                                                },
                                                {
                                                    "name":"编辑",
                                                    "status":0
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "path": '/rolemanage',
                                        "name": 'rolemanage',
                                        "id":2,
                                        "pid":1,
                                        "label":"角色管理",
                                        "level":2,
                                        "component":"addRole",
                                        "meta":{
                                            "title": '角色管理',
                                            "buttonlist":[
                                                {
                                                    "name":"查看",
                                                    "status":0
                                                },
                                                {
                                                    "name":"编辑",
                                                    "status":0
                                                }
                                            ]
                                        }
                                    },

                                ]
                            }
                        ]
                    }
                  }
                  let data = List.data.list;
                  this.$router.options.routes = [];
                  this.$router.addRoutes([]);
                  let pageRouters = initMenu(data);
                  this.$router.options.routes = [...(this.$router.options.routes),...pageRouters]
                  this.$router.addRoutes(this.$router.options.routes)
                  console.log( this.$router)
                  this.$router.push(pageRouters[0].path)

                  // new Promise(
                  //   initMenu(pageRouters,data)
                  // ).then(
                  //   function(){
                  //     router.addRoutes(pageRouters)
                  //     console.log(router)
                  //   }
                  // ).catch(
                  //   function(){
                  //     console.log('路由处理失败')
                  //   }
                  // )
            //     API_Permission_User({
            //     token: success.data.token
            //   }).then( success => {               
            //   }).catch( error => {
            // console.log('获取用户菜单失败')
            //   })
            }
          }).catch( error => {
            // this.$message({
            //   message: error.data.message,
            //   type: 'error'
            // })
            console.log('登录失败')
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
