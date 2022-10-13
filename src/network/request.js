import axios from 'axios'

export function request (config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL:'http://139.199.220.137:7039/',
    timeout: 5000
  })

  // 请求截器
  instance.interceptors.request.use(config => {
    console.log('res',config)
    return config // 拦截成功后必须要返回config
  }, err => {
    console.log('err',err.request.data)
    return err.request.data
  })

  // 响应拦截
  instance.interceptors.response.use( res => {
    return res.data
  },err => {
    return err.response.data
  })

  // 发送网络请求
  return instance(config)
}
