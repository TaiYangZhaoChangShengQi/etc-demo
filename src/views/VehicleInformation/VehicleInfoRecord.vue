<template>
  <div class="vehicle-body">
    <div class="vehicle-line">
      <div class="vehicle-page">{{PageName}}</div>
      <div class="vehicle-button">
        <div class="vehicle-button-input">
          <el-input class="input-style" v-model="searchForm.licensePlate" size="medium" placeholder="请输入车牌号"/>
          <el-input class="input-style" v-model="searchForm.obuId" size="medium" placeholder="请输入OBU ID"/>
          <el-select clearable style="width: 150px; margin-top: 4px" v-model="searchForm.siteName" placeholder="请选择站点">
            <el-option v-for="(item) in this.store.siteAllData" :key="item.siteId" :label="item.siteName" :value="item.siteName"/>
          </el-select>
          <el-date-picker class="input-style" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期时间" v-model="searchForm.startTime"></el-date-picker>
          -
          <el-date-picker class="input-style" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期时间" v-model="searchForm.endTime" ></el-date-picker>
          <el-button class="add-margin" type="primary" icon="el-icon-search" @click="getQuery">搜索</el-button>
          <el-button style="width: 80px" type="primary" @click="clearSearch">重置</el-button>
        </div>
        <el-button style="width: 100px" type="primary" @click="dialogAddVehicleVisible = true">添加车辆</el-button>
      </div>
    </div>
    <div class="vehicle-list">
      <el-table :data="getOrSearch === 0? vehicleData:vehicleSearchData " style="width: 100%">
        <el-table-column align="center" label="序号" width="100" prop="virId" sortable/>
        <el-table-column align="center" label="车牌" width="200" prop="licensePlate" sortable/>
        <el-table-column align="center" label="OBU ID" min-width="200" prop="obuId" sortable/>
        <el-table-column align="center" label="开始时间" min-width="200" prop="startTime" sortable/>
        <el-table-column align="center" label="结束时间" min-width="200" prop="endTime" sortable/>
        <el-table-column align="center" label="识别次数" width="150" prop="frequency"/>
        <el-table-column align="center" label="所属区域" width="150" prop="regionalName"/>
        <el-table-column align="center" label="风险等级" width="150" prop="riskLevel"/>
        <el-table-column align="center" label="管控等级" width="150" prop="controlLevel"/>
        <el-table-column align="center" label="识别站点" width="150" prop="siteName" sortable>
          <template slot-scope="scope">
            <div class="site" @click="getSite(scope.row.siteId)">{{scope.row.siteName}}</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center;" @size-change="sizeChange" @current-change="currentChange" :total="totalCount"
        :current-page.sync="currentPage" v-model:page-size="limit" :page-sizes="[10,15,20,50,100]"
        layout="total, sizes, prev, pager, next, jumper">
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
            <el-date-picker v-model="date1" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker v-model="date3" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-col>
        </el-form-item>
        <el-form-item label="识别次数">
          <el-input v-model="vehicleForm.frequency" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-select v-model="vehicleForm.regionalName" placeholder="请选择区域">
            <el-option v-for="(item,index) in store.regionAllData" :key="item.id" :label="item.name" :value="item.name"
                       @click.native="showSite(item.name,item.riskLevel,item.controlLevel)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="站点ID">
          <el-select v-model="vehicleForm.siteId" placeholder="请选择站点">
            <el-option v-for="item in showSiteForm" :key="item.siteId" :label="item.siteName" :value="item.siteId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="风险等级">
          <el-input v-model="vehicleForm.riskLevel" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="管控等级">
          <el-input v-model="vehicleForm.controlLevel" style="width: 300px"/>
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
    <!-- 站点详情 -->
    <el-dialog title="" :visible.sync="dialogSiteVisible" width="40%">
      <div class="details">
        <el-descriptions title="站点详情" direction="vertical" :column="4" border>
          <el-descriptions-item label="站点编号">{{detailForm.siteNumber}}</el-descriptions-item>
          <el-descriptions-item label="站点名称">{{detailForm.siteName}}</el-descriptions-item>
          <el-descriptions-item label="所属区域" :span="2">{{detailForm.name}}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">站点</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {store} from "@/store/store";
