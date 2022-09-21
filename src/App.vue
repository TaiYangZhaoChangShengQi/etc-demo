<template>
  <div id="app">
    <Home></Home>
    <div class="content">
      <div class="NeiL">
        <Navigation></Navigation>
      </div>
      <div class="NeiR">
        <router-view></router-view>
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
  }
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

  .NeiR {
    margin-top: 20px;
    margin-left: 10px;
    width: 90%;
    height: 700px;
    border-style: none;
  }

</style>
