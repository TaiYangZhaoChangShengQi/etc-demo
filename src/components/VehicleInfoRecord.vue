<template>
  <div class="vehicle-body">
    <div class="vehicle-line">
      <div class="vehicle-page">{{PageName}}</div>
      <div class="vehicle-button">
        <el-button type="primary" @click="dialogAddVehicleVisible = true">添加设备</el-button>
      </div>
    </div>
    <div class="vehicle-list">
      <el-table
              :data="vehicleData.filter(data => !search || data.LicensePlate.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
        <el-table-column align="center" label="序号" width="100" prop="virId"/>
        <el-table-column align="center" label="车牌" width="200" prop="licensePlate" sortable/>
        <el-table-column align="center" label="OBU ID" min-width="200" prop="obuId"/>
        <el-table-column align="center" label="开始时间" min-width="200" prop="startTime" sortable/>
        <el-table-column align="center" label="结束时间" min-width="200" prop="endTime" sortable/>
        <el-table-column align="center" label="识别次数" width="150" prop="frequency"/>
        <el-table-column align="center" label="识别站点" width="150" prop="siteName" sortable/>
<!--        <el-table-column fixed="right" width="160" align="right">-->
<!--          <template slot="header" slot-scope="scope" >-->
<!--            <el-input v-model="search" size="medium " placeholder="输入车牌号搜索"/>-->
<!--          </template>-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="small" type="warning" @click="editVehicleData(scope.row.licensePlate)">修改</el-button>-->
<!--            <el-button size="small" type="danger" @click="VehicleDelete(scope.row.licensePlate)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>

    <!--添加车辆信息对话框             -->
    <el-dialog title="提示" :visible.sync="dialogAddVehicleVisible" width="30%">
      <el-form ref="form" :model="vehicleForm" label-width="80px">
        <el-form-item label="车辆编号">
          <el-input v-model="vehicleForm.virId" disabled/>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="vehicleForm.licensePlate" disabled/>
        </el-form-item>
        <el-form-item label="OBU ID">
          <el-input v-model="vehicleForm.obuId"/>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="vehicleForm.startTime"/>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="vehicleForm.endTime"/>
        </el-form-item>
        <el-form-item label="识别次数">
          <el-input v-model="vehicleForm.frequency"/>
        </el-form-item>
        <el-form-item label="识别站点">
          <el-input v-model="vehicleForm.siteName"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitVehicleData()">保存</el-button>
          <el-button @click="dialogVehicleVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getVehicleServeData} from "@/network/vehicle";


export default {
  name: 'CarInfoRecord',
  inject:['reload'],
  data () {
    return {
      vehicleData:[], //渲染列表
      vehicleForm: {}, //修改信息的表单
      PageName: '车辆信息记录',
      dialogAddVehicleVisible:false,
      search: ''
    }
  },

  created () {
    this.updateVehicleData()
  },

  methods: {
    //渲染列表
    updateVehicleData () {
      getVehicleServeData().then(res => {
        console.log("res " , res.data)
        this.vehicleData = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    // //修改车辆信息
    // editVehicleData (licensePlate) { //车牌
    //   this.dialogVehicleVisible = true
    //   for (let i = 0; i < this.vehicleData.length; i++) {
    //     if (licensePlate === this.vehicleData[i].licensePlate) {
    //       const c = JSON.parse(JSON.stringify(this.vehicleData[i]))
    //       this.vehicleForm = c
    //     }
    //   }
    // },
    //
    // // 保存修改
    // submitVehicleData () {
    //   updateVehicleServeData(this.vehicleForm).then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    //   this.reload()
    //   this.dialogVehicleVisible = false
    // },
  }
}
</script>

<style scoped>
  .vehicle-body {
    width: 100%;
    height: auto;
  }
  .vehicle-line {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }
  .vehicle-page {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }
  .vehicle-list {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
