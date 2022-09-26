import {request} from "@/network/request";

//存放站点页面所有的网络请求

//渲染列表
export function getSiteServeData () {
  return request({
    url:'/site/selectAll',
    method:'get'
  })
}
//增
export function addSiteServeData (obj) {
  return request({
    url:'/site/add',
    method:'post',
    params:obj
  })
}
//删
export function deleteSiteServeData () {
  return request({
    url:'/site/add',
    method:'delete'
  })
}
//改
export function updateSiteServeData (obj) {
  return request({
    url:'/site/update',
    method:'put',
    params:obj,
  })
}
