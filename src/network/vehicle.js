import {request} from "@/network/request";

/**
 * 存放车辆信息页面所有的网络请求
 */

/**
 * 列表
 */
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

/**
 * 分页
 * @param pageNum 页码
 * @param pageSize 一页展示的数据条数
 */
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

/**
 * 增
 */
export function addVehicleServeData (obj) {
  return request({
    url:'/vehicle/add',
    method:'post',
    params:obj
  })
}



/**
 * 查
 */
export function searchVehicleServeData (obj) {
  console.log('obj',obj)
  return request({
    url:'/vehicle/selectCondition',
    method:'get',
    params:obj
  })
}

/**
 * 车辆轨迹
 */
export function getVehicleTrackServeData (obj) {
  return request({
    url:'/vehicle/judge',
    method:'post',
    params:obj
  })
}