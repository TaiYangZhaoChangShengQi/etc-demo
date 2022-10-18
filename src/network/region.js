import {request} from "@/network/request";

/**
 * 存放区域页面所有的网络请求
 */

/**
 * 列表
 */
export function getRegionServeData () {
  return request({
    url:'/regional/selectAll',
    method:'get'
  })
}

/**
 * 分页
 * @param pageNum 页码
 * @param pageSize 一页展示的数据条数
 */
export function getCurrentRegionServeData (pageNum,pageSize) {
  return request({
    url:'/regional/selectAll',
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
export function addRegionServeData (obj) {
  return request({
    url:'/regional/add',
    method:'post',
    data:obj,
    headers:{
      'Content-Type':'multipart/form-data'
    },
  })
}

/**
 * 删
 */
export function deleteRegionServeData (id) {
  return request({
    url:`/regional/${id}`,
    method:'delete',
  })
}

/**
 * 改
 */
export function updateRegionServeData (obj) {
  return request({
    url:'/regional/update',
    method:'put',
    data:obj,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
  })
}

// 查