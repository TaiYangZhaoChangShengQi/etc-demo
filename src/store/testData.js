import { reactive } from 'vue'

export const testData = reactive({
  regionList:[
    {
      regName: '区域01',
      num: '1',
      GPS: '22.674574, 113.993353',
      info: '',
      siteList:['站点1','站点2','站点3']
    },
    {
      regName: '区域02',
      num: '2',
      GPS: '22.674574, 113.993353',
      info: '',
      siteList:['站点1','站点2','站点3']
    },
    {
      regName: '区域01',
      num: '3',
      GPS: '22.674574, 113.993353',
      info: '',
      siteList:['站点1','站点2','站点3']
    }
  ],
  siteList:[
    {
      siteName: '站点1',
      regionName: '区域01',
      SiteNum: '1',
      SiteGPS: '40.406709, 116.441345',
      info: '',
    },
    {
      siteName: '站点2',
      regionName: '区域01',
      SiteNum: '2',
      SiteGPS: '40.406709, 116.441345',
      info: '',
    },
    {
      siteName: '站点3',
      regionName: '区域01',
      SiteNum: '3',
      SiteGPS: '40.406709, 116.441345',
      info: '',
    }

  ],
})
