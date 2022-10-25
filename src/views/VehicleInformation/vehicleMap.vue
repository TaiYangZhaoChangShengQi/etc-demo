<template>
  <div>
    <div class="button-line">
      <div class="button">
        <el-select class="ct-width" clearable filterable v-model="selectForm.obuId" placeholder="请选择车辆">
          <el-option v-for="(item,index) in this.obuIdList" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-date-picker class="input-style" style="width: 210px" type="datetime"
                        format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-model="selectForm.start"/>
        -
        <el-date-picker class="input-style" style="width: 210px; margin-right: 10px" type="datetime"
                        format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-model="selectForm.end"/>
        <el-button class="add-margin" style="height: 38px" type="primary" icon="el-icon-search" @click="showVehicle">展示路径</el-button>
      </div>
    </div>
    <div id="container"></div>
    <!-- 获取经纬度 -->
    <div class="item">
      <h4>左击获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" v-model="this.store.gps">
      </div>
    </div>

    <button @click="testFunc">ccc</button>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {store} from "@/store/store";
import {getVehicleTrackServeData} from "@/network/vehicle";

export default {
  name: "siteMap",
  data () {
    return {
      store,
      gps:[],
      Marker:[],
      selectForm:{
        start:'',
        end:'',
        obuId:'',
      },
      obuIdList:[],
      markerList:[],
      newSiteRange:[],
      polygonList:[],
      arr:[],
      i:0,
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
        plugins:["AMap.MarkerCluster","AMap.ElasticMarker",'AMap.Driving','AMap.DragRoute', 'AMap.PolygonEditor',
          'AMap.CircleEditor', 'AMap.ControlBar','AMap.MouseTool'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.store.vehicleMap = new AMap.Map("container",{  //设置地图容器id
          resizeEnable: true,
          zoom: 15,
          viewMode: '3D',
          center: [114.215448,22.684815]
        });

        // 获取鼠标点击后的地图坐标
        this.store.vehicleMap.on('click', (e) => {
          this.store.gps.splice(0)
          this.store.gps.push(e.lnglat.lng,e.lnglat.lat)
        })
        this.store.getAllVehicleData()
        this.removeTheSame()
        this.addAllMarker()
        this.createDefaultPolygon()
        this.addAllPolygonToMap()
      }).catch(e=>{
        console.log(e);
      })
    },

    /**
     * 测试用函数
     */
    testFunc () {

    },

    /**
     * 实例化全部点标记
     */
    addAllMarker () {
      for (let i=0 ; i<this.store.siteAllData.length ; i++) {
        this.markerList[i] = new AMap.Marker({
          position: this.store.siteAllData[i].siteRange,
          offset: new AMap.Pixel(-13, -30),
          label:{
            direction:'right',
            offset:new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content:this.store.siteAllData[i].siteName,
          },
        });
      }
      this.addMarkerToMap()
    },

    /**
     * 添加站点标记点到地图
     * @param num
     */
    addMarkerToMap (num) {
      for (let i=0 ; i<this.markerList.length ; i++) {
        this.markerList[i].setMap(this.store.vehicleMap)
      }
    },

    /**
     * 实例化全部区域
     */
    createDefaultPolygon () {
      this.store.regionAllData.map((item,index) => {
        switch (this.store.regionAllData[index].riskLevel) {
          case '无风险':
            this.polygonList[index] = new AMap.Polygon({
              path: item.area,          // 设置线覆盖物路径
              fillColor: '#7FFFD4',
              strokeOpacity: 1,
              fillOpacity: 0.7,
              strokeColor: '#7FFFD4',
              strokeWeight: 2,
              strokeStyle: 'solid',
              strokeDasharray: [5, 5],
            });
            break;
          case '低风险':
            this.polygonList[index] = new AMap.Polygon({
              path: item.area,           // 设置线覆盖物路径
              fillColor: '#00BFFF',
              strokeOpacity: 1,
              fillOpacity: 0.7,
              strokeColor: '#00BFFF',
              strokeWeight: 2,
              strokeStyle: 'solid',
              strokeDasharray: [5, 5],
            });
            break;
          case '中风险':
            this.polygonList[index] = new AMap.Polygon({
              path: item.area,          // 设置线覆盖物路径
              fillColor: '#FFD700',
              strokeOpacity: 1,
              fillOpacity: 0.7,
              strokeColor: '#FFD700',
              strokeWeight: 2,
              strokeStyle: 'solid',
              strokeDasharray: [5, 5],
            });
            break;
          case '高风险':
            this.polygonList[index] = new AMap.Polygon({
              path: item.area,         // 设置线覆盖物路径
              fillColor: '#FF0000',
              strokeOpacity: 1,
              fillOpacity: 0.7,
              strokeColor: '#FF0000',
              strokeWeight: 2,
              strokeStyle: 'solid',
              strokeDasharray: [5, 5],
            });
            break;
          default:
            this.polygonList[index] = new AMap.Polygon({
              path: item.area,          // 设置线覆盖物路径
              fillColor: '#7FFFD4',
              strokeOpacity: 1,
              fillOpacity: 0.7,
              strokeColor: '#7FFFD4',
              strokeWeight: 3,
              strokeStyle: 'solid',
              strokeDasharray: [5, 5],
            });
        }
      } )
    },

    /**
     * 显示全部覆盖物
     */
    addAllPolygonToMap () {
      // 先清除覆盖物，再添加覆盖物，以达到只显示一个覆盖物的效果
      this.store.vehicleMap.remove(this.polygonList)
      this.store.vehicleMap.add(this.polygonList);
    },

    /**
     * 显示车辆轨迹
     */
    showVehicle () {
      console.log(this.selectForm)
      getVehicleTrackServeData(this.selectForm).then(res => {
        console.log(res.data)
        this.vehicleTrack(res.data)
      }).catch(err => {

      })
    },

    /**
     * 把OBU ID放到新数组
     */
    removeTheSame () {
      let list = []
      this.store.vehicleAllData.map( (item,index) => {
        if (item.obuId != "") {
          list.push(item.obuId)
        }
      })
      for (let i = 0; i < list.length ; i++) {
        if (this.obuIdList.lastIndexOf(list[i]) === -1) {
          this.obuIdList.push(list[i])
        }
      }
      console.log(this.obuIdList)
    },

    /**
     * 车辆轨迹
     */
    vehicleTrack (arr) {
      let route = new AMap.DragRoute(this.store.vehicleMap,arr,AMap.DrivingPolicy.LEAST_FEE)
      route.search()
    },
  },
}
</script>

<style scoped>
  #container {
    margin: 1px 1px;
    padding: 1px 1px;
    width: 100%;
    height: 700px;
    border: 1px none red;
  }

  .button-line {
    margin-bottom: 10px;
    display: flex;
    justify-content: right;
  }

  .ct-width {
    width: 150px;
    margin-right: 10px;
  }

  .item {
    position: absolute;
    padding-top: 5px;
    padding-left: 10px;
    right: 50px;
    top: 700px;
    border-radius:10px;
    width: 180px;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .el-button--primary /deep/ .el-icon-search {
    margin-right: 5px;
  }

  .item h4 {
    font-family: "楷体", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>