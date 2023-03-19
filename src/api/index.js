import ajax from '@/config/apiServe.js'

function login(data) {
  return ajax({
    method: 'POST',
    url: '/login',
    data
  })
}

export {
  login
}