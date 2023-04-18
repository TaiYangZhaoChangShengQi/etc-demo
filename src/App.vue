<template>
  <div id="app">
    <login v-if="!isLoggedIn" @loginSuccess="onLoginSuccess"/>
    <FirstPage v-else/>
  </div>
</template>

<script>
import Home from './components/Home'
import Navigation from '@/components/Navigation'
import {store} from "@/store/store";
import login from "@/components/login.vue";
import FirstPage from "@/components/FirstPage.vue";

export default {
  name: 'App',
  components: {
    Home,
    Navigation,
    login,
    FirstPage
  },

  provide () {
    return {
      reload: this.reload
    }
  },

  data () {
    return {
      store,
      isRouterAlive:true,
      isLoggedIn: false
    }
  },

  created () {
    const isLogin = localStorage.getItem('isLoggedIn')
    if (isLogin === 'true') {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }

    this.store.getRegAllData()
    this.store.getSiteAllDataList()
    this.store.getDeviceTypeData()
    this.store.UpDevData()
    this.store.getAllVehicleData()
  },

  methods:{

    onLoginSuccess() {
      this.isLoggedIn = true
      console.log("onLoginSuccess")
      // 登录成功后保存登录状态
      localStorage.setItem('isLoggedIn', 'true')
    },

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

<style>
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
