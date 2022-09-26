import {request} from "@/network/request";

//存放区域页面所有的网络请求

//渲染列表
export function getRegionServeData () {
  return request({
    url:'/regional/selectAll',
    method:'get'
  })
}
//增
export function addRegionServeData () {
  return request({
    url:'/Region/add',
    method:'post'
  })
}
//删
export function deleteRegionServeData () {
  return request({
    url:'/Region/{num}',
    method:'delete'
  })
}
//改
export function updateRegionServeData (obj,id) { //id为区域id
  return request({
    url:'/Region/update',
    method:'put',
    param:{siteId:id},
    data:obj,
  })
}

//查