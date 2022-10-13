<template>
  <div class="RegManaList">
    <div class="table">
      <el-table :data="RegData" max-height="600" border style="width: 100%">
        <el-table-column align="center" prop="id" label="区域序号" min-width="100"/>
        <el-table-column align="center" prop="name" label="区域名称" min-width="100"/>
        <el-table-column align="center" prop="" label="GPS" width="200" type="expand">
          <template slot-scope="props">
            <div class="gps-list">
              <ul>
                <li v-for="(item) in props.row.area">{{' 范围点：'+item}}</li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="riskLevel" label="风险等级" min-width="100"/>
        <el-table-column align="center" prop="controlLevel" label="管控等级" min-width="100"/>
        <el-table-column align="center" prop="remarks" label="备注" min-width="180"/>
        <el-table-column align="center" label="操作" min-width="180">
          <template v-slot="scope">
            <el-button size="medium" type="warning" @click="editRegData(scope.row.id,scope.row.area)">修改区域</el-button>
            <el-button size="medium" type="danger" @click="deleteRegData(scope.row.id)">删除区域</el-button>
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
import {getCurrentRegionServeData,deleteRegionServeData,updateRegionServeData} from "@/network/region";
import {store} from "@/store/store";
import qs from 'qs'
import bus from "@/components/bus";

export default {
  name: 'RegManaList',
  inject:['reload'],
  data () {
    return {
      store,
      zoom:12,
      area:[],
      RegData: [],
      gpsList:[],
      pageNum:'1',
      pageSize:'10',
      totalCount:0,
      isTrue:true,

    }
  },

  created() {
    //获取区域列表
    this.getRegData()
  },

  methods: {
    //渲染列表
    getRegData () {
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        this.RegData = res.data.rows
        this.store.regionData = res.data.rows
        this.totalCount = res.data.totalCount
        console.log('list',res)
        this.getToArray(this.RegData)
        this.getToArray(this.store.regionData)
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择某一页
    currentChange (val) {
      this.pageNum = val
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.RegData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    // 选择展示的数据条数
    sizeChange (val) {
      this.pageSize = val
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        console.log("res " , res.data)
        this.RegData = res.data.rows
      }).catch(err => {
        console.log(err)
      })
    },

    //将坐标集字符串转换为数组
    getToArray (obj) {
      this.gpsList.splice(0)
      for (let i = 0; i < obj.length; i++) {
        let c = JSON.parse(obj[i].area)
        obj[i].area = c
        console.log(obj[i].area)
        this.gpsList.push(c)
      }
    },

    // 修改区域信息函数
    editRegData (id,index) { //区域id
      console.log(index)
      this.$router.push({
        path:'/RegMana/Map',
        query:{
          id:id,
          index:index
        }
      })
      this.store.showChangeDraw = true
    },


    // 删除区域
    deleteRegData (id) {
      deleteRegionServeData(id).then(res => {
        console.log('delete',res)
        this.reload()
      }).catch(err => {
        console.log('delete',err)
      })
    }
  },
}
</script>

<style scoped>
  .RegManaList {
    width: 100%;
    height: 660px;
  }

  .lsitButton-1 {
    padding-top: 10px;
    margin-left: 10px;
  }

  .gps-list ul li {
    list-style: none;
    margin-left: 20px;
    font-weight: 600;
  }

</style>
