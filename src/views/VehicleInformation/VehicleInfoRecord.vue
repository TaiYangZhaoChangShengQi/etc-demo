<template>
  <div class="vehicle-body">
    <div class="vehicle-line">
      <div class="vehicle-page">{{PageName}}</div>
      <div class="vehicle-button">
        <el-button type="primary" @click="dialogAddVehicleVisible = true">添加车辆</el-button>
      </div>
    </div>
    <div class="vehicle-list">
      <el-table :data="vehicleData" style="width: 100%">
        <el-table-column align="center" label="序号" width="100" prop="virId" sortable/>
        <el-table-column align="center" label="车牌" width="200" prop="licensePlate" sortable/>
        <el-table-column align="center" label="OBU ID" min-width="200" prop="obuId"/>
        <el-table-column align="center" label="开始时间" min-width="200" prop="startTime" sortable/>
        <el-table-column align="center" label="结束时间" min-width="200" prop="endTime" sortable/>
        <el-table-column align="center" label="识别次数" width="150" prop="frequency"/>
        <el-table-column align="center" label="识别站点" width="150" prop="siteName" sortable/>
      </el-table>
      <!-- 分页 -->
      <el-pagination
              layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
              @size-change="sizeChange" @current-change="currentChange" :total="totalCount">
      </el-pagination>
    </div>

    <!-- 添加车辆信息对话框 -->
    <el-dialog title="提示" :visible.sync="dialogAddVehicleVisible" width="40%">
      <el-form ref="form" :model="vehicleForm" label-width="80px" >
        <el-form-item label="车牌号">
          <el-input v-model="vehicleForm.licensePlate" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="OBU ID">
          <el-input v-model="vehicleForm.obuId" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="time1" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="date3" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="time3" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="识别次数">
          <el-input v-model="vehicleForm.frequency" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="站点ID">
          <el-select v-model="vehicleForm.siteId" placeholder="请选择站点">
            <el-option v-for="item in store.siteAllData" :key="item.siteId" :label="item.siteName" :value="item.siteId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="识别设备">
          <el-select v-model="vehicleForm.devId" placeholder="请选择设备">
            <el-option v-for="item in store.deviceAllData" :key="item.devId" :label="item.devName" :value="item.devId"/>
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
import {store} from "@/store/store";
import {getAllVehicleServeData,getCurrentVehicleServeData,addVehicleServeData} from "@/network/vehicle";

export default {
  name: 'CarInfoRecord',
  inject:['reload'],
  data () {
    return {
      store,
      search: '',
      PageName: '车辆信息记录',
      date1:'',
      time1:'',
      date3:'',
      time3:'',
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      vehicleData:[], // 渲染列表
      dialogAddVehicleVisible:false,
      vehicleForm: {   // 添加信息的表单
        obuId:'',
        licensePlate:'',
        startTime:'',
        endTime: '',
        frequency: '', // 识别次数
        siteId: '',
        devId: '',
      },
    }
  },

  mounted () {
    this.updateVehicleData()
  },

  methods: {
    // 渲染列表
    updateVehicleData () {
      getAllVehicleServeData().then(res => {
        console.log("res " , res.data)
        this.vehicleData = res.data.rows
        this.totalCount = res.data.totalCount
        this.store.vehicleData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 添加
    addVehicle () {
      this.vehicleForm.startTime = this.date1 + '\xa0' + this.time1
      this.vehicleForm.endTime = this.date3 + '\xa0' + this.time3
      addVehicleServeData(this.vehicleForm).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogAddVehicleVisible = false
    },

    // 选择某一页
    currentChange (val) {
      this.pageNum = val
      getCurrentVehicleServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.vehicleData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择展示的数据条数
    sizeChange (val) {
      this.pageSize = val
      getCurrentVehicleServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.vehicleData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    }
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
