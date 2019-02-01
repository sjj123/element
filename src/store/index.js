import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sidebar:{
      opened: true,
      width: 200,
    },
    userinfo:'', /**用户信息 */
    token:'', /**token */
    menus:'' /**路由列表 */
  },
  mutations: {
    toggleSideBar: state => {
      state.sidebar.opened = !state.sidebar.opened
      if ( state.sidebar.opened ) {
        state.sidebar.width = 200
        console.log( state.sidebar.width )
      }
      else {
        state.sidebar.width = 50
      }
    },
    //存储用户信息
    setUserInfo: ( state, data )=> {
      state.userinfo = data;
      state.token = data.token;
      localStorage.setItem( 'userInfo', JSON.stringify(data) );
      localStorage.setItem( 'token', data.token );
    },
    //路由列表
    ADD_ROUTERS: (data) =>{
      state.menus = data
      localStorage.setItem( 'menu', JSON.stringify(data));
    }

  }
})
export default store
