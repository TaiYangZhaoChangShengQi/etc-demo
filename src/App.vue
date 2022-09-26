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
import Home from './components/Home'
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
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
      isRouterAlive:true
    }
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

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .content {
    display: flex;
  }
  .View {
    margin-top: 20px;
    margin-left: 10px;
    width: 90%;
    height: 700px;
    border-style: none;
  }
</style>
