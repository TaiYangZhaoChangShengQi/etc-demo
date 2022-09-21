import { reactive } from 'vue'

export const store = reactive({
  data: [
    {
      label: '区域01',
      num: '1',
      GPS: '22.674574, 113.993353',
      info: '',
      children: [{
        label: '站点 1-1',
        RegLabel: '区域01',
        SiteNum: '1-1',
        SiteGPS: '40.406709, 116.441345',
        region: '上海市普陀区金沙江路 1516 弄',
        info: '',
        children: [{
          label: '设备 1-1-1',
          SiteLabel: '站点 1-1',
          DevNum: '1-1-1',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        },
        {
          label: '设备 1-1-2',
          SiteLabel: '站点 1-1',
          DevNum: '1-1-2',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        }
        ]
      }, {
        label: '站点 1-2',
        RegLabel: '区域01',
        SiteNum: '1-2',
        SiteGPS: '40.239378, 115.787659',
        region: '上海市普陀区金沙江路 1516 弄',
        info: '',
        children: [{
          label: '设备 1-2-1',
          SiteLabel: '站点 1-2',
          DevNum: '1-2-1',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        },
        {
          label: '设备 1-2-2',
          SiteLabel: '站点 1-2',
          DevNum: '1-2-2',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        }]
      }]
    }, {
      label: '区域02',
      num: '2',
      GPS: '22.674574, 113.993353',
      info: '',
      children: [{
        label: '站点 2-1',
        RegLabel: '区域02',
        SiteNum: '2-1',
        SiteGPS: '40.071632, 115.013123',
        region: '上海市普陀区金沙江路 1516 弄',
        info: '',
        children: [{
          label: '设备 2-1-1',
          SiteLabel: '站点 2-1',
          DevNum: '2-1-1',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        }]
      }]
    }, {
      label: '区域03',
      num: '3',
      GPS: '22.674574, 113.993353',
      info: '',
      children: [{
        label: '站点 3-1',
        RegLabel: '区域03',
        SiteNum: '3-1',
        SiteGPS: '38.22594, 116.40564',
        region: '上海市普陀区金沙江路 1516 弄',
        info: '',
        children: [{
          label: '设备 3-1-1',
          SiteLabel: '站点 3-1',
          DevNum: '3-1-1',
          DevIP: '192.168.0.1',
          MAC: '00-01-6C-06-A6-12',
          DevType: '',
          DevBeat: '',
          info: ''
        }]
      }]
    }],
  VehicleData: [
    {
      CarNum: '1-1-1-1',
      LicensePlate: '粤A·68588',
      ObuID: 'E51DD2BAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点01'
    }, {
      CarNum: '1-1-1-2',
      LicensePlate: '粤A·68688',
      ObuID: 'E51DD2B629FCBB93CCAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点01'
    },
    {
      CarNum: '1-2-1-1',
      LicensePlate: '粤A·68628',
      ObuID: 'E51DD2B6243CCAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点02'
    },
    {
      CarNum: '1-2-1-2',
      LicensePlate: '粤A·68662',
      ObuID: 'E51DD2B624748B007EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点02'
    }
  ],
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  search: '',

  // ----------------------------------------函数---------------------------------------
  // 插入新区域
  TrueAddReg (item) {
    this.data.push(item)
    console.log(this.data)
  },
  // 保存新区域
  addReg (num, item) {
    num = Number(num)
    this.data[num - 1] = item
  },
  // 删除区域
  deleteRegData (num) {
    num = Number(num)
    this.data.splice(num, 1)
  },
  // 插入新站点
  addSite (index1, item) { // num 区域编号 传num，
    for (let i = 0; i < this.data.length; i++) {
      if (index1 === this.data[i].label) {
        this.data[i].children.push(item)
      }
    }
  },
  // 插入新设备
  addDev (SiteLabel, item) { // 参数1 站点名 ，参数2 保存全部设备信息的对象
    console.log(SiteLabel, item)
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].children.length; j++) {
        if (this.data[i].children[j].label === SiteLabel) { // 站点表的站点名是label，不是SiteLabel
          this.data[i].children[j].children.push(item)
        }
      }
    }
  },

  // 插入新车辆信息
  addVehicle (item) { // item为车辆信息对象
    this.VehicleData.push(item)
  },
  // 删除新车辆信息
  deleteVehicle (index) { // index为数组下标
    this.VehicleData.splice(index, 1)
  }
})
