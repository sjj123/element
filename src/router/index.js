import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index'
import layout from '@/views/layout/layout'

import test from '@/views/test'
import dashboard from '@/views/dashboard/dashboard'
import accountList from '@/views/manage/accountList'
import roleList from '@/views/manage/roleList'
import authorityList from '@/views/manage/configurationList'
import addRole from '@/views/manage/addRole'

//使用VueRouter
Vue.use(Router)

const  constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: layout,
    meta: {
      title: '首页',
      icon: 'icon-shouye'
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: test,
      },
    ]
  },
  /** 
  {
    path: '/productmanage',
    name: 'productmanage',
    component: layout,
    meta:{
      title: '设备管理', //当前模块title
      redirect: 'noredirect', //控制面包屑导航中不会有否有跳转
      icon: 'icon-shebei' //当前模块icon
    },
    children:[
      {
        path: '/productmanage',
        name: 'productmanage',
        component: accountList,
        
        meta: {
          title: '产品管理', //当前页面title
          buttonlist: [
            {name: 'add', status: 0}, //页面中的添加按钮是否展示
            {name: 'edit', status: 1} //页面中的编辑按钮是否展示
          ]
        }
      },
      {
        path: '/productmanage/detail',
        name: 'productmanagedetail',
        component: accountList,
        hidden: true,
        meta: {
          title: '产品详情', //当前页面title
          level: 3, //页面层级
          buttonlist: [
            {name: 'add', status: 0}, //页面中的添加按钮是否展示 0展示 1不展示
            {name: 'edit', status: 1} //页面中的编辑按钮是否展示 0展示 1不展示
          ]
        }
      },
      {
        path: '/productmanage/detail',
        name: 'productmanagedetail',
        component: accountList,
        hidden: true,
        meta: {
          title: '产品编辑', //当前页面title
          level: 3, //页面层级
          buttonlist: [
            {name: 'add', status: 0}, //页面中的添加按钮是否展示 0展示 1不展示
            {name: 'edit', status: 1} //页面中的编辑按钮是否展示 0展示 1不展示
          ]
        }
      },
      {
        path: '/itemmanage',
        name: 'itemmanage',
        component: roleList,
        meta: {
          title: '设备管理'
        }
      }, 
    ]
  },
  {
    path: '/accountmanage',
    name: 'manage',
    component: layout,
    meta:{
      title: '安全管理',
      redirect: 'noredirect',
      icon: 'icon-anquan'
    },
    children:[
      {
        path: '/accountmanage',
        name: 'accountmanage',
        component: accountList,
        meta: {
          title: '账号管理'
        }
      },
      {
        path: '/rolemanage',
        name: 'rolemanage',
        component: roleList,
        meta: {
          title: '角色管理'
        }
      }, 
      {
        path: '/authoritymanage',
        name: 'authoritymanage',
        component: authorityList,
        meta: {
          title: '权限管理'
        }
      }
      , 
      {
        path: '/addRole',
        name: 'addRole',
        component: addRole,
        meta: {
          title: '角色添加'
        }
      }
    ]
  },
  */
  
]

//创建VueRouter 实例
export default  new Router( {
  routes: constantRouterMap
})
