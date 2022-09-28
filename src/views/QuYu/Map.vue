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
      drawPolygonPath:[],
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
          'AMap.OverView', 'AMap.ToolBar','AMap.MouseTool', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.ControlBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
        this.addMarker()
      }).catch(e => {
        console.log(e)
      })
    },

    //测试用函数
    testFunc () {
      console.log(this.store.siteData)
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
          strokeWeight: 3,
          strokeStyle: 'solid',
          strokeDasharray: [5, 5],
        });
      }
    },

    //添加指定多边形覆盖物到地图
    addPolygonToMap (polygon) { //polygon 传入多边形覆盖物对象或数组对象或区域序号
      //先清除覆盖物，再添加覆盖物，以达到只显示一个覆盖物的效果
      this.newMap.remove(this.polygonList)
      this.newMap.add(this.polygonList[polygon]);
      //中心点随覆盖物区域的选择变动
      this.newMap.setCenter(this.store.regionData[polygon].area[0])
    },

    //绘制覆盖物
    drawPolygon () {
      let mouseTool = new AMap.MouseTool(this.newMap)
      mouseTool.polygon({
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        strokeStyle: "solid",
      })
      //清空数组
      this.drawPolygonPath.splice(0)
      //保存绘制的覆盖物坐标
      mouseTool.on('draw', (e) => {
        // event.obj 为绘制出来的覆盖物对象
        this.$parent.addRegForm.area = JSON.stringify(e.obj._opts.path)  //把数组转换成字符串传给后端
      })
      return this.drawPolygonPath
    },

    //实例化点标记
    addMarker () {
      for (let i=0 ; i<this.store.siteData.length ; i++) {
       this.markerList[i] = new AMap.Marker({
          position: this.store.siteData[i].siteRange,
          offset: new AMap.Pixel(-13, -30)
        });
      }
      this.addMarkerToMap()
    },

    //添加站点标记点到地图
    addMarkerToMap (num) {
      for (let i=0 ; i<this.markerList.length ; i++) {
        this.markerList[i].setMap(this.newMap)
      }
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
