import {request} from "@/network/request";

//存放车辆信息页面所有的网络请求

//列表
export function getAllVehicleServeData () {
  return request({
    url:'/vehicle/selectAll',
    method:'get',
    params:{
      currentPage:'1',
      pageSize:'10'
    }
  })
}

//分页
export function getCurrentVehicleServeData (pageNum,pageSize) {
  return request({
    url:'/vehicle/selectAll',
    method:'get',
    params:{
      currentPage:pageNum,
      pageSize:pageSize,
    }
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