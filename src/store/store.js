import { reactive } from 'vue'
import {getCurrentRegionServeData} from "@/network/region";
import {getCurrentSiteServeData} from "@/network/site";
import {getCurrentDeviceServeData, getCurrentDeviceTypeServeData} from "@/network/device";
import {getCurrentVehicleServeData} from "@/network/vehicle";

export const store = reactive({
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  isLoggedIn:false,
  search: '',
  siteMap:null,
  vehicleMap:null,
  Marker:null,
  gps:[],
  pageNum:'1',
  pageSize:'100',
  regionTotalCount:0,
  siteTotalCount:0,
  regionData:[],
  regionAllData:[],
  drawPolygonPath:[],
  siteData:[],
  siteAllData:[],
  vehicleData:[],
  vehicleAllData:[],
  deviceAllData:[],
  deviceTypeData:[],
  deviceTypeAllData:[],


//----------------------------------------- 函数 -----------------------------------------

  /**
   * 获取全部区域数据
   */
  getRegAllData () {
    getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
      this.regionAllData = res.data.rows
      this.getToArray(this.regionAllData)
      console.log('321',res.data.rows)
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 将字符串类型的经纬度数据转换为数组类型
   */
  getToArray (obj) {
    for (let i = 0; i < obj.length; i++) {
      let c = JSON.parse(obj[i].area)
      obj[i].area = c
    }
  },

  /**
   * 获取站点列表
   */
  getSiteAllDataList () {
    getCurrentSiteServeData(this.pageNum,this.pageSize).then(res => {
      this.siteAllData.splice(0)
      this.siteAllData = res.data.rows
      this.getToSiteArray()
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 将字符串类型的经纬度数据转换为数组类型,由于后端接口给站点和区域表的经纬度字段以不同的名字，所以需要两个
   */
  getToSiteArray () {
    for (let i = 0; i < this.siteAllData.length; i++) {
      let c = JSON.parse(this.siteAllData[i].siteRange)
      this.siteAllData[i].siteRange = c
    }
  },

  /**
   * 获取全部设备类型数据
   */
  getDeviceTypeData () {
    getCurrentDeviceTypeServeData(this.pageNum,this.pageSize).then(res => {
      this.deviceTypeAllData = res.data.rows
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 获取设备列表
   */
  UpDevData () {
    getCurrentDeviceServeData(this.pageNum,this.pageSize).then(res => {
      this.deviceAllData = res.data.rows
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 获取全部车辆信息数据
   */
  getAllVehicleData () {
    getCurrentVehicleServeData(this.pageNum,this.pageSize).then(res => {
      this.vehicleAllData = res.data.rows
    }).catch(err => {
      console.log(err)
    })
  },
})



