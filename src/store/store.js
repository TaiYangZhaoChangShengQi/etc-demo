import { reactive } from 'vue'

export const store = reactive({

  VehicleData: [
    {
      CarNum: '1',
      LicensePlate: '粤A·68588',
      ObuID: 'E51DD2BAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点01'
    }, {
      CarNum: '2',
      LicensePlate: '粤A·68688',
      ObuID: 'E51DD2B629FCBB93CCAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点01'
    },
    {
      CarNum: '3',
      LicensePlate: '粤A·68628',
      ObuID: 'E51DD2B6243CCAFF2C07EF7',
      startTime: '2022年9月1日18:30:54',
      endTime: '2022年9月1日18:31:19',
      discernTime: '90',
      discernSite: '站点02'
    },
    {
      CarNum: '4',
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
