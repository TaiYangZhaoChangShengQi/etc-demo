<template>
  <div class="beat-content">
    <div class="beat-line">
      <div class="beat-page">{{pageName}}</div>
      <div class="beat-button">
        <div class="beat-button-input">
          <el-select class="adjustment" clearable style="width: 165px" v-model="searchForm.devId" placeholder="请选择设备类型">
            <el-option v-for="(item) in this.store.deviceAllData" :key="item.id" :label="item.devName" :value="item.devId" @click.native="getQuery"/>
          </el-select>
        </div>
      </div>
    </div>
    <div class="beat-list">
      <el-table
              :data="getOrSearch === 0? beatData:beatSearchData " style="width: 100%" height="540">
        <el-table-column align="center" label="设备ID" min-width="100" prop="devId"/>
        <el-table-column align="center" label="设备名称" min-width="200" prop="devName" sortable/>
        <el-table-column align="center" label="创建时间" min-width="200" prop="createTime"/>
        <el-table-column align="center" label="心跳记录" min-width="200" prop="heartbeatRecord"/>
      </el-table>
      <!-- 分页 -->
      <el-pagination
              layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
              @size-change="sizeChange" @current-change="currentChange" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getCurrentDeviceBeatServeData,searchBeatServeData} from "@/network/beat";
import {store} from "@/store/store";
export default {
  name: "DeviceBeatMana",
  data () {
    return {
      store,
      beatData: [],
      beatSearchData: [],
      getOrSearch:0,
      search:'',
      pageName: '设备心跳',
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      searchForm:{
        currentPage:1,
        pageSize:10,
        devId:'',
      },
    }
  },

  created () {
    this.updateBeatData()
  },

  methods: {
    // 渲染列表
    updateBeatData () {
      getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
        this.beatData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 0
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择某一页
    currentChange (val) {
      if (this.getOrSearch === 0) {
        this.pageNum = val
        getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
          console.log("res " , res.data)
          this.beatData = res.data.rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.currentPage = val
        searchBeatServeData(this.searchForm).then(res => {
          this.beatSearchData = res.data.rows
          this.totalCount = res.data.totalCount
          this.getOrSearch = 1
        }).catch(err => {
          console.log(err)
        })
      }
    },

    // 选择展示的数据条数
    sizeChange (val) {
      if (this.getOrSearch === 0) {
        this.pageSize = val
        getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
          this.beatData = res.data.rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.searchForm.pageSize = val
        searchBeatServeData(this.searchForm).then(res => {
          this.beatSearchData = res.data.rows
          this.getOrSearch = 1
        }).catch(err => {
          console.log(err)
        })
      }
    },

    /**
     * 后端条件搜索
     */
    getQuery () {
      this.searchForm.devId = Number(this.searchForm.devId)
      console.log(typeof this.searchForm.devId)
      searchBeatServeData(this.searchForm).then(res => {
        console.log(res)
        this.beatSearchData = res.data.rows
        this.totalCount = res.data.totalCount
        this.getOrSearch = 1
      }).catch(err => {
        console.log(err)
      })
    },

  }
}
</script>

<style scoped>
  .beat-list {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .beat-line {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .beat-page {
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    color: rgba(0,0,0,.85);
  }
</style>