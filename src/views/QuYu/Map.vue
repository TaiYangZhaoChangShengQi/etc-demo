<template>
    <div>
        <div id="map"></div>
        <button>c</button>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Map',
  data () {
    return {
      // map:null,
      gps: ''
    }
  },
  methods: {
    initMap () {
      let map

      AMapLoader.load({
        key: 'e0182f82d3a2e2470ca386ea85595acc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AutoComplete', 'AMap.ElasticMarker', 'AMap.TileLayer', 'AMap.PlaceSearch',
          'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.ControlBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        map = new AMap.Map('map', {
          resizeEnable: true,
          zoom: 11,
          viewMode: '3D',
          center: [121.498586, 31.239637]
        })

        map.on('click', (e) => {
          this.gps = e.lnglat.lng + ',' + e.lnglat.lat
          console.log(this.gps)
        })

        // var marker = new AMap.Map("map", {
        //     resizeEnable: true,
        //     center: [121.498586, 31.239637],
        //     zoom: 13
        // });
        //
      }).catch(e => {
        console.log(e)
      })
    },

    addMarker () {
      const marker = new AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: [116.406315, 39.908775],
        offset: new AMap.Pixel(-13, -30)
      })
      marker.setMap(map)
    }
  },
  mounted () {
    this.initMap()
  },
  beforeUnmount () {
    //     map.destroy( );
    //     var canvas = document.getElementById('canvas');
    //     var gl = canvas.getContext('webgl');
    //
    //     canvas.addEventListener('webglcontextlost',function (e) {
    //         console.log(e);
    //     },false)
    //
    //     gl.getExtension('WEBGL_lose_context').loseContext();
  }
}
</script>

<style scoped>
    #map {
        width: 100%;
        height: 700px;
        border: 1px none red;
    }

</style>
