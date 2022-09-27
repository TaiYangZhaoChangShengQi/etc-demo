<template>
  <div class="Rebody">
    <div class="rebody-total">
      <div class="Rebody-item-l">
        <el-select v-model="value1" placeholder="请选择区域" :disabled="!ss">
          <el-option v-for="item in this.store.regionData" :key="item.id" :label="item.name" :value="item.id" @click.native="showRegional(item.id)"/>
        </el-select>
      </div>
      <div class="Rebody-item-R">
        <div class="Rebody-item">
          <el-button type="primary" @click="dialogAddRegVisible = true" :disabled="ss">添加区域</el-button>
        </div>
        <div class="Rebody-item">
          <el-button type="success" @click="clickRegManaList">列表视图</el-button>
        </div>
        <div class="Rebody-item">
          <el-button type="success" @click="clickMap">Map视图</el-button>
        </div>
      </div>
    </div>
    <div class="routerStyle">
      <router-view ref="child"></router-view>
    </div>
    <!--    添加区域对话框    -->
    <el-dialog title="添加区域信息" :visible.sync="dialogAddRegVisible">
      <el-form ref="form" :model="addRegForm" label-width="80px">
        <el-form-item label="区域编号">
          <el-input v-model="addRegForm.num"/>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="addRegForm.label"/>
        </el-form-item>
        <el-form-item label="区域GPS">
          <el-input v-model="addRegForm.GPS"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addRegForm.info"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addListReg()">保存</el-button>
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
import {getRegionServeData} from "@/network/region";


// 区域管理
export default {
  name: 'RegionalMana',
  components: {
    Map,
    RegManaList
  },
  data () {
    return {
      store,
      regionData:[],
      value1: '',
      ss: true, //可用或禁用开关
      pageName: '区域管理',
      addRegForm: {
        label: '',
        num: '',
        GPS: '',
        info: '',
        children: []
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
        console.log('DATA', this.store.regionData)
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

    //TODO
    // // 添加区域
    // addListReg () {
    //   this.store.TrueAddReg(this.addRegForm)
    //   this.dialogAddRegVisible = false
    //   this.$refs.child.upRegData()
    // },

    //显示指定区域的范围以及站点位置
    showRegional (num) {
      let num1 = Number(num) - 1
      this.$refs.child.addPolygonToMap(num1)
    }
  }
}
</script>

<style scoped>
  .rebody-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .Rebody-item-l {
    width: 150px;
  }
  .Rebody-item {
    width: 100px;

  }
  .Rebody-item-R {
    display: flex;
    justify-content: flex-end;
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>
