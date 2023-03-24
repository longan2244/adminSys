import ajax from '@/config/apiServe.js'


function getattributesAPI(id, params = {}) {
  return ajax({
    method: 'get',
    url: `categories/${id}/attributes`,
    params
  })
}
//添加属性
function addattributeAPI(id, data) {
  return ajax({
    method: 'post',
    url: `categories/${id}/attributes`,
    data
  })
}
export {
  getattributesAPI,
  addattributeAPI
}