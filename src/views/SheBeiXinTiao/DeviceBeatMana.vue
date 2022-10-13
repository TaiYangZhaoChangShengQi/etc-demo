<template>
  <div class="beat-content">
    <div class="beat-list">
      <el-table
              :data="beatData"
              style="width: 100%">
        <el-table-column align="center" label="设备ID" min-width="100" prop="devId"/>
        <el-table-column align="center" label="设备名称" min-width="200" prop="devName" sortable/>
        <el-table-column align="center" label="创建时间" min-width="200" prop="createTime"/>
        <el-table-column align="center" label="心跳记录" min-width="200" prop="heartbeatRecord"/>
        <!-- 判断在线与否 -->
        <el-table-column align="center" label="状态" min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.heartbeatRecord">在线</div>
            <div v-else>离线</div>
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
</template>

<script>
import {getCurrentDeviceBeatServeData} from "@/network/beat";

export default {
  name: "DeviceBeatMana",
  data () {
    return {
      beatData: [],
      search:'',
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
    }
  },

  created () {
    this.updateBeatData()
  },

  methods: {
    // 渲染列表
    updateBeatData () {
      getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res ", res.data)
        this.beatData = res.data.rows
        this.totalCount = res.data.totalCount
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择某一页
    currentChange (val) {
      this.pageNum = val
      getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.beatData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择展示的数据条数
    sizeChange (val) {
      this.pageSize = val
      getCurrentDeviceBeatServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.beatData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .beat-list {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>