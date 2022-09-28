<template>
  <div class="SiteBody">
    <div class="site-item">
      <div class="site-item-line">
        <div class="site-item-line-path">
          {{PageName}}
        </div>
        <div class="site-item-line-button">
          <el-button type="primary" @click="dialogFormVisible = true">添加站点</el-button>
        </div>
      </div>
      <!--站点列表      -->
      <div class="site-item-table">
        <el-table
          :data="this.store.siteData.filter(data => !search || data.siteName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column align="center" label="站点编号" min-width="100" prop="siteNumber"/>
          <el-table-column align="center" label="站点名称" min-width="100">
            <template v-slot="scope">
              <div>{{scope.row.siteName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="站点GPS" min-width="200">
            <template v-slot="scope">
              <div>{{scope.row.siteRange[0]}},{{scope.row.siteRange[1]}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属区域" min-width="200">
            <template v-slot="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" min-width="100" prop="remarks"/>
          <!--搜索          -->
          <el-table-column fixed="right" width="200" align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="medium" placeholder="输入站点名字搜索"/>
            </template>
            <template v-slot="scope">
              <el-button size="medium" type="warning" @click="editSiteData(scope.row.siteNumber)">修改</el-button>&nbsp;&nbsp;&nbsp;
              <el-button size="medium" type="danger" @click="deleteSite(scope.row.siteId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加站点对话框       -->
    <el-dialog title="添加站点" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="区域id">
          <el-select v-model="form.rgId" placeholder="请选择区域">
            <el-option v-for="item in store.regionData" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="站点编号">
          <el-input v-model="form.siteNumber"/>
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input v-model="form.siteName"/>
        </el-form-item>
        <el-form-item label="站点经度">
          <el-input v-model.number="number1" type="number"/>
        </el-form-item>
        <el-form-item label="站点纬度">
          <el-input v-model.number="number2" type="number"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSite()">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改站点信息对话框       -->
    <el-dialog title="修改站点信息" :visible.sync="dialogChangeVisible">
      <el-form ref="form" :model="SiteForm" label-width="80px">
        <el-form-item label="站点编号">
          <el-input v-model="SiteForm.siteNumber" disabled/>
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input v-model="SiteForm.siteName"/>
        </el-form-item>
        <el-form-item label="站点GPS">
          <el-input v-model="SiteForm.siteRange" disabled/>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-input v-model="SiteForm.name" disabled/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="SiteForm.remarks"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSiteData()">保存</el-button>
          <el-button @click="dialogChangeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getSiteServeData,updateSiteServeData,addSiteServeData,deleteSiteServeData} from "@/network/site";
import {store} from "@/store/store";
import qs from "qs";

export default {
  name: 'SiteMana',
  inject:['reload'],
  data () {
    return {
      store,
      PageName: '站点管理',
      dialogFormVisible: false, // 控制添加站点弹窗
      dialogChangeVisible: false, // 控制修改按钮弹窗
      SiteForm: {}, // 存放修改弹窗表单的数据
      SiteData: [], // 存放获取的站点数据，渲染到列表
      search: '',
      defaultProps: {  //用于树形图
        children: 'children',
        label: 'label'
      },
      number1: null,
      number2:null,
      //用于添加站点的表单
      form: {
        name:'',
        siteName:'',
        siteNumber: '',
        siteRange: [],
        rgId: '',
        remarks: '',
      }
    }
  },
  created () {
    this.getSiteDataList()
  },
  beforeUpdate () {

  },
  updated () {

  },
  methods: {
    testSite () {
      console.log(this.SiteForm)
    },

    //发送请求，渲染列表
    getSiteDataList () {
      getSiteServeData().then(res => {
        console.log("res " , res.data)
        this.store.siteData.splice(0)
        this.store.siteData = res.data
        this.getToArray()
      }).catch(err => {
        console.log(err)
      })
    },

    //转换为数组
    getToArray () {
      for (let i = 0; i < this.store.siteData.length; i++) {
        let c = JSON.parse(this.store.siteData[i].siteRange)
        this.store.siteData[i].siteRange = c
      }
    },

    //添加站点
    addSite () {
      console.log(this.number2)
      this.form.siteRange.push(this.number1,this.number2)
      this.form.siteRange = JSON.stringify(this.form.siteRange)
      addSiteServeData(this.form).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogFormVisible = false
    },

    // 修改站点数据
    editSiteData (siteNumber) { // siteNumber 站点编号
      this.dialogChangeVisible = true
      for (let i = 0; i < this.store.siteData.length; i++) {
        if (siteNumber === this.store.siteData[i].siteNumber) {
          const c = JSON.parse(JSON.stringify(this.store.siteData[i]))
          this.SiteForm = c
        }
      }
      this.testSite()
    },

    //保存修改
    submitSiteData () {
      this.SiteForm.siteRange = JSON.stringify(this.SiteForm.siteRange)
      let c = qs.stringify(this.SiteForm)
      updateSiteServeData(c).then(res => {
        console.log(res)
        this.reload()  //放这里，网络请求是异步的，收到服务器反馈后再刷新
      }).catch(err => {
        console.log(err)
      })
      this.dialogChangeVisible = false
    },

    // 删除站点函数
    deleteSite (id) { // id 站点id,stieId
      deleteSiteServeData(id).then(res => {
        console.log('res',res)
        this.reload()
      }).catch(err => {
        console.log('err',err)
      })
    }

  },


}
</script>

<style scoped>
  .SiteBody {
    display: flex;
    width: 100%;
  }

  .site-item {
    width: 100%;
  }

  .site-item-line {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .site-item-line-path {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }

  .site-item-table {
    width: 100%;
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
