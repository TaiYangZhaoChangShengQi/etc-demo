<template>
  <div class="reg-body">
    <div class="reg-body-total">
      <div class="reg-body-item-select">
        <el-select v-model="value1" placeholder="请选择区域" :disabled="select">
          <el-option v-for="(item,index) in this.store.regionData" :key="item.id" :label="item.name" :value="item.id" @click.native="showRegional(index)"/>
        </el-select>
      </div>
      <div class="Rebody-item-click">
        <div class="Rebody-item-button">
          <el-button type="primary" @click="addRegion" :disabled="select">添加区域</el-button>
        </div>
        <div class="Rebody-item-button">
          <el-button type="success" @click="clickRegManaList">列表视图</el-button>
        </div>
        <div class="Rebody-item-button">
          <el-button type="success" @click="clickMap">Map视图</el-button>
        </div>
      </div>
    </div>
    <!-- 显示子组件，地图或列表 -->
    <div class="routerStyle">
      <router-view ref="child"></router-view>
    </div>
    <!-- 绘制覆盖物 -->
    <div class="draw" v-show="showDraw">
      <el-row>
        <el-button size="medium" type="primary" @click="cancelDraw">取消</el-button>
        <el-button size="medium" type="primary" @click="submitDrawPath">完成绘制</el-button>
      </el-row>
    </div>
    <!-- 添加区域对话框 -->
    <el-dialog title="添加区域信息" :visible.sync="dialogAddRegVisible">
      <el-form ref="form" :model="addRegForm" label-width="80px">
        <el-form-item label="区域名称">
          <el-input v-model="addRegForm.name"/>
        </el-form-item>
        <el-form-item label="风险等级">
          <el-select v-model="addRegForm.riskLevel" placeholder="请选择风险等级">
            <el-option v-for="item in riskLevelOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="管控等级">
          <el-select v-model="addRegForm.controlLevel" placeholder="请选择管控等级">
            <el-option v-for="item in controlLevelOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addRegForm.remarks"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRegionToServe">保存</el-button>
          <el-button @click="dialogAddRegVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Map from '@/views/QuYu/Map'
import { store } from '@/store/store'
import RegManaList from '@/views/QuYu/RegManaList'
import {getCurrentRegionServeData,addRegionServeData} from "@/network/region";
import qs from "qs";

// 区域管理
export default {
  name: 'RegionalMana',
  inject:['reload'],
  components: {
    Map,
    RegManaList
  },
  data () {
    return {
      store,
      select:false, // 可用或禁用开关
      value1: '',
      pageNum: '1',
      pageSize:'10',
      showDraw:false,
      regionData:[],
      pageName: '区域管理',
      dialogAddRegVisible: false,
      riskLevelOptions: [
        {
          value: '无风险',
          label: '无风险'
        },
        {
        value: '低风险',
        label: '低风险'
        },
        {
        value: '中风险',
        label: '中风险'
        },
        {
        value: '高风险',
        label: '高风险'
        }
      ],
      controlLevelOptions: [
        {
        value: '无',
        label: '无'
        },
        {
        value: '防范',
        label: '防范'
        },
        {
          value: '管控',
          label: '管控'
        },
        {
          value: '封控',
          label: '封控'
        }
      ],
      addRegForm: {
        name: '',
        area: [],
        riskLevel:'',
        controlLevel:'',
        remarks: '',
        zoom:15,
      },
    }
  },

  created() {
    this.getRegionData()

  },

  mounted() {
    this.decideSelect()
  },

  methods: {
    clickMap () {
      this.$router.push('/RegMana/Map')
      this.select = false
    },
    clickRegManaList () {
      this.$router.push('/RegMana/RegManaList')
      this.select = true
    },

    // 防止区域页面刷新后使区域选择框可用
    decideSelect () {
      if (this.$router.history.current.path === '/RegMana/RegManaList') {
        this.select = true
      }
    },

    // 列表
    getRegionData () {
      getCurrentRegionServeData(this.pageNum,this.pageSize).then(res => {
        console.log('cs',res)
        this.store.regionData = res.data.rows
        this.getToArray()
      }).catch(err => {
        console.log(err)
      })
    },

    // 转换为数组
    getToArray () {
      for (let i = 0; i < this.store.regionData.length; i++) {
        let c = JSON.parse(this.store.regionData[i].area)
        this.store.regionData[i].area = c
      }
    },

    // 添加区域
    addRegion () {
      this.showDraw = true
      this.addRegForm.area = this.$refs.child.drawPolygon()
    },

    // 保存绘制的覆盖物的坐标数据
    submitDrawPath () {
      this.showDraw = false
      this.dialogAddRegVisible = true // 打开填写窗口
    },

    // 添加到服务器
    addRegionToServe () {
      addRegionServeData(this.addRegForm).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
        alert('错误：'+ err.code)
      })
      this.dialogFormVisible = false
    },

    // 显示指定区域的范围以及站点位置
    showRegional (num) {
      let num1 = Number(num)
      this.$refs.child.addPolygonToMap(num1)
    },

    // 取消画图
    cancelDraw () {
      this.reload()
    },
  }
}
</script>

<style scoped>
  .reg-body-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .reg-body-item-select {
    width: 150px;
  }

  .Rebody-item-button {
    width: 100px;

  }

  .Rebody-item-click {
    display: flex;
    justify-content: flex-end;
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .draw {
    position: absolute;
    top: 150px;
    left: 200px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    height: 45px;
    width: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
