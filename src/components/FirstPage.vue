<template>
  <div id="app">
    <Home/>
    <div class="content">
      <div class="Nav">
        <Navigation/>
      </div>
      <div class="View">
        <router-view v-if="isRouterAlive"/>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import Navigation from "@/components/Navigation.vue";
import {store} from "@/store/store";

export default {
  name: "FirstPage",
  components: {
    Home,
    Navigation
  },

  provide () {
    return {
      reload: this.reload
    }
  },

  data () {
    return {
      store,
      isRouterAlive:true
    }
  },

  created () {
    this.store.getRegAllData()
    this.store.getSiteAllDataList()
    this.store.getDeviceTypeData()
    this.store.UpDevData()
    this.store.getAllVehicleData()
  },

  methods:{
    //刷新页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.content {
  height: 100%;
}
.Nav {
  width: 150px;
  height: 100%;
  float: left;
}
.View {
  margin-left: 10px;
  padding: 15px 20px;
  overflow: hidden;
  height: 100%;
  border-style: none;
}
</style>
