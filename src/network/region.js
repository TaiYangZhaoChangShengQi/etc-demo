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

//删
export function deleteRegionServeData (id) {
  return request({
    url:`/regional/${id}`,
    method:'delete',
  })
}

//改
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

//查