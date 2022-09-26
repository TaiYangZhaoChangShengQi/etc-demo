import {request} from "@/network/request";

//存放车辆信息页面所有的网络请求

export function getVehicleServeData () {
  return request({
    url:'/vehicle/selectAll',
    method:'get'
  })
}

//增
export function addVehicleServeData() {

}



//查