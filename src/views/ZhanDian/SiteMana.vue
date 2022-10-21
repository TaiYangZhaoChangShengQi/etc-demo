<template>
  <div class="SiteBody">
    <div class="site-item">
      <div class="site-item-line">
        <div class="site-item-line-path">
          {{PageName}}
        </div>
        <div class="site-item-line-button">
          <div class="site-item-line-button-input">
            <el-select class="adjustment" clearable style="width: 150px" v-model="searchForm.name" placeholder="请选择区域">
              <el-option v-for="(item,index) in this.store.regionAllData" :key="item.id" :label="item.name" :value="item.name"/>
            </el-select>
            <el-input class="input-style" clearable v-model="searchForm.siteName" size="medium" placeholder="请输入站点名称"/>
            <el-input class="input-style" clearable v-model="searchForm.siteNumber" size="medium" placeholder="请输入站点编号"/>
            <el-button class="add-margin" type="primary" icon="el-icon-search" @click="getQuery">搜索</el-button>
            <el-button style="width: 80px" type="primary" @click="getSiteDataList">重置</el-button>
          </div>
          <el-button type="primary" @click="clickAddSite">添加站点</el-button>
        </div>
      </div>
      <!-- 站点列表 -->
      <div class="site-item-table">
        <el-table
          :data="getOrSearch === 0? this.store.siteData:siteSearchData"
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
          <!-- 搜索 -->
          <el-table-column fixed="right" width="200" align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="medium" clearable @clear='getSiteDataList' @input="getSearch" placeholder="请输入关键字"/>
            </template>
            <template v-slot="scope">
              <el-button size="medium" type="warning" @click="editSiteData(scope.row.siteId)">修改</el-button>&nbsp;&nbsp;&nbsp;
              <el-button size="medium" type="danger" @click="deleteSite(scope.row.siteId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
                @size-change="sizeChange" @current-change="currentChange" :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <!-- 添加站点对话框 -->
    <el-dialog title="添加站点" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="区域id" prop="rgId">
          <el-select v-model="form.rgId" placeholder="请选择区域">
            <el-option v-for="item in store.regionAllData" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="站点编号" prop="siteNumber">
          <el-input v-model="form.siteNumber"/>
        </el-form-item>
        <el-form-item label="站点名称" prop="siteName">
          <el-input v-model="form.siteName"/>
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
    <!-- 修改站点信息对话框 -->
    <el-dialog title="修改站点信息" :visible.sync="dialogChangeVisible">
      <el-form ref="form" :model="SiteForm" label-width="80px">
        <el-form-item label="站点编号">
          <el-input v-model="SiteForm.siteNumber" />
        </el-form-item>
        <el-form-item label="站点名称">
          <el-input v-model="SiteForm.siteName"/>
        </el-form-item>
        <el-form-item label="站点GPS">
          <el-input v-model="SiteForm.siteRange" disabled/>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-input v-model="SiteForm.name" />
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
import {
  getCurrentSiteServeData,
  updateSiteServeData,
  addSiteServeData,
  deleteSiteServeData,
  searchSiteServeData} from "@/network/site";
import {store} from "@/store/store";
import qs from "qs";

