import {request} from "@/network/request";

//存放设备页面所有的网络请求

//列表
export function getDeviceServeData () {
  return request({
    url:'/device/selectAll',
    method:'get'
  })
}

//增
export function addDeviceServeData (obj) {
  return request({
    url:'/posts',
    method:obj,
  })
}

//删

//改
export function updateDeviceServeData (obj) {
  return request({
    url:'/device/update',
    method:'put',
    params:obj,
  })
}

//查