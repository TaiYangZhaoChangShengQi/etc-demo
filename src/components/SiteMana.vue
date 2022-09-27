<template>
  <div class="SiteBody">
    <div class="site-item-2">
      <div class="site-item-2-1">
        <div class="site-item-2-1-2">
          {{PageName}}
        </div>
        <div class="site-item-2-1-1">
          <el-button type="primary" @click="dialogFormVisible = true">添加站点</el-button>
        </div>
      </div>
      <!--站点列表      -->
      <div class="site-item-table">
        <el-table
          :data="SiteData.filter(data => !search || data.siteName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column align="center" label="站点编号" min-width="100" prop="siteNumber"/>
          <el-table-column align="center" label="站点名称" min-width="100">
            <template v-slot="scope">
              <div>{{scope.row.siteName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="站点GPS" min-width="200">
            <template v-slot="scope">
              <div>{{scope.row.siteRange}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属区域" min-width="200">
            <template v-slot="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
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
          <el-input v-model="form.rgId"/>
        </el-form-item>
        <el-form-item label="站点编号">
          <el-input v-model="form.siteNumber"/>
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input v-model="form.siteName"/>
        </el-form-item>
        <el-form-item label="站点GPS">
          <el-input v-model="form.siteRange"/>
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
          <el-input v-model="SiteForm.siteRange"/>
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

export default {
  name: 'SiteMana',
  inject:['reload'],
  data () {
    return {
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
      //用于添加站点的表单
      form: {
        name:'',
        siteName:'',
        siteNumber: '',
        siteRange: '',
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
      console.log('site-test',this.SiteData)
    },

    //发送请求，渲染列表
    getSiteDataList () {
      getSiteServeData().then(res => {
        console.log("res " , res.data)
        this.SiteData.splice(0)
        this.SiteData = res.data
        console.log("site " , this.SiteData)
      }).catch(err => {
        console.log(err)
      })
    },

    //添加站点
    addSite () {
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
      for (let i = 0; i < this.SiteData.length; i++) {
        if (siteNumber === this.SiteData[i].siteNumber) {
          const c = JSON.parse(JSON.stringify(this.SiteData[i]))
          this.SiteForm = c
        }
      }
    },

    //保存修改
    submitSiteData () {
      updateSiteServeData(this.SiteForm).then(res => {
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
  .site-item-1 {
    margin-right: 15px;
    width: 190px;
    height: 650px;
    box-shadow: 0 12px 24px 5px rgba(0, 0, 0, .16);
  }
  .site-item-2 {
    width: 100%;
  }
  .site-item-2-1 {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }
  .site-item-2-1-2 {
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