export default {
  name: 'SiteMana',
  inject:['reload'],
  data () {
    return {
      store,
      search: '',
      getOrSearch:0,
      siteSearchData:[],
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      number1: null, // 存经度
      number2: null,  // 存纬度
      PageName: '站点管理',
      SiteForm: {}, // 存放修改弹窗表单的数据
      SiteData: [], // 存放获取的站点数据，渲染到列表
      dialogFormVisible: false, // 控制添加站点弹窗
      dialogChangeVisible: false, // 控制修改按钮弹窗
      searchForm:{
        currentPage:1,
        pageSize:10,
        name:'',
        siteName:'',
        siteNumber:'',
      },
      rules:{
        rgId:[
          {required: true,message: '请选择活动区域',trigger: 'change'}
        ],
        siteNumber:[
          {required: true,message: '请输入站点编号',trigger: 'blur'}
        ],
        siteName: [
          {required: true,message: '请输入站点名称',trigger: 'blur'}
        ],
      },
      // 用于添加站点的表单
      form: {
        name: '',
        siteName: '',
        siteNumber: '',
        siteRange: [],
        rgId: '',
        remarks: '',
      },
      defaultProps: {  // 用于树形图
        children: 'children',
        label: 'label'
      },
    }
  },

  mounted () {
    if (this.$route.params.order === '返回站点列表') {
      console.log('gps1',this.store.gps)
      console.log(this.$route.params.order)
      this.openAddForm()
    }

    if (this.$route.params.siteID >= 0) {
      let c = Number(this.$route.params.siteID)
      this.openChangeForm(c)

    }

  },

  created () {
    this.getSiteDataList()
  },

  methods: {
    testSite () {
      console.log(this.SiteForm)
    },

    /**
     * 获取站点列表
     */
    getSiteDataList () {
      getCurrentSiteServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res1" , res.data.rows)
        this.store.siteData.splice(0)
        this.store.siteData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 0
        this.getToArray(this.store.siteData)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 将字符串类型的经纬度数据转换为数组类型
     * @param obj 对象数组
     */
    getToArray (obj) {
      for (let i = 0; i < obj.length; i++) {
        let c = JSON.parse(obj[i].siteRange)
        obj[i].siteRange = c
      }
    },

    /**
     * 选择某一页
     * @param val - 页码
     */
    currentChange (val) {
      if (this.getOrSearch === 0) {
        this.pageNum = val
        getCurrentSiteServeData(this.pageNum,this.pageSize).then(res => {
          this.store.siteData.splice(0)
          this.store.siteData = res.data.rows
          this.getToArray()
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
     * @param val - 一页展示的数据条数
     */
    sizeChange (val) {
      if (this.getOrSearch === 0) {
        this.pageSize = val
        getCurrentSiteServeData(this.pageNum,this.pageSize).then(res => {
          console.log("res " , res.data)
          this.store.siteData.splice(0)
          this.store.siteData = res.data.rows
          this.getToArray()
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.pageSize = val
        this.getQuery()
      }
    },

    /**
     * 添加站点
     * this.dialogFormVisible - 用于打开
     */
    clickAddSite () {
      this.$router.push({
        path:'/siteMap',
        query:{
          order:'添加站点',
        }
      })
    },

    /**
     * 打开添加站点表单
     */
    openAddForm () {
      this.dialogFormVisible = true
    },

    /**
     * 将新建的站点发送到服务器保存
     */
    addSite () {
      this.form.siteRange = this.store.gps
      console.log('siteRange', this.form.siteRange)
      this.form.siteRange = JSON.stringify(this.form.siteRange)
      addSiteServeData(this.form).then(res => {
        console.log(res)
        window.location.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogFormVisible = false
    },

    /**
     * 修改站点数据
     * @param  siteId - 站点id
     */
    editSiteData (siteId) {
      console.log('st',siteId)
      console.log(typeof siteId)
      this.$router.push({
        path:'/siteMap',
          query:{
            siteId:siteId,
          }
      })
    },

    /**
     * 打开修改站点表单
     */
    openChangeForm (siteId) {
      this.dialogChangeVisible = true
      for (let i = 0; i < this.store.siteData.length; i++) {
        if (siteId === this.store.siteData[i].siteId) {
          const c = JSON.parse(JSON.stringify(this.store.siteData[i]))
          this.SiteForm = c
          console.log(this.SiteForm)
        }
      }
    },

    /**
     *保存修改
     */
    submitSiteData () {
      this.SiteForm.siteRange = JSON.stringify(this.SiteForm.siteRange)
      let c = qs.stringify(this.SiteForm)
      updateSiteServeData(c).then(res => {
        console.log(res)
        window.location.reload()  // 放这里，网络请求是异步的，收到服务器反馈后再刷新
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
    },

    /**
     * 关键字搜索
     */
    getSearch () {
      let keyWord = this.search.toLowerCase()
      let arr = []
      //输入内容为空时返回原数据
      if (keyWord === '') {
        this.getSiteDataList()
      }
      arr = this.store.siteData.filter(item => {
        if (item.siteNumber.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }else if (item.siteName.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }else if (item.name.toLowerCase().indexOf(keyWord) !== -1) {
          return item
        }
      })
      this.totalCount = arr.length
      this.store.siteData = arr
    },

    /**
     * 后端条件搜索
     */
    getQuery () {
      searchSiteServeData(this.searchForm).then(res => {
        this.siteSearchData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getToArray(this.siteSearchData)
        this.getOrSearch = 1
      }).catch(err => {
        console.log(err)
      })
    },

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

  .site-item-line-button {
    display: flex;
    justify-content: space-between;
  }

  .el-button--primary /deep/ .el-icon-search {
    margin-right: 5px;
  }

  .site-item-line-button-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    margin-right: 50px;
  }

  .input-style {
    padding-top: 3px;
    width: 150px;
  }

  .add-margin {
    margin-left: 10px;
  }

  .site-item-table {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .adjustment {
    margin-top: 4px;
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
