import {request} from "@/network/request";

//存放车辆信息页面所有的网络请求

//列表
export function getVehicleServeData () {
  return request({
    url:'/vehicle/selectAll',
    method:'get'
  })
}

//增
export function addVehicleServeData (obj) {
  return request({
    url:'/vehicle/add',
    method:'post',
    params:obj
  })
}



//查