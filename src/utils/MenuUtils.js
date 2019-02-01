import store from '../store/index'
export const initMenu = (menu) =>{
  if(menu.length === 0){
    return
  }
  let menus = formatRoutes(menu);
  console.log(menus);
  return menus
}
export const formatRoutes = (aMenu) => {
  const aRouter = [];
  aMenu.forEach( oMenu => {
    let {
      path,
      name,
      component,
      children,
      meta
    } = oMenu
    const oRouter = {
      path: path,
      name: name,
      component: resolve => require(['../views/layout/layout.vue'], resolve),//将组件用require引进来
      children: [],
      meta
      // children: validatenull(children) ? [] : formatRoutes(children)
    }
    // oRouter.component = require('../views/layout/layout.vue');
    children.forEach( child => {
      let {
        path,
        name,
        component,
        meta
      } = child
      const cRouter = {
        path: path,
        name: name,
        component: resolve => require(['../views/manage/'+component+'.vue'], resolve),//将组件用require引进来
        meta:meta
      }
      // cRouter.component = require('../views/manage/'+component+'.vue')
      oRouter.children.push(cRouter)
    })
    aRouter.push(oRouter);
  }

  )
  return aRouter
}
export const validatenull = (data) => {
  if(data == "" || data == null)
  return false
}
