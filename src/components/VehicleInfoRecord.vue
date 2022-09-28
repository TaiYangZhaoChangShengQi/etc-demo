<template>
  <div class="vehicle-body">
    <div class="vehicle-line">
      <div class="vehicle-page">{{PageName}}</div>
      <div class="vehicle-button">
        <el-button type="primary" @click="dialogAddVehicleVisible = true">添加车辆</el-button>
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
      </el-table>
    </div>

    <!--添加车辆信息对话框             -->
    <el-dialog title="提示" :visible.sync="dialogAddVehicleVisible" width="30%">
      <el-form ref="form" :model="vehicleForm" label-width="80px">
        <el-form-item label="车牌号">
          <el-input v-model="vehicleForm.licensePlate" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="OBU ID">
          <el-input v-model="vehicleForm.obuId" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="vehicleForm.startTime" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="vehicleForm.endTime" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="识别次数">
          <el-input v-model="vehicleForm.frequency" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="站点ID">
          <el-select v-model="vehicleForm.siteId" placeholder="请选择站点">
            <el-option v-for="item in store.siteData" :key="item.siteId" :label="item.siteName" :value="item.siteId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="识别设备">
          <el-select v-model="vehicleForm.devId" placeholder="请选择设备">
            <el-option v-for="item in store.vehicleData" :key="item.devId" :label="item.devName" :value="item.devId"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addVehicle()">立即创建</el-button>
          <el-button @click="dialogVehicleVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getVehicleServeData,addVehicleServeData} from "@/network/vehicle";
import {store} from "@/store/store";


export default {
  name: 'CarInfoRecord',
  inject:['reload'],
  data () {
    return {
      store,
      vehicleData:[], //渲染列表
      vehicleForm: {   //添加信息的表单
        obuId:'',
        licensePlate:'',
        startTime:'',
        endTime: '',
        frequency: '', //识别次数
        siteId: '',
        devId: '',
      },
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
        this.store.vehicleData = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    //添加
    addVehicle () {
      addVehicleServeData(this.vehicleForm).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogAddVehicleVisible = false
    },
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
