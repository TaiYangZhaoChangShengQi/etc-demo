import { reactive } from 'vue'

export const store = reactive({
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  search: '',
  regionData:[],
})

  // ----------------------------------------函数---------------------------------------
