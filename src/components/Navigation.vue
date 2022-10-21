<template>
  <div class="nav-content">
    <el-menu :default-active="isActivePath" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/RegMana" class="pad">
        <i class="el-icon-location"></i>
        <span slot="title">区域管理</span>
      </el-menu-item>
      <el-menu-item index="/SiteMana" class="pad">
        <i class="el-icon-location"></i>
        <span slot="title">站点管理</span>
      </el-menu-item>
      <el-submenu index="/DeviceMana" class="pad">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/DeviceMana">设备列表</el-menu-item>
          <el-menu-item index="DeviceTypeMana">设备类型</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/CarInfoRecord" class="pad">
        <template slot="title">
          <i class="el-icon-upload"></i>
          <span>车辆信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/CarInfoRecord">车辆信息</el-menu-item>
          <el-menu-item index="/vehicleMap">地图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/DeviceBeatMana" class="pad">
        <i class="el-icon-upload"></i>
        <span slot="title">设备心跳</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isActive:1,
      isActivePath:'',
    }
  },

  created() {
    this.activePath()
  },

  methods: {
    /**
     * 获取活跃路径
     */
    activePath () {
      this.isActivePath = this.$router.history.current.path
    }
  },
}
</script>

<style>
  .nav-content {
    width: 150px;
    height: 900px;
    background-color: rgba(0,0,0,0);
    box-shadow: 0 2px 4px rgba(0,0 ,0 , .15);
  }
  .nav-content .nav-route {
    padding-left: 10px;
    padding-top: 50px;
    font-size: 16px;
    font-weight: 200;
    color: rgba(0,0,0,.85);
  }

  .el-submenu .el-menu-item {
    min-width: 150px;
  }

  .el-submenu__title,.el-menu-item {
    font-size: 16px;
    font-weight: 400;
  }

  .el-submenu__icon-arrow {
    margin-top: -4px;
    margin-right: -10px;
  }

  .pad {
    margin-top: 20px;
    font-family: "NSimSun", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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

  .el-menu-vertical-demo {
    border-right: solid 1px #ffffff;
  }
</style>
