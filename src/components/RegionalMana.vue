<template>
  <div class="reg-body">
    <div class="reg-body-total">
      <div class="reg-body-item-select">
        <el-select v-model="value1" placeholder="请选择区域" :disabled="!ss">
          <el-option v-for="(item,index) in this.store.regionData" :key="item.id" :label="item.name" :value="item.id" @click.native="showRegional(index)"/>
        </el-select>
      </div>
      <div class="Rebody-item-click">
        <div class="Rebody-item-button">
          <el-button type="primary" @click="addRegion" :disabled="!ss">添加区域</el-button>
        </div>
        <div class="Rebody-item-button">
          <el-button type="success" @click="clickRegManaList">列表视图</el-button>
        </div>
        <div class="Rebody-item-button">
          <el-button type="success" @click="clickMap">Map视图</el-button>
        </div>
      </div>
    </div>
    <!--显示子组件，地图或列表    -->
    <div class="routerStyle">
      <router-view ref="child"></router-view>
    </div>
    <!--绘制覆盖物    -->
    <div class="draw" v-show="showDraw">
      <el-row>
        <el-button size="medium" type="primary" @click="cancelDraw">取消</el-button>
        <el-button size="medium" type="primary" @click="submitDrawPath">完成绘制</el-button>
      </el-row>
    </div>
    <!--    添加区域对话框    -->
    <el-dialog title="添加区域信息" :visible.sync="dialogAddRegVisible">
      <el-form ref="form" :model="addRegForm" label-width="80px">
        <el-form-item label="区域名称">
          <el-input v-model="addRegForm.name"/>
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
import {getRegionServeData,addRegionServeData} from "@/network/region";


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
      showDraw:false,
      regionData:[],
      value1: '',
      ss: true, //可用或禁用开关
      pageName: '区域管理',
      addRegForm: {
        name: '',
        area: [],
        remarks: '',
      },
      dialogAddRegVisible: false
    }
  },

  created() {
    this.getRegionData()
  },

  methods: {
    clickMap () {
      this.$router.push('/RegMana/Map')
      this.ss = true
    },
    clickRegManaList () {
      this.$router.push('/RegMana/RegManaList')
      this.ss = false
    },

    //列表
    getRegionData () {
      getRegionServeData().then(res => {
        console.log(res)
        this.store.regionData = res.data
        this.getToArray()
      }).catch(err => {
        console.log(err)
      })
    },

    //转换为数组
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

    //保存绘制的覆盖物的坐标数据
    submitDrawPath () {
      this.showDraw = false
      this.dialogAddRegVisible = true //打开填写窗口
    },

    //添加到服务器
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

    //显示指定区域的范围以及站点位置
    showRegional (num) {
      console.log(num)
      let num1 = Number(num)
      this.$refs.child.addPolygonToMap(num1)
    },

    //取消画图
    cancelDraw () {
      this.reload()
    }
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
