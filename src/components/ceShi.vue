<template>
    <div>
        <!--        <h3 class="title">{{ msg }}</h3>-->
        <!--        <div class="amap-wrapper">-->
        <!--            <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>-->
        <!--        </div>-->
        <div id="container"></div>
        <button @click="cs1()">111</button>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'ceShi',
  data () {
    return {
      msg: 'vue-amap向你问好！'
      // map:'',
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let map

      AMapLoader.load({
        key: 'e0182f82d3a2e2470ca386ea85595acc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.PlaceSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        map = new AMap.Map('container', { // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 13, // 初始化地图级别
          center: [116.397428, 39.90923] // 初始化地图中心点位置
        })

        // var placeSearch = new AMap.PlaceSearch()
        // var infoWindow=new AMap.InfoWindow({});
        // this.map.on('hotspotover', function(result) {
        //     placeSearch.getDetails(result.id, function(status, result) {
        //         if (status === 'complete' && result.info === 'OK') {
        //             placeSearch_CallBack(result);
        //         }
        //     });
        // });
        // function placeSearch_CallBack(data) { //infoWindow.open(map, result.lnglat);
        //     var poiArr = data.poiList.pois;
        //     var location = poiArr[0].location;
        //     infoWindow.setContent(createContent(poiArr[0]));
        //     infoWindow.open(map,location);
        // }
        // function createContent(poi) {  //信息窗体内容
        //     var s = [];
        //     s.push('<div class="info-title">'+poi.name+'</div><div class="info-content">'+"地址：" + poi.address);
        //     s.push("电话：" + poi.tel);
        //     s.push("类型：" + poi.type);
        //     s.push('<div>');
        //     return s.join("<br>");
        // }
      }).catch(e => {
        console.log(e)
      })
    },

    cs1 () {
      // var zoom = Math.floor(Math.random() * 7) + 11; //zoom范围[11,18]
      // this.map.setZoom(zoom); //设置地图层级
      // alert(zoom)

      const center = this.map.getCenter() // 获取当前地图中心位置
      alert(center)

      // //绑定地图移动与缩放事件
      // map.on('moveend', logMapinfo);
      // map.on('zoomend', logMapinfo);
    }

  }
}
</script>

<style scoped>
    .amap-wrapper {
        width: 500px;
        height: 500px;
    }

    #container {
        width: 500px;
        height: 500px;
    }

    #map-zoom, #map-center {
        color: #0288d1;
    }

</style>
