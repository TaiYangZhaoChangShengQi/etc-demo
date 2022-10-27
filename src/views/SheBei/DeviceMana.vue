<template>
    <div class="DevBody">
      <div class="dev-item">
        <div class="dev-item-line">
          <div class="dev-item-line-path">{{PageName}}</div>
          <div class="dev-item-line-button">
            <div class="dev-item-line-button-input">
              <el-input class="input-style" clearable v-model="searchForm.devNumber" size="medium" placeholder="请输入设备编号"/>
              <el-input class="input-style" clearable v-model="searchForm.devName" size="medium" placeholder="请输入设备名称"/>
              <el-select class="adjustment" clearable style="width: 150px" v-model="searchForm.siteName" placeholder="请选择站点">
                <el-option v-for="(item) in this.store.siteAllData" :key="item.siteId" :label="item.siteName" :value="item.siteName"/>
              </el-select>
              <el-select class="adjustment" clearable style="width: 165px" v-model="searchForm.typeName" placeholder="请选择设备类型">
                <el-option v-for="(item) in this.store.deviceTypeAllData" :key="item.id" :label="item.typeName" :value="item.typeName"/>
              </el-select>
              <el-button class="add-margin" type="primary" icon="el-icon-search" @click="getQuery">搜索</el-button>
              <el-button style="width: 80px" type="primary" @click="clearSearch">重置</el-button>
            </div>
            <el-button type="primary" @click="dialogFormVisible = true">添加设备</el-button>
          </div>
        </div>
        <div class="dev-item-table">
          <el-table
            :data="getOrSearch === 0? deviceData:deviceSearchData"
            style="width: 100%">
            <el-table-column align="center" fixed label="设备编号" min-width="100" prop="devNumber"/>
            <el-table-column align="center" label="设备名称" min-width="100" prop="devName"/>
            <el-table-column align="center" label="所属站点" min-width="150" prop="siteName"/>
            <el-table-column align="center" label="IP地址" min-width="120" prop="ip"/>
            <el-table-column align="center" label="MAC地址" min-width="160" prop="mac"/>
            <el-table-column align="center" label="设备类型" min-width="100" prop="typeName"/>
            <el-table-column align="center" label="设备状态" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 1"><el-tag size="small">在线</el-tag></div>
                <div v-else><el-tag type="danger" size="small">离线</el-tag></div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注" min-width="100" prop="remarks"/>
            <!--搜索              -->
            <el-table-column fixed="right" width="170" align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="medium" clearable @clear='UpDevData' @input="getSearch" placeholder="请输入关键字"/>
              </template>
              <template v-slot="scope">
                <el-button size="medium" type="warning" @click="editDevData(scope.row.devNumber) ">修改</el-button>
                <el-button size="medium" type="danger" @click="deleteDevDate(scope.row.devId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
                  layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
                  :current-page.sync="currentPage" @size-change="sizeChange" @current-change="currentChange" :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <!--添加设备对话框 -->
        <el-dialog title="添加设备" :visible.sync="dialogFormVisible" width="40%">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="站点ID">
            <el-select v-model="form.siteId" placeholder="请选择站点">
              <el-option v-for="item in store.siteAllData" :key="item.siteId" :label="item.siteName" :value="item.siteId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号" prop="devNumber">
            <el-input v-model="form.devNumber" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="设备名称" prop="devName">
            <el-input v-model="form.devName" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="form.ip" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="设备MAC" prop="mac">
            <el-input v-model="form.mac" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="设备类型(Id)" prop="typeId">
            <el-select v-model="form.typeId" placeholder="请选择站点">
              <el-option v-for="item in store.deviceTypeAllData" :key="item.id" :label="item.typeName" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remarks" style="width: 300px"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDev()">添加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改设备信息对话框        -->
      <el-dialog title="修改设备信息" :visible.sync="dialogChangeDevFormVisible">
        <el-form ref="form" :model="devForm" label-width="80px">
          <el-form-item label="设备编号">
            <el-input v-model="devForm.devNumber" />
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="devForm.devName"/>
          </el-form-item>
          <el-form-item label="所属站点">
            <el-input v-model="devForm.siteName" />
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input v-model="devForm.ip"/>
          </el-form-item>
          <el-form-item label="MAC地址">
            <el-input v-model="devForm.mac"/>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="devForm.typeName" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="devForm.remarks"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitDevData()">保存</el-button>
            <el-button @click="dialogChangeVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import {
  getCurrentDeviceServeData, addDeviceServeData, deleteDeviceServeData,
  updateDeviceServeData, searchDeviceServeData,searchDeviceStateServeData} from "@/network/device";
import {askState} from "@/network/beat";
import {store} from "@/store/store";

