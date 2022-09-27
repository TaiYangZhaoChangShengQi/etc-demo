import {request} from "@/network/request";

export function getDeviceBeatServeData () {
  return request({
    url:'/heartBeat/selectAll',
    method:'get'
  })
}