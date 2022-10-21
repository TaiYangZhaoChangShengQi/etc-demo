import {request} from "@/network/request";

export function getDeviceBeatServeData () {
  return request({
    url:'/heartBeat/selectAll',
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
export function getCurrentDeviceBeatServeData (pageNum,pageSize) {
  return request({
    url:'/heartBeat/selectAll',
    method:'get',
    params:{
      currentPage:pageNum,
      pageSize:pageSize,
    }
  })
}

/**
 * 查
 */
export function searchBeatServeData (obj) {
  return request({
    url:'/heartBeat/selectDevId',
    method:'get',
    params:obj
  })
}