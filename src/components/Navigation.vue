<template>
  <div class="nav-content">
    <div class="nav-left" :data-mytype=1 @click="clickNum($event)">
      <i class="el-icon-location" :class="isActive==='1'?'active':'{}'"/>
      <router-link to="/RegMana">区域管理</router-link>
    </div>
    <div class="nav-left" :data-mytype=2 @click="clickNum($event)">
      <i class="el-icon-location" :class="isActive==='2'?'active':'{}'"/>
      <router-link to="/SiteMana">站点管理</router-link>
    </div>
    <div class="nav-left" :data-mytype=3 @click="clickNum($event)">
      <i class="el-icon-s-platform" :class="isActive==='3'?'active':'{}'"/>
      <router-link to="/DeviceMana">设备管理</router-link>
    </div>
    <div class="nav-left" :data-mytype=4 @click="clickNum($event)">
      <i class="el-icon-upload" :class="isActive==='4'?'active':'{}'"/>
      <router-link to="/CarInfoRecord">车辆信息</router-link>
    </div>
    <div class="nav-left" :data-mytype=5 @click="clickNum($event)">
      <i class="el-icon-upload" :class="isActive==='5'?'active':'{}'"/>
      <router-link to="/DeviceBeatMana">设备心跳</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isActive:1,
    }
  },
  methods: {
    clickNum(event) {
      this.isActive = event.currentTarget.getAttribute("data-mytype")
    }
  }
}
</script>

<style>
  .nav-content {
    width: 150px;
    height: 900px;
    background-color: rgba(0,0,0,0);
    box-shadow: 0 2px 4px rgba(0,0 ,0 , .15);
  }
  .nav-content .nav-left {
    padding-left: 10px;
    padding-top: 50px;
    font-size: 16px;
    font-weight: 200;
    color: rgba(0,0,0,.85);
  }
  .active {
    color: #2E8CE7;
  }
  a {
    text-decoration: none;
    color: rgba(0,0,0,.85);;
  }
  .router-link-active {
    color: #2E8CE7;
  }
  i {
    margin-right: 20px;
  }
</style>
