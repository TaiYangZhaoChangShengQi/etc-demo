<template>
    <div id="map">

    </div>

</template>

<script>
    import AMapLoader from '@amap/amap-jsapi-loader';

    export default {
        name: "Map",
        data(){
            return {
                map:null
            }
        },
        methods:{
            initMap(){
                AMapLoader.load({
                    "key": "e0182f82d3a2e2470ca386ea85595acc",              // 申请好的Web端开发者Key，首次调用 load 时必填
                    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    "plugins": ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap)=>{
                    this.map = new AMap.Map('map');
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        mounted() {
            this.initMap();

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