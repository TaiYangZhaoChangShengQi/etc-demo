import {request} from "@/network/request";

//存放站点页面所有的网络请求

//渲染列表
export function getSiteServeData () {
  return request({
    url:'/site/selectAll',
    method:'get'
  })
}

// 分页
export function getCurrentSiteServeData (pageNum,pageSize) {
  return request({
    url:'/site/selectAll',
    method:'get',
    params:{
      currentPage:pageNum,
      pageSize:pageSize,
    }
  })
}

//增
export function addSiteServeData (obj) {
  return request({
    url:'/site/add',
    method:'post',
    data:obj,
    headers:{
      'Content-Type':'multipart/form-data'
    },
  })
}

//删
export function deleteSiteServeData (id) {
  return request({
    url:`/site/${id}`,
    method:'delete',
  })
}

//改
export function updateSiteServeData (obj) {
  return request({
    url:'/site/update',
    method:'put',
    data:obj,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
  })
}