import {getAllVehicleServeData,getCurrentVehicleServeData,addVehicleServeData,searchVehicleServeData} from "@/network/vehicle";

export default {
  name: 'CarInfoRecord',
  inject:['reload'],
  data () {
    return {
      store,
      search: '',
      PageName: '车辆信息记录',
      startDate:'',
      endDate:'',
      date1:'',
      time1:'',
      date3:'',
      time3:'',
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      limit: 10,
      currentPage:1,
      detailForm:{
        siteNumber:'',
        siteName:'',
        name:'',
      },
      vehicleData:[], // 渲染列表
      vehicleSearchData:[], // 渲染判断列表
      getOrSearch:0,
      dialogSiteVisible:false,
      dialogAddVehicleVisible:false,
      searchForm:{
        currentPage:1,
        pageSize:10,
        obuId:'',
        licensePlate:'',
        siteName:'',
        startTime:'',
        endTime:'',
      },
      showSiteForm:[],
      vehicleForm: {   // 添加信息的表单
        obuId:'',
        licensePlate:'',
        startTime:'',
        endTime: '',
        frequency: '', // 识别次数
        regionalName:'',
        siteId: '',
        devId: '',
        trackRecord:'',
        rawData:'',
        riskLevel:'',
        controlLevel:''
      },
    }
  },

  mounted () {
    this.updateVehicleData()
  },

  methods: {
    /**
     * 获取车辆列表
     */
    updateVehicleData () {
      getAllVehicleServeData().then(res => {
        this.vehicleData = res.data.rows
        this.totalCount = res.data.totalCount
        this.store.vehicleData = res.data.rows
        this.getOrSearch = 0
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 添加
     */
    addVehicle () {
      this.vehicleForm.startTime = this.date1
      this.vehicleForm.endTime = this.date3
      addVehicleServeData(this.vehicleForm).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogAddVehicleVisible = false
    },

    /**
     * 选择某一页
     * @param val 页码
     */
    currentChange (val) {
      if (this.getOrSearch === 0) {
        this.pageNum = val
        getCurrentVehicleServeData(this.pageNum,this.pageSize).then(res => {
          this.vehicleData = res.data.rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.currentPage = val
        this.getQuery()
      }

    },

    /**
     * 选择展示的数据条数
     * @param val 页面的数据条数
     */
    sizeChange (val) {
      if (this.getOrSearch === 0) {
        this.pageSize = val
        this.searchForm.pageSize = val
        getCurrentVehicleServeData(this.pageNum,this.pageSize).then(res => {
          this.vehicleData = res.data.rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.pageSize = val
        this.getQuery()
      }
    },

    /**
     * 后端条件搜索
     */
    getQuery () {
      searchVehicleServeData(this.searchForm).then(res => {
        console.log(this.searchForm)
        this.currentPage = 1
        this.vehicleSearchData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 1
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 清空搜索框
     */
    clearSearch () {
      this.updateVehicleData()
      this.reload()
    },

    /**
     * 显示站点详细信息
     */
    getSite (id) {
      this.dialogSiteVisible = true
      console.log(id)
      console.log(typeof id)
      this.store.siteAllData.map((item,index) => {
        if (item.siteId === id) {
          this.detailForm.siteNumber = item.siteNumber
          this.detailForm.siteName = item.siteName
          this.detailForm.name = item.name
        }
      })
    },

    /**
     * 筛选站点
     */
    showSite (name,riskLevel,controlLevel) {
      this.vehicleForm.riskLevel = riskLevel
      this.vehicleForm.controlLevel = controlLevel
      this.store.siteAllData.map((item) => {
        if (item.name === name) {
          this.showSiteForm.push(item)
        }
      })
      console.log(this.showSiteForm)
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

  .vehicle-button {
    display: flex;
    justify-content: space-between;
  }

  .vehicle-button-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1040px;
    margin-right: 50px;
  }

  .el-button--primary /deep/ .el-icon-search {
    margin-right: 5px;
  }

  .input-style {
    padding-top: 3px;
    width: 150px;
  }

  .add-margin {
    margin-left: 10px;
  }

  .site:hover {
    color: #bd2c00;
    cursor: pointer;
  }

  .details {

    font-family: "NSimSun", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
