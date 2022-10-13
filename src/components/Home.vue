<template>
  <div class="B-header">
    <div class="header-left">
      <div class="h1">ETC交通感知大数据平台</div>
      <div class="h5">
        ETC traffic perception big data platform
        蜂格式交通感知、风险分析与应急管理平台
      </div>
    </div>
    <div class="header-right">
      <div class="h2 padding">深圳信息职业技术学院区块链应用技术创新中心</div>
      <div class="h2">广东省教育厅车路协同数据安全关键技术及拓展应用研发产教融合创新平台</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
 .B-header {
   display: flex;
   justify-content:space-between;
   width: auto;
   height: 55px;
   background-color: #252B48;
   padding-top: 1px;
   padding-left: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
 }

 .B-header .h1 {
   padding-top: 2px;
   font-size: 28px;
   font-family: "楷体","Microsoft YaHei", "微软雅黑", Arial, sans-serif;
   color: #FFFFCC;
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
</style>
