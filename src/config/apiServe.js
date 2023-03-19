import axios from "axios";
import { Message } from 'element-ui'
const ajax = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1',
});
// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.meta.status === 200) { //如果是200状态提示正确信息
    Message.success(response.data.meta.msg)
  }
  if (response.data.meta.status !== 200) { //如果不是200状态提示错误信息
    Message.error(response.data.meta.msg);
    return Promise.reject(false);
  }
  return response.data.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default ajax