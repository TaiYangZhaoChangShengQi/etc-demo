<template>
  <div class="type-body">
    <div class="type-line">
      <div class="type-line-path">{{PageName}}</div>
      <div class="type-line-button">
        <el-button type="primary" @click="dialogFormVisible = true">添加设备</el-button>
      </div>
    </div>
    <div class="type-table">
      <el-table
              :data="this.store.deviceTypeData"
              style="width: 100%">
        <el-table-column align="center" fixed label="设备类型id" min-width="100" prop="id"/>
        <el-table-column align="center" label="设备类型" min-width="100" prop="typeName"/>
        <!--搜索              -->
        <el-table-column fixed="right" width="200" align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="medium" clearable @clear='getDeviceTypeData' @input="getSearch" placeholder="请输入关键字"/>
          </template>
          <template v-slot="scope">
            <el-button size="medium" type="warning" @click="editDevTypeData(scope.row.id) ">修改</el-button>
            <el-button size="medium" type="danger" @click="deleteDevTypeDate(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
              layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
              @current-change="currentChange" :total="totalCount">
      </el-pagination>

      <!--添加设备对话框 -->
      <el-dialog title="添加设备" :visible.sync="dialogFormVisible" width="40%">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="设备编号" prop="devNumber">
            <el-input v-model="form.id" style="width: 300px"/>
          </el-form-item>
          <el-form-item label="设备名称" prop="devName">
            <el-input v-model="form.typeName" style="width: 300px"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDevType()">添加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改设备信息对话框        -->
      <el-dialog title="修改设备信息" :visible.sync="dialogChangeDevFormVisible">
        <el-form ref="form" :model="devTypeForm" label-width="80px">
          <el-form-item label="类型id">
            <el-input v-model="devTypeForm.id" />
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="devTypeForm.typeName"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitDevTypeData()">保存</el-button>
            <el-button @click="dialogChangeVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addDeviceTypeServeData, deleteDeviceTypeServeData, getCurrentDeviceTypeServeData, updateDeviceTypeServeData} from "@/network/device";
import {store} from "@/store/store";
import {getCurrentRegionServeData} from "@/network/region";

export default {
  name: "DeviceTypeMana",
  inject:['reload'],
  data () {
    return {
      store,
      devTypeForm: {}, //修改信息的表单
      PageName:'设备类型',
      search: '',
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      dialogFormVisible: false, //添加设备 显示开关
      dialogChangeDevFormVisible: false,  //修改设备 显示开关
      form: {
        id:'',
        typeName: '',
      },
    }
  },

  created() {
    this.getDeviceTypeData()
  },

  methods: {
    /**
     * 获取设备类型列表
     */
    getDeviceTypeData () {
      getCurrentDeviceTypeServeData(this.pageNum,this.pageSize).then(res => {
        this.store.deviceTypeData = res.data.rows
        this.totalCount = res.data.totalCount
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择某一页
    currentChange (val) {
      this.pageNum = val
      getCurrentDeviceTypeServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.store.deviceTypeData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择展示的数据条数
    sizeChange (val) {
      this.pageSize = val
      getCurrentDeviceTypeServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.store.deviceTypeData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 添加设备
    addDevType () {
      addDeviceTypeServeData(this.form).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
        alert('错误：'+ err.code)
      })
      this.dialogFormVisible = false
    },

    // 修改设备信息
    editDevTypeData (devNum) {
      this.dialogChangeDevFormVisible = true
      for (let i = 0; i < this.store.deviceTypeData.length; i++) {
        if (devNum === this.store.deviceTypeData[i].id) {
          const c = JSON.parse(JSON.stringify(this.store.deviceTypeData[i]))
          this.devTypeForm = c
        }
      }
    },

    // 保存修改的设备信息
    submitDevTypeData () {
      updateDeviceTypeServeData(this.devTypeForm).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogChangeDevFormVisible = false
    },

    // 删除设备信息
    deleteDevTypeDate (id) { //设备id
      deleteDeviceTypeServeData(id).then(res => {
        console.log('res',res)
        this.reload()
      }).catch(err => {
        console.log('err',err)
      })
    },

    /**
     * 关键字搜索
     */
    getSearch () {
      let keyWord = this.search.toLowerCase()
      let arr = []
      //输入内容为空时返回原数据
      if (keyWord === '') {
        this.getDeviceTypeData()
      }
      arr = this.store.deviceTypeData.filter(item => {
        if (item.typeName.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }
      })
      this.totalCount = arr.length
      this.store.deviceTypeData = arr
    },
  },

  }
</script>

<style scoped>
  .type-line {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .type-line-path {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }

  .type-table {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>