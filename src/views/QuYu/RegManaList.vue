<template>
  <div class="RegManaList">
    <div class="lsitButton-1"/>
    <div class="lsit-lsit">
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
        <el-table-column align="center" prop="remarks" label="备注" min-width="180"/>
        <el-table-column align="center" label="操作" min-width="180">
          <template v-slot="scope">
            <el-button size="medium" type="warning" @click="editRegData(scope.row.id)">修改区域</el-button>
            <el-button size="medium" type="danger" @click="deleteReg(scope.row.id)">删除区域</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    修改区域对话框      -->
    <el-dialog title="修改区域信息" :visible.sync="dialogRegVisible">
      <el-form ref="form" :model="RegForm" label-width="80px">
        <el-form-item label="区域编号">
          <el-input v-model="RegForm.id" disabled/>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="RegForm.name"/>
        </el-form-item>
        <el-form-item label="区域GPS">
          <el-input v-model="RegForm.area"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="RegForm.remarks"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">保存</el-button>
          <el-button @click="dialogChangeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getRegionServeData} from "@/network/region";
import {store} from "@/store/store";

export default {
  name: 'RegManaList',
  data () {
    return {
      store,
      RegData: [],
      RegForm: {},
      gpsList:[],
      dialogRegVisible: false,
    }
  },
  created() {
    //获取区域列表
    this.getRegData()
  },
  methods: {
    //渲染列表
    getRegData () {
      getRegionServeData().then(res => {
        console.log('res',res)
        this.RegData = res.data
        this.getToArray()
        console.log(typeof res.data[1].area)
      }).catch(err => {
        console.log(err)
      })
    },

    //将坐标集字符串转换为数组
    getToArray () {
      this.gpsList.splice(0)
      for (let i = 0; i < this.RegData.length; i++) {
        let c = JSON.parse(this.RegData[i].area)
        this.RegData[i].area = c
        this.gpsList.push(c)
      }
    },

    // 修改区域信息函数
    editRegData (id) { //区域id
      this.dialogRegVisible = true
      for (let i = 0; i < this.RegData.length; i++) {
        if (id === this.RegData[i].id) {
          let c = JSON.parse(JSON.stringify(this.RegData[i]))
          // c.area = JSON.stringify(c.area)
          this.RegForm = c
        }
      }
    },

    //TODO
    // // 保存修改函数
    // RegBaoCun (num) {
    //   this.store.addReg(num, this.RegForm)
    //   this.dialogRegVisible = false
    //   this.upRegData()
    // },
    // // 删除区域
    // deleteReg (num) {
    //   this.store.deleteRegData(num)
    //   this.upRegData()
    // }
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
