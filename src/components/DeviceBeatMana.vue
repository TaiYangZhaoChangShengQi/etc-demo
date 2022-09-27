<template>
  <div class="beat-content">
    <div class="beat-list">
      <el-table
              :data="beatData.filter(data => !search || beatData.LicensePlate.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
        <el-table-column align="center" label="设备ID" min-width="100" prop="devId"/>
        <el-table-column align="center" label="设备名称" min-width="200" prop="devName" sortable/>
        <el-table-column align="center" label="心跳记录" min-width="200" prop="heartbeatRecord"/>
        <!--判断在线与否        -->
        <el-table-column align="center" label="状态" min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.heartbeatRecord">在线</div>
            <div v-else>离线</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getDeviceBeatServeData} from "@/network/beat";


export default {
  name: "DeviceBeatMana",
  data () {
    return {
      beatData: [],
      search:'',
    }
  },

  created () {
    this.updateBeatData()
  },

  methods: {
    //渲染列表
    updateBeatData () {
      getDeviceBeatServeData().then(res => {
        console.log("res ", res.data)
        this.beatData = res.data
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
</style>