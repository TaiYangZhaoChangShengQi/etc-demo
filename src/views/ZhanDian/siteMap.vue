<template>
  <div>
    <div id="container"></div>
    <!-- 获取经纬度 -->
    <div class="item">
      <h4>左击获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" v-model="this.store.gps">
      </div>
    </div>
    <!-- 绘制点标记 -->
    <div class="draw" v-show="showDraw">
      <div class="word">左键点击地图上需要创建站点的地方，然后点创建按钮</div>
      <div class="button">
        <el-row>
          <el-button size="medium" type="primary" @click="addMarker">创建</el-button>
          <el-button size="medium" type="primary" @click="clickToList(str1)">完成</el-button>
          <el-button size="medium" type="primary" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
    <!-- 修改点标记 -->
    <div class="change-site-draw" v-show="changeDraw">
      <div class="word">
        点击开始修改，然后按住左键拖拽站点至目的地，然后点击完成修改
      </div>
      <div class="">
        <el-row>
          <el-button size="medium" type="primary" @click="cancelChange">取消</el-button>
          <el-button size="medium" type="primary" @click="dragSite">开始修改</el-button>
          <el-button size="medium" type="primary" @click="endChange">完成修改</el-button>
        </el-row>
      </div>

    </div>
  </div>


</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import {store} from "@/store/store";
import {addSiteServeData} from "@/network/site";

export default {
  name: "siteMap",
  data () {
    return {
      store,
      gps:[],
      str1:'返回站点列表',
      Marker:[],
      markerList:[],
      newSiteRange:[],
      showDraw:false,
      changeDraw:false,
      siteId:'',
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
        plugins:["AMap.MarkerCluster","AMap.ElasticMarker"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        this.store.siteMap = new AMap.Map("container",{  //设置地图容器id
          resizeEnable: true,
          zoom: 15,
          viewMode: '3D',
          center: [114.215448,22.684815]
        });

        // 获取鼠标点击后的地图坐标
        this.store.siteMap.on('click', (e) => {
          this.store.gps.splice(0)
          this.store.gps.push(e.lnglat.lng,e.lnglat.lat)
        })

        // 响应添加站点功能
        if (this.$route.query.order === '添加站点') {
          this.showDraw = true
        }
        // 响应修改站点功能
        if (this.$route.query.siteId >= 0) {
          this.searchSite(this.$route.query.siteId)
          this.siteId = this.$route.query.siteId
          this.changeDraw = true
          this.changedMarker(this.$route.query.siteId,this.arr)
        }

        this.addAllMarker()
      }).catch(e=>{
        console.log(e);
      })
    },

    /**
     * 创建点标记
     */
    addMarker () {
      this.store.Marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: this.store.gps,
        offset: new AMap.Pixel(-13, -30)
      })
      this.store.Marker.setMap(this.store.siteMap)
    },

    /**
     * 跳转回站点列表
     */
    clickToList (str) {
      this.showDraw = false
      this.$router.push({
        name:'SiteMana',
        params:{
          order:str,
        }
      })
    },

    /**
     * 取消添加新站点，并返回站点列表
     */
    cancel () {
      this.showDraw = false
      this.$router.push('/SiteMana')
    },

    /**
     * 定位到将被修改的站点
     * @param siteId - 站点id
     */
    changedMarker (siteId,arr) {
      this.Marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: arr,
        offset: new AMap.Pixel(-13, -30)
      })
      this.newSiteRange = arr
      this.Marker.setMap(this.store.siteMap)
      this.store.siteMap.setCenter(arr)
    },

    /**
     * 站点拖动开关
     */
    dragSite () {
      this.Marker.setDraggable(true)
      this.Marker.on('dragend',e => {
        this.newSiteRange.splice(0)
        this.newSiteRange.push(e.lnglat.lng,e.lnglat.lat)
      })
    },

    /**
     * 完成站点修改
     */
    endChange () {
      this.Marker.setDraggable(false)
      this.changeDraw = false
      this.store.siteData[this.i].siteRange = this.newSiteRange
      this.$router.push({
        name:'SiteMana',
        params:{
          siteID:this.siteId
        }
      })
    },

    /**
     * 循环站点列表，寻找目标站点
     * @param siteId - 站点id
     */
    searchSite (siteId) {
      let myId = Number(siteId)
      for (let i = 0; i < this.store.siteAllData.length; i++) {
        if (myId === this.store.siteAllData[i].siteId) {
          this.arr = this.store.siteAllData[i].siteRange
          this.i = i
        }
      }
    },

    /**
     * 取消修改站点，并返回站点列表
     */
    cancelChange () {
      this.changeDraw = false
      this.$router.push('/SiteMana')
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
        this.markerList[i].setMap(this.store.siteMap)
      }
    }
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

  .draw {
    position: absolute;
    text-align: center;
    top: 100px;
    left: 200px;
    padding-top: 10px;
    height: 65px;
    width: 400px;
    font-weight: 400;
    border-radius: 10px;
    background-color: rgba(255,255,255, .7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .draw .word {
    font-family: "FangSong", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    color: #6495ED;
    margin-bottom: 5px;
  }

  .change-site-draw {
    position: absolute;
    top: 100px;
    right: 50px;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255,255,255, .7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .change-site-draw .word {
    font-family: "FangSong", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    color: #6495ED;
    margin-bottom: 5px;
    width: 290px;

  }

  .button {

  }
</style>