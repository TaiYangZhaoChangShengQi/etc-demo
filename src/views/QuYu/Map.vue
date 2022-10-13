<template>
  <div>
    <div id="map"></div>
    <div class="item">
      <h4>左击获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" v-model="gps">
      </div>
    </div>
    <button @click="testFunc">ccc</button>
    <!-- 修改覆盖物 -->
    <div class="change-draw" v-show="store.showChangeDraw">
      <el-row>
        <el-button size="medium" type="primary" @click="cancelChangeDraw">取消</el-button>
        <el-button size="medium" type="primary" @click="polyEditor.open()">开始修改</el-button>
        <el-button size="medium" type="primary" @click="enterChange">完成修改</el-button>
      </el-row>
    </div>
    <!--    修改区域对话框      -->
    <el-dialog title="修改区域信息" :visible.sync="dialogRegVisible">
      <el-form ref="form" :model="RegForm" label-width="80px">
        <el-form-item label="区域序号">
          <el-input v-model="RegForm.id" disabled/>
        </el-form-item>
        <el-form-item label="区域名称">
          <el-input v-model="RegForm.name"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="RegForm.remarks"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegData">保存</el-button>
          <el-button @click="dialogChangeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {store} from "@/store/store";
import bus from "@/components/bus";
import qs from "qs";
import {updateRegionServeData} from "@/network/region";

export default {
  name: 'Map',
  inject:['reload'],
  data () {
    return {
      store,
      gps: '',
      newMap:'',
      RegForm: {},
      polygon:{},
      polyEditor:{},
      dialogRegVisible: false,
      polygonList:[{},{},{}],   // 覆盖物对象集
      markerList:[[],[],[]],  // 点标记对象的坐标集
      drawPolygonPath:[],   // 覆盖物坐标集
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
          'AMap.OverView', 'AMap.ToolBar','AMap.MouseTool', 'AMap.MapType', 'AMap.PolygonEditor', 'AMap.CircleEditor', 'AMap.ControlBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.newMap = new AMap.Map('map', {
          resizeEnable: true,
          zoom: 15,
          viewMode: '3D',
          center: [114.215448,22.684815]
        })
        // 获取鼠标点击后的地图坐标
        this.newMap.on('click', (e) => {
          this.gps = e.lnglat.lng + ',' + e.lnglat.lat
          console.log(this.gps)
        })
        // 实例化默认覆盖物
        this.createDefaultPolygon()
        // this.addMarker()
        if (this.$route.query.id >= 0) {
          this.changeDraw(this.$route.query.id,this.$route.query.index)
        }
      }).catch(e => {
        console.log(e)
      })
    },

    // 测试用函数
    testFunc () {
      console.log(this.RegForm)
    },

    // 创建默认多边形覆盖物
    createDefaultPolygon () {
      //创建多边形覆盖物
      for (let i=0 ; i<this.store.regionData.length ; i++) {
        this.polygonList[i] = new AMap.Polygon({
          path: this.store.regionData[i].area,          // 设置线覆盖物路径
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

    // 添加指定多边形覆盖物到地图
    addPolygonToMap (polygon,zoom) { // polygon 传入多边形覆盖物对象或数组对象或区域序号 ,zoom 为地图层级，是个number
      // 先清除覆盖物，再添加覆盖物，以达到只显示一个覆盖物的效果
      this.newMap.remove(this.polygonList)
      this.newMap.add(this.polygonList[polygon]);
      // 中心点随覆盖物区域的选择变动
      this.newMap.setCenter(this.store.regionData[polygon].area[0])
      // 地图层级随覆盖物区域的选择变动
      let zoom1 = Number(this.store.regionData[polygon].zoom)
      this.newMap.setZoom(zoom1)
    },

    // 绘制覆盖物
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
      // 清空数组
      this.drawPolygonPath.splice(0)
      // 保存绘制的覆盖物坐标
      mouseTool.on('draw', (e) => {
        // event.obj 为绘制出来的覆盖物对象
        // 获取地图层级
        // 获取到的zoom 类型是number
        this.$parent.addRegForm.zoom = this.newMap.getZoom();
        // e.obj._opts.path 里面存放了经纬度数组
        this.$parent.addRegForm.area = JSON.stringify(e.obj._opts.path)  // 把数组转换成字符串传给后端
      })
      return this.drawPolygonPath
    },

    // 修改覆盖物
    changeDraw (id,index) {
      let arr = []
      let ct = 1
      let myId = Number(id)
      for (let i = 0; i < this.store.regionData.length; i++) {
        if (myId === this.store.regionData[i].id) {
          arr = this.store.regionData[i].area
          ct = i
        }
      }
      console.log('c',arr)
      this.polygon = new AMap.Polygon({
        path: arr,
        strokeColor: "#FF33FF",
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
        bubble: true,
      })
      this.newMap.add(this.polygon)
      // 中心点随覆盖物区域的选择变动
      this.newMap.setCenter(this.store.regionData[ct].area[0])
      // 地图层级随覆盖物区域的选择变动
      let zoom1 = Number(this.store.regionData[ct].zoom)
      this.newMap.setZoom(zoom1)
      // 清空数组
      this.drawPolygonPath.splice(0)
      this.searchForChange(myId)
      this.polyEditor = new AMap.PolygonEditor(this.newMap, this.polygon);
      // 保存绘制的覆盖物坐标
      // mouseTool.on('draw', (e) => {
      //   // event.obj 为绘制出来的覆盖物对象
      //   // 获取地图层级
      //   // 获取到的zoom 类型是number
      //   this.RegForm.zoom = this.newMap.getZoom();
      //   // e.obj._opts.path 里面存放了经纬度数组
      //
      // })
      return this.drawPolygonPath
    },
    // 完成修改按钮
    enterChange () {
      this.polyEditor.close()
      this.RegForm.area = JSON.stringify(this.polygon._opts.path)  // 把数组转换成字符串传给后端
      console.log(this.RegForm)
      this.dialogRegVisible = true
    },

    // 寻找目标放到修改框
    searchForChange (id) {
      for (let i = 0; i < this.store.regionData.length; i++) {
        if (id === this.store.regionData[i].id) {
          let c = JSON.parse(JSON.stringify(this.store.regionData[i]))
          this.RegForm = c
        }
      }
    },

    // 保存修改函数
    submitRegData (num) {
      let c = qs.stringify(this.RegForm)
      updateRegionServeData(c).then(res => {
        console.log(res)
        this.reload()
      }).catch(err => {
        console.log(err)
      })
      this.dialogRegVisible = false
      this.store.showChangeDraw = false
      this.$router.push('/RegMana/RegManaList')
    },

    // 取消修改区域
    cancelChangeDraw () {
      this.reload()
      this.$router.push('/RegMana/RegManaList')
    },

    // 实例化点标记
    addMarker () {
      for (let i=0 ; i<this.store.siteData.length ; i++) {
       this.markerList[i] = new AMap.Marker({
          position: this.store.siteData[i].siteRange,
          offset: new AMap.Pixel(-13, -30),
         // content:this.store.siteData,
        });
      }
      this.addMarkerToMap()
    },

    // 添加站点标记点到地图
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

  .item h4 {
    font-family: "楷体", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .change-draw {
    position: absolute;
    top: 150px;
    right: 100px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    height: 45px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
