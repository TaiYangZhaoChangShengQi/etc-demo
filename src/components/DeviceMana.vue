<template>
    <div class="DevBody">
      <!--        <div class="Dev-1">-->
      <!--            <el-tree :data="store.data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
      <!--        </div>-->
      <div class="Dev-2">
        <div class="Dev-2-1">
          <div class="Dev-2-1-2">{{PageName}}</div>
          <div class="Dev-2-1-1">
              <el-button type="primary" @click="dialogFormVisible = true">添加设备</el-button>
          </div>
        </div>
        <div class="Dev-2-2">
          <el-table
            :data="deviceData.filter(data => !search || data.devName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
              <el-table-column align="center" fixed label="设备编号" width="100" prop="devNumber"/>
              <el-table-column align="center" label="设备名称" width="150" prop="devName"/>
              <el-table-column align="center" label="所属站点" width="150" prop="siteName"/>
              <el-table-column align="center" label="IP地址" min-width="150" prop="ip"/>
              <el-table-column align="center" label="MAC地址" min-width="160" prop="mac"/>
              <el-table-column align="center" label="设备类型" min-width="100" prop="typeName"/>
              <el-table-column align="center" label="备注" min-width="100" prop="remarks"/>
              <!--搜索              -->
              <el-table-column fixed="right" width="150" align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="medium" placeholder="输入设备名称搜索"/>
                </template>
                <template v-slot="scope">
                  <el-button size="small" type="warning" @click="editDevData(scope.row.devNumber) ">修改</el-button>
                  <el-button size="small" type="danger" @click="deleteDevDate(scope.row.devNumber)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>

      <!--添加设备对话框 -->
      <el-dialog title="添加设备" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="绑定站点">
            <el-select v-model="form.SiteLabel" placeholder="请选择站点">
              <el-option label="站点 1-1" value="站点 1-1"/>
              <el-option label="站点 1-2" value="站点 1-2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input v-model="form.DevNum"/>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="form.label"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="form.IP"/>
          </el-form-item>
          <el-form-item label="设备MAC">
            <el-input v-model="form.MAC"/>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="form.DevType"/>
          </el-form-item>
          <el-form-item label="设备心跳">
            <el-input v-model="form.DevBeat"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.info"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onDevSubmit(form.SiteLabel)">添加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改设备信息对话框        -->
      <el-dialog title="修改设备信息" :visible.sync="dialogChangeDevFormVisible">
        <el-form ref="form" :model="devForm" label-width="80px">
          <el-form-item label="设备编号">
            <el-input v-model="devForm.devNumber" disabled/>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="devForm.devName"/>
          </el-form-item>
          <el-form-item label="所属站点">
            <el-input v-model="devForm.siteName" disabled/>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input v-model="devForm.ip"/>
          </el-form-item>
          <el-form-item label="MAC地址">
            <el-input v-model="devForm.mac"/>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input v-model="devForm.typeName" disabled/>
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
import {getDeviceServeData,updateDeviceServeData} from "@/network/device";

export default {
  name: 'DeviceMana',
  inject:['reload'],
  data () {
    return {
      dialogFormVisible: false, //添加设备 显示开关
      dialogChangeDevFormVisible: false,  //修改设备 显示开关
      deviceData: [], //渲染列表
      devForm: {}, //修改信息的表单
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      PageName: '设备管理',
      search: '',
      form: {
        label: '',
        SiteLabel: '',
        DevNum: '',
        IP: '',
        MAC: '',
        DevType: '',
        DevBeat: '',
        info: ''
      },

    }
  },

  created () {
    this.UpDevData()
  },

  methods: {
    //发送请求，渲染列表
    UpDevData () {
      getDeviceServeData().then(res => {
        console.log("res " , res.data)
        this.deviceData = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    // 添加设备
    // onDevSubmit (name) {
    //   this.store.addDev(name, this.form)
    //   console.log(this.form)
    //   this.UpDevData()
    // },
    // 修改设备信息
    editDevData (devNum) {
      this.dialogChangeDevFormVisible = true
      for (let i = 0; i < this.deviceData.length; i++) {
        if (devNum === this.deviceData[i].devNumber) {
          const c = JSON.parse(JSON.stringify(this.deviceData[i]))
          this.devForm = c
        }
      }
    },

    // 保存修改的设备信息
    submitDevData () {
      updateDeviceServeData(this.devForm).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.reload()
      this.dialogChangeDevFormVisible = false
    },

    // // 删除设备信息
    // deleteDevDate (index1) {
    //   for (let j = 0; j < this.store.data.length; j++) {
    //     for (let i = 0; i < this.store.data[j].children.length; i++) {
    //       for (let k = 0; k < this.store.data[j].children[i].children.length; k++) {
    //         if (index1 === this.store.data[j].children[i].children[k].DevNum) {
    //           console.log(111)
    //           this.store.data[j].children[i].children.splice(k, 1)
    //           console.log(this.store.data[j].children[i].children)
    //         }
    //       }
    //     }
    //   }
    //   this.UpDevData()
    //   console.log(this.DevData)
    // }
  },
}
</script>

<style scoped>
  .DevBody {
    display: flex;
    width: 100%;
  }
  .Dev-1 {
    margin-right: 15px;
    width: 190px;
    height: 650px;
    box-shadow: 0 12px 24px 5px rgba(0, 0, 0, .16);
  }

  .Dev-2 {
    width: 100%;
  }

  .Dev-2-1 {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .Dev-2-1-2 {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }

  .Dev-2-2 {
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



</style>
