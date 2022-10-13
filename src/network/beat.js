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

// 分页
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