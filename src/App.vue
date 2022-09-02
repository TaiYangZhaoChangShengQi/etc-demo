<template>
  <div id="app">
    <Home></Home>
    <div class="content">
      <Navigation></Navigation>
      <div class="NeiR">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import Home from "./components/Home";
  import Navigation from "@/components/Navigation";

  export default {
    name:'App',
    components:{
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
    margin-left: 20px;
    width: 1300px;
    height: 700px;
    border-style: none;

  }

</style>
