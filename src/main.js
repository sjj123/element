// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css' //iconfont css
import 'normalize.css' // A modern alternative to CSS resets
import './styles/index.scss' // global css
import './styles/wan.css' // wan css

/* el */
import {Row, Col, Carousel, CarouselItem, Pagination, Loading, Popover} from 'element-ui'
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Popover)

import App from './App'
import router from './router'
import {API_Permission_User} from '@/fetch/fetchApi'  //权限API
import {initMenu} from '@/utils/MenuUtils'
import store from './store'
import { userInfo } from 'os';
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  //刷新后重新赋值vuex
  if( store.state.userinfo.length == 0 ||  store.state.userinfo.length == ""){
    store.state.userinfo = localStorage.getItem('userInfo')
    store.state.token = localStorage.getItem('token')
  }

      //请求动态路由
      /**
      API_Permission_User(
        {token: store.state.token}
      )
      .then(success => {
        console.log(success.data.list)
        console.log(router)
        initMenu(router, data.list)
        console.log('获取到动态路由了')
        next()
      }).catch(error =>{
        console.log('获取路由失败')
      })
      */
     /**
      let success = {
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
                    ]
                }
            ]
        }
      }
      let data = success.data.list;
      initMenu(router, data);
      */
      window.document.title = to.meta.title
      next()
      // if(from.path == '/login'){
      //   next({path:data[0].children[0].path})
      // }else{
      //   next()
      // }
})
router.afterEach((to, from) => {
  // ...
  window.scrollTop = 0
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

