<template>
  <div class="RegManaList">
    <div class="table">
      <el-table :data="this.store.regionData" max-height="600" border style="width: 100%">
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
            <el-button size="medium" type="warning" @click="editRegData(scope.row.id)">修改区域</el-button>
            <el-button size="medium" type="danger" @click="deleteRegData(scope.row.id)">删除区域</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
              layout="total, sizes, prev, pager, next, jumper" style="text-align: center;"
              @size-change="sizeChange" @current-change="currentChange" :total="regionTotalCount">
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
      regionTotalCount:0,
      pageNum:'1',
      pageSize:'10',
      isTrue:true,

    }
  },

  created () {
    this.getRegData()
  },
  methods: {
    /**
     * 获取区域列表
     */
    getRegData () {
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        this.store.regionData = res.data.rows
        this.regionTotalCount = res.data.totalCount
        this.getToArray(this.store.regionData)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 将字符串类型的经纬度数据转换为数组类型
     * @param obj 数组
     */
    getToArray (obj) {
      for (let i = 0; i < obj.length; i++) {
        let c = JSON.parse(obj[i].area)
        obj[i].area = c
      }
    },

    /**
     * 选择某一页
     * @param val 页码
     */
    currentChange (val) {
      this.pageNum = val
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        this.store.regionData = res.data.rows
        this.getToArray(this.store.regionData)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 选择展示的数据条数
     * @param val 一页展示的数据条数
     */
    sizeChange (val) {
      this.pageSize = val
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        this.store.regionData = res.data.rows
        this.getToArray(this.store.regionData)
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 修改区域信息函数
     * @param id 区域id
     */
    editRegData (id) {
      this.$router.push({
        path:'/RegMana/Map',
        query:{
          id:id,
        }
      })
    },

    /**
     * 删除区域
     * @param id 区域id
     */
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
