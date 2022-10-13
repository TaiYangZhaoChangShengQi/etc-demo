<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {store} from "@/store/store";

export default {
  name: "siteMap",
  data () {
    return {
      store,
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap(){
      AMapLoader.load({
        key:"e0182f82d3a2e2470ca386ea85595acc",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.store.siteMap = new AMap.Map("container",{  //设置地图容器id
          resizeEnable: true,
          zoom: 15,
          viewMode: '3D',
          center: [114.215448,22.684815]
        });
      }).catch(e=>{
        console.log(e);
      })
    },
  },
}
</script>

<style scoped>
  #container{
    margin: 1px 1px;
    padding: 1px 1px;
    width: 500px;
    height: 500px;
    border: 1px none red;
  }
</style>