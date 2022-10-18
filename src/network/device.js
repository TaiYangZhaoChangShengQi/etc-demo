import {request} from "@/network/request";

/**
 * 存放设备页面所有的网络请求
 */

/**
 * 列表
 */
export function getDeviceServeData () {
  return request({
    url:'/device/selectAll',
    method:'get'
  })
}

/**
 * 分页
 * @param pageNum 页码
 * @param pageSize 一页展示的数据条数
 */
export function getCurrentDeviceServeData (pageNum,pageSize) {
  return request({
    url:'/device/selectAll',
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
export function addDeviceServeData (obj) {
  return request({
    url:'/device/add',
    method:'post',
    params:obj
  })
}

/**
 * 删
 */
export function deleteDeviceServeData (id) {
  return request({
    url:`/device/${id}`,
    method:'delete',
  })
}

/**
 * 改
 */
export function updateDeviceServeData (obj) {
  return request({
    url:'/device/update',
    method:'put',
    params:obj,
  })
}

/**
 * 查
 */
export function searchDeviceServeData (obj) {
  return request({
    url:'/device/selectCondition',
    method:'get',
    params:obj
  })
}

/**
 * 设备类型 分页
 * @param pageNum 页码
 * @param pageSize 一页展示的数据条数
 */
export function getCurrentDeviceTypeServeData (pageNum,pageSize) {
  return request({
    url:'/type/selectAll',
    method:'get',
    params:{
      currentPage: pageNum,
      pageSize: pageSize,
    }
  })
}

/**
 * 设备类型 增
 */
export function addDeviceTypeServeData (obj) {
  return request({
    url:'/type/add',
    method:'post',
    params:obj
  })
}

/**
 * 设备类型 删
 */
export function deleteDeviceTypeServeData (id) {
  return request({
    url:`/type/${id}`,
    method:'delete',
  })
}

/**
 * 设备类型 改
 */
export function updateDeviceTypeServeData (obj) {
  return request({
    url:'/type/update',
    method:'put',
    params:obj,
  })
}

