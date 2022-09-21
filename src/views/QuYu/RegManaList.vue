<template>
    <div class="RegManaList">
      <div class="lsitButton-1">

      </div>
      <div class="lsit-lsit">
        <el-table
            :data="RegData"
            max-height="600"
            border
            style="width: 100%">
          <el-table-column
              align="center"
              prop="num"
              label="编号"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="label"
              label="名称"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="GPS"
              label="GPS">
          </el-table-column>
          <el-table-column
              align="center"
              prop="info"
              label="备注">
          </el-table-column>
          <el-table-column
              align="center"
              label="操作">
              <template v-slot="scope">
                <el-button type="warning" @click="ChangeReg(scope.row.num)">修改区域</el-button>
                <el-button type="danger" @click="deleteReg(scope.row.num)">删除区域</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>

<!--    修改区域对话框      -->
      <el-dialog title="修改区域信息" :visible.sync="dialogRegVisible">
          <el-form ref="form" :model="RegForm" label-width="80px">
              <el-form-item label="区域编号">
                  <el-input v-model="RegForm.num" disabled></el-input>
              </el-form-item>
              <el-form-item label="区域名称">
                  <el-input v-model="RegForm.label"></el-input>
              </el-form-item>
              <el-form-item label="区域GPS">
                  <el-input v-model="RegForm.GPS"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input v-model="RegForm.info"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="RegBaoCun(RegForm.num)">保存</el-button>
                  <el-button @click="dialogChangeVisible = false">取消</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

    </div>
</template>

<script>
import { store } from '@/store/store'

export default {
  name: 'RegManaList',
  data () {
    return {
      store,
      RegForm: {},
      dialogRegVisible: false,
      RegData: []
    }
  },
  methods: {
    // 赋值
    upRegData () {
      this.RegData.splice(0)
      const c = JSON.parse(JSON.stringify(this.store.data))
      this.RegData = c
    },
    // 修改区域信息函数
    ChangeReg (num) {
      this.dialogRegVisible = true
      num = Number(num)
      const c = JSON.parse(JSON.stringify(this.store.data[num - 1]))
      this.RegForm = c
    },
    // 保存修改函数
    RegBaoCun (num) {
      this.store.addReg(num, this.RegForm)
      this.dialogRegVisible = false
      this.upRegData()
    },
    // 删除区域
    deleteReg (num) {
      this.store.deleteRegData(num)
      this.upRegData()
    }
  },
  created () {
    this.upRegData()
  }

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
</style>
