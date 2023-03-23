import ajax from '@/config/apiServe.js'
//获取分类 1 - 2 - 3级列表
function getcateListAPI(params) {
  return ajax({
    method: 'GET',
    url: '/categories',
    params
  })
}
//添加分类
function addcateListAPI(data) {
  return ajax({
    method: 'post',
    url: '/categories',
    data
  })
}
//删除分类
function delcateListAPI(id) {
  return ajax({
    method: 'delete',
    url: `/categories/${id}`,
  })
}
export {
  getcateListAPI,
  addcateListAPI,
  delcateListAPI
}