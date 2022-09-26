import axios from 'axios'

export function request (config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://192.168.1.102:8080/', //1214宿舍wifi
    // baseURL:'http://10.248.94.8:8080/',  //206
    timeout: 5000
  })

  // 请求截器
  instance.interceptors.request.use(config => {

    return config // 拦截成功后必须要返回config
  }, err => {

  })

  // 响应拦截
  instance.interceptors.response.use( res => {
    return res.data
  },err => {
    console.log(err)
  })

  // 发送网络请求
  return instance(config)
}
