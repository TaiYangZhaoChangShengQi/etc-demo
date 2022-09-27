<template>
  <div>
    <div id="map"></div>
    <button @click="testFunc">ccc</button>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {store} from "@/store/store";

export default {
  name: 'Map',
  data () {
    return {
      store,
      gps: '',
      newMap:'',
      //覆盖物对象集
      polygonList:[{},{},{}],
      //点标记对象的坐标集
      markerList:[[],[],[]],
      //覆盖物坐标集
      coordinateList:[
        [
          [121.673489, 31.103474],
          [121.469556, 31.150497],
          [121.440717, 31.10171],
          [121.426297, 31.05231],
          [121.465436, 30.979928],
          [121.493588, 30.899832],
          [121.630231, 30.898065],
          [121.766873, 30.912205],
          [121.829358, 30.9605],
          [121.88223, 30.968154],
          [121.887723, 31.009947],
          [121.900769, 31.057604],
          [121.833478, 31.110529],
        ],
        [
          [120.802136, 31.368914],
          [120.832349, 31.370673],
          [120.837842, 31.389432],
          [120.867368, 31.390604],
          [120.883847, 31.404084],
          [120.890027, 31.412875],
          [120.920239, 31.42225],
          [120.982037, 31.429282],
          [121.089154, 31.344873],
          [121.069241, 31.299707],
          [120.931226, 31.256281],
          [120.78703, 31.26039],
          [120.719052, 31.305574],
        ],
        [
          [121.152954, 31.241758],
          [121.146145, 31.140999],
          [121.16589, 31.115356],
          [121.225804, 31.090871],
          [121.292526, 31.097284],
          [121.328611, 31.09845],
          [121.432099, 31.177122],
          [121.370823, 31.216724],
          [121.331334, 31.219635],
        ]
      ],
    }
  },

  mounted () {
    this.initMap()
  },

  methods: {
    initMap () {
      AMapLoader.load({
        key: 'e0182f82d3a2e2470ca386ea85595acc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AutoComplete', 'AMap.ElasticMarker', 'AMap.TileLayer', 'AMap.PlaceSearch', 'AMap.Scale',"AMap.MarkerCluster",
          'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.ControlBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.newMap = new AMap.Map('map', {
          resizeEnable: true,
          zoom: 11,
          viewMode: '3D',
          center: [121.498586, 31.239637]
        })
        //获取鼠标点击后的地图坐标
        this.newMap.on('click', (e) => {
          this.gps = e.lnglat.lng + ',' + e.lnglat.lat
          console.log(this.gps)
        })
        //实例化默认覆盖物
        this.createDefaultPolygon()
      }).catch(e => {
        console.log(e)
      })
    },

    //测试用函数
    testFunc () {
      console.log(typeof this.coordinateList)
    },

    //创建默认多边形覆盖物
    createDefaultPolygon () {
      //创建多边形覆盖物
      for (let i=0 ; i<this.store.regionData.length ; i++) {
        this.polygonList[i] = new AMap.Polygon({
          path: this.store.regionData[i].area,          //设置线覆盖物路径
          fillColor: '#ccebc5',
          strokeOpacity: 1,
          fillOpacity: 0,
          strokeColor: '#6699FF',
          strokeWeight: 2,
          strokeStyle: 'solid',
          strokeDasharray: [5, 5],
        });
      }
    },

    //添加指定多边形覆盖物到地图
    addPolygonToMap (polygon) { //polygon 传入多边形覆盖物对象或数组对象或区域序号
      this.newMap.remove(this.polygonList) //先清除覆盖物，再添加覆盖物，以达到只显示一个覆盖物的效果
      this.newMap.add(this.polygonList[polygon]);
      this.newMap.setCenter(this.coordinateList[polygon][1]) //中心点随覆盖物区域的选择变动
    },

    //实例化点标记
    addMarker () {
      marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: [116.406315, 39.908775],
        offset: new AMap.Pixel(-13, -30)
      });
    },

    //添加站点标记点到地图
    addMarkerToMap (num) { //传入的是区域序号

    }
  },
}
</script>

<style scoped>
  #map {
    margin: 1px 1px;
    padding: 1px 1px;
    width: 100%;
    height: 700px;
    border: 1px none red;
  }
</style>
