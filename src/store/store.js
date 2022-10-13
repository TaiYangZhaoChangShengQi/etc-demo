import { reactive } from 'vue'

export const store = reactive({
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  search: '',
  siteMap:null,
  showChangeDraw:false,
  regionData:[],
  drawPolygonPath:[],
  siteData:[],
  vehicleData:[],
  deviceTypeData:[],
})

  // ----------------------------------------函数---------------------------------------
