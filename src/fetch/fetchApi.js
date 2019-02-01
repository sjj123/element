import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import qs from 'qs'



const _host = 'hotel.72byte.com'
const _port = ''

axios.defaults.timeout = 6000;
// axios.defaults.withCredentials=true;//设置携带证书
// axios.defaults.baseURL = '';
let cancel,promiseArr = {};
//http request 拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  config.headers['Content-Type'] = 'applicationon/json';

  if (store.state.token) {
    config.headers.token = store.state.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params) {
  let requestUrl = 'http://' + _host + url
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem( 'token');
    params.token = token
    axios.get(requestUrl,{
      params: params
    }).then(response => {
        if (response.data.error == 0) {
            resolve(response.data)
        } else {
            reject(response)
        }
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 * ,{withCredentials:true}
,{withCredentials:true}
 */
export function post(url, data) {
  let requestUrl = 'http://' + _host +url;
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem( 'token');
    data.token = token
    axios.post(requestUrl, data).then(response => {
        if (response.data.error == 0) {
            resolve(response.data)
        } else {
            reject(response)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        if (success.data.code == 0) {
            resolve(response.data)
        } else {
            reject(response)
        }
      }, err => {


        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

// login
export const API_GetDomainInfo = (params) => {
  return post('/loginaction', params)
}

//获取门店数据
export const API_GetStoresList = (params) => {
  return post('/account/getOfflines', params)
}

//角色管理-------角色列表
export const API_Role_getRoleList = (params) => {
  return post('/role/getRole', params)
}

//角色管理-------角色详情
export const API_Role_Details = (params) => {
  return post('/role/editRole', params)
}

//角色管理-------角色编辑
export const API_Role_Editor = (params) => {
  return post('/role/editRoleData', params)
}

//角色管理-------角色禁用
export const API_Role_Disable = (params) => {
  return post('/role/delRole', params)
}

//账号管理-------账号列表
export const API_Account_getAccountList = (params) => {
  return post('/account/getAccount', params)
}

//账号管理-------账号详情
export const API_Account_Details = (params) => {
  return post('/account/editAccount', params)
}

//账号管理-------账号编辑
export const API_Account_Editor = (params) => {
  return post('/account/editAccountData', params)
}

//账号管理-------账号禁用
export const API_Account_Disable = (params) => {
  return post('/account/delAccount', params)
}

//菜单管理-------菜单树
export const API_GetPermissionList = (params) => {
  return post('/permission/permissionlist', params)
}

//菜单管理-------添加修改
export const API_Permission_Savepermission = (params) => {
  return post('/permission/savepermission', params)
}

//菜单管理-------权限详情
export const API_Permission_Detail = (params) => {
  return post('/permission/detail', params)
}

//菜单管理-------用户菜单
export const API_Permission_User = (params) => {
  return post('/getpermission', params)
}
