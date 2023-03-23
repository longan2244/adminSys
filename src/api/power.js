import ajax from '@/config/apiServe.js'
function getRightsListAPI(type = 'list') {
  return ajax({
    method: 'GET',
    url: `/rights/${type}`,
  })
}


function getRolesListAPI(tree) {
  return ajax({
    method: 'GET',
    url: '/roles',
  })
}



// 删除权限role
function delroleAPI(roleId, rightId) {
  return ajax({
    method: 'delete',
    url: `/roles/${roleId}/rights/${rightId}`,
  })
}


// ### 1.5.6.roleAuthorization

//   - 请求路径：roles /: roleId / rights
//     - 请求方法：post

function roleAuthorizationAPI(roleId, rids) {
  return ajax({
    method: 'POST',
    url: `/roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}




/**### 1.5.2.添加角色
 * 
 *参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| roleName | 角色名称 | 不能为空 |
| roleDesc | 角色描述 | 可以为空 |
 */
function addroleAPI(data) {
  return ajax({
    method: 'post',
    url: '/roles',
    data
  })
}

/**
 * 删除角色
 *- 请求路径：roles/:id
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 角色 ID  | 不能为空`携带在url中` |
 */
function deleteTheRoleAPI(id) {
  return ajax({
    method: 'delete',
    url: `roles/${id}`,
  })
}


export {
  getRightsListAPI,
  getRolesListAPI,
  delroleAPI,
  roleAuthorizationAPI,
  addroleAPI,
  deleteTheRoleAPI
}