export default {
  name: 'DeviceMana',
  inject:['reload'],
  data () {
    return {
      store,
      search: '',
      getOrSearch:0,
      currentPage:1,
      state:'在',
      intervalOn:null,
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      devForm: {}, //修改信息的表单
      deviceData: [], //渲染列表
      deviceSearchData: [], //渲染判断列表
      PageName: '设备管理',
      dialogFormVisible: false, //添加设备 显示开关
      dialogChangeDevFormVisible: false,  //修改设备 显示开关
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchForm:{
        currentPage:1,
        pageSize:10,
        devNumber:'',
        devName:'',
        siteName:'',
        typeName:'',
      },
      form: {
        siteId:'',
        devNumber: '',
        devName: '',
        ip: '',
        mac: '',
        typeId: '',
        remarks: ''
      },
    }
  },

  created () {
    this.UpDevData()
    this.lunXun()
  },

  methods: {
    /**
     * 获取设备列表
     */
    UpDevData () {
      getCurrentDeviceServeData(this.pageNum,this.pageSize).then(res => {
        console.log(res.data.rows)
        this.deviceData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 0
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     *  选择某一页
     */
    currentChange (val) {
      if (this.getOrSearch === 0) {
        this.pageNum = val
        getCurrentDeviceServeData(this.pageNum,this.pageSize).then(res => {
          this.deviceData = res.data.rows
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
     */
    sizeChange (val) {
      if (this.getOrSearch === 0) {
        this.pageSize = val
        this.searchForm.pageSize = val
        getCurrentDeviceServeData(this.pageNum,this.pageSize).then(res => {
          this.deviceData = res.data.rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.pageSize = val
        this.getQuery()
      }
    },

    /**
     * 添加设备
     */
    addDev () {
      addDeviceServeData(this.form).then(res => {
        this.reload()
      }).catch(err => {
        console.log(err)
        alert('错误：'+ err.code)
      })
      this.dialogFormVisible = false
    },

    /**
     * 修改设备信息
     * @param devNum 设备编号
     */
    editDevData (devNum) {
      this.dialogChangeDevFormVisible = true
      this.deviceData.map((item) => {
        if (devNum === item.devNumber) {
          const c = JSON.parse(JSON.stringify(item))
          this.devForm = c
        }
      })
    },

    /**
     * 保存修改的设备信息
     */
    submitDevData () {
      updateDeviceServeData(this.devForm).then(res => {
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogChangeDevFormVisible = false
    },

    /**
     * 删除设备信息
     * @param id 设备id
     */
    deleteDevDate (id) {
      deleteDeviceServeData(id).then(res => {
        this.reload()
      }).catch(err => {
        console.log('err',err)
      })
    },

    /**
     * 关键字搜索
     */
    getSearch () {
      window.clearInterval(this.intervalOn)
      let keyWord = this.search.toLowerCase()
      let arr = []
      //输入内容为空时返回原数据
      if (keyWord === '') {
        this.UpDevData()
      }
      arr = this.deviceData.filter(item => {
        if (item.devNumber.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }else if (item.devName.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }else if (item.siteName.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }else if (item.typeName.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }
      })
      this.totalCount = arr.length
      this.deviceData = arr
    },

    /**
     * 后端条件搜索
     */
    getQuery () {
      window.clearInterval(this.intervalOn)
      if (this.getOrSearch === 0) {
        this.currentPage = 1
      }
      searchDeviceServeData(this.searchForm).then(res => {
        this.deviceSearchData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 1
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 查询设备状态
     * @param id 设备id
     */
    queryState (id) {
      id = Number(id)
      console.log(id)
      id = 2
      searchDeviceStateServeData(id).then(res => {
        console.log(res)
        this.UpDevData()
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 清空搜索框
     */
    clearSearch () {
      this.intervalOn = window.setInterval( ()=>{this.askServe()},5e3)
      this.UpDevData()
      this.reload()
    },

    /**
     * 轮询
     */
    askServe () {
      askState().then(res => {
        console.log(res)
        this.UpDevData()
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 存放轮询
     */
    lunXun () {
      this.intervalOn = window.setInterval( ()=>{this.askServe()},5e3)
    },
  },
}
</script>

<style scoped>
  .DevBody {
    display: flex;
    width: 100%;
  }

  .dev-item {
    width: 100%;
  }

  .dev-item-line {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .dev-item-line-path {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }

  .dev-item-line-button {
    display: flex;
    justify-content: space-between;
  }

  .el-button--primary /deep/ .el-icon-search {
    margin-right: 5px;
  }

  .dev-item-line-button-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 850px;
    margin-right: 50px;
  }

  .input-style {
    padding-top: 3px;
    width: 150px;
  }

  .add-margin {
    margin-left: 10px;
  }

  .adjustment {
    margin-top: 4px;
  }
  .dev-item-table {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .el-dialog {
    left: 700px;
    top: 200px;
    padding: 5px 50px;
    width: 400px;
    position: absolute;
    background-color: white;
    box-shadow: 0 2px 20px 1px rgb(128, 128, 128);
    z-index: 20;

  }
  .form .title {
    text-align: center;
  }

  .off-line {

  }

</style>
