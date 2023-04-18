<template>
  <div class="B-header">
    <div class="header-left">
      <div class="h1">网格式车辆轨迹数据平台</div>
    </div>
    <div class="header-right">
      <div class="item-back" @click="ifUnLogin">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: 'Home',
  data () {
    return {
      store
    }
  },
  methods: {
    /**
     * 询问是否退出登录
     */
    ifUnLogin() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出登录!'
        })
        this.unLogin()
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '取消退出!'
        })
      })
    },

    /**
     * 退出登录
     */
    unLogin() {
      console.log("unLogin")
      localStorage.setItem('isLoggedIn', 'false')
      location.reload()
    }
  }
}
</script>

<style scoped>
 .B-header {
   display: flex;
   justify-content:space-between;
   width: auto;
   height: 55px;
   background-color: #222222;
   border-bottom: 1px solid rgba(255, 255, 255, 0.4);
   box-shadow: 0 2px 2px rgba(0, 0, 0, .12), 0 0 4px rgba(0, 0, 0, .04);
   /*box-shadow:*/
   /*    0px 1px 3px rgba(0, 0, 0, .12),*/
   /*    0px 1px 2px rgba(0, 0, 0, .24);*/
 }


 .B-header .h1 {
   padding-top: 10px;
   font-size: 32px;
   font-family: "楷体","Microsoft YaHei", "微软雅黑", Arial, sans-serif;
   color: wheat;

 }

 .B-header .h2 {
   padding-top: 3px;
   font-size: 20px;
   font-family: "楷体","Microsoft YaHei", "微软雅黑", Arial, sans-serif;
   color: #FFFFCC;
 }

 .padding {
   text-align: right;
   padding-right: 5px;
 }

 .B-header .h5 {
   color: #FFFFCC;
   padding-left: 1px;
   font-size: 12px;
   font-weight: 600;
   font-family: Arial, sans-serif;
 }

 .header-right .item-back {
   line-height: 55px;
   padding-right: 30px;
   color: antiquewhite;
   font-family: Arial,"宋体";
   font-weight: bolder;
   font-size: 14px;
   cursor: pointer;
 }
 .header-right .item-back:hover {
   color: green;

 }
</style>
