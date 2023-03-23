import ajax from '@/config/apiServe.js'
//登录
function loginAPI(data) {
  return ajax({
    method: 'POST',
    url: '/login',
    data
  })
}

//获取menu菜单
function getMenusAPI() {
  return ajax({
    method: 'GET',
    url: '/menus',
  })

}

/**
 * 用户管理页
 */

// 用户数据列表
function getusersListAPI(params) {
  return ajax({
    method: 'get',
    url: '/users',
    params
  })
}
//修改用户状态
function updata_mg_stateAPI(uId, type) {
  return ajax({
    method: 'PUT',
    url: `users/${uId}/state/${type}`,
  })
}
//添加用户
function adduserAPI(data) {
  return ajax({
    method: 'post',
    url: '/users',
    data
  })
}
//获取一行用户信息
function getuserinfo_rowAPI(id) {
  return ajax({
    method: 'get',
    url: `users/${id}`,
  })
}
//修改一行用户数据
function edituserinfo_row_API(data) {
  return ajax({
    method: 'PUT',
    url: `users/${data.id}`,
    data
  })
}
function deleteuser_row_API(id) {
  return ajax({
    method: 'delete',
    url: `users/${id}`,
  })
}


function assignRolesAPI(id, rid) {
  return ajax({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

export {
  loginAPI,
  getMenusAPI,
  getusersListAPI,
  updata_mg_stateAPI,
  adduserAPI,
  getuserinfo_rowAPI,
  edituserinfo_row_API,
  deleteuser_row_API,
  assignRolesAPI
}