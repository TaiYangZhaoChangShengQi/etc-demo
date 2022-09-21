<template>
    <div class="Nav">
      <div class="nav-left">
        <i class="el-icon-location"></i>&nbsp;
        <router-link to="/RegMana">区域管理</router-link>
      </div>
      <div class="nav-left">
        <i class="el-icon-location"></i>&nbsp;
        <router-link to="/SiteMana">站点管理</router-link>
      </div>
      <div class="nav-left">
        <i class="el-icon-s-platform"></i>&nbsp;
        <router-link to="/DeviceMana">设备管理</router-link>
      </div>
      <div class="nav-left">
        <i class="el-icon-upload"></i>&nbsp;
        <router-link to="/CarInfoRecord">车辆信息记录</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {}
}
</script>

<style scoped>
.Nav {
  height: 988px;
  width: 150px;
  background-color:#3A3838;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.Nav .nav-left {
  padding-left: 5px;
  padding-top: 50px;
  font-size: 18px;
  color: white;
}

a {
    text-decoration: none;
    color: white;
}

</style>
