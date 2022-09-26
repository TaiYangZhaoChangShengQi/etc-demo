<template>
  <div class="Nav">
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
  .Nav {
    height: 988px;
    width: 150px;
    background-color: #003333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .Nav .nav-left {
    padding-left: 10px;
    padding-top: 50px;
    font-size: 18px;
    font-weight: 200;
    color: white;
  }
  .active {
    color: #2E8CE7;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .router-link-active {
    color: #2E8CE7;
  }
  i {
    margin-right: 20px;
  }
</style>
