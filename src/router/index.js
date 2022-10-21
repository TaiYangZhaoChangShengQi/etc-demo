import Vue from 'vue'
import VueRouter from 'vue-router'

import RegionalMana from '@/views/QuYu/RegionalMana'
import SiteMana from '@/views/ZhanDian/SiteMana'
import Map from '@/views/QuYu/Map'
import RegManaList from '@/views/QuYu/RegManaList'
import DeviceMana from '@/views/SheBei/DeviceMana'
import DeviceTypeMana from "@/views/SheBei/DeviceTypeMana";
import CarInfoRecord from '@/views/VehicleInformation/VehicleInfoRecord'
import vehicleMap from "@/views/VehicleInformation/vehicleMap";
import DeviceBeatMana from "@/views/SheBeiXinTiao/DeviceBeatMana";
import siteMap from "@/views/ZhanDian/siteMap";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Map
  },
  {
    path: '/RegMana',
    component: RegionalMana,
    children: [
      {
        path: '/',
        component: Map
      },
      {
        path: '/RegMana/Map',
        component: Map
      },
      {
        path: '/RegMana/RegManaList',
        component: RegManaList
      },
    ]
  },
  {
    path: '/SiteMana',
    name:'SiteMana',
    component: SiteMana,
  },
  {
    path: '/siteMap',
    component: siteMap
  },
  {
    path: '/DeviceMana',
    component: DeviceMana
  },
  {
    path: '/DeviceTypeMana',
    component: DeviceTypeMana
  },
  {
    path: '/CarInfoRecord',
    component: CarInfoRecord
  },
  {
    path: '/vehicleMap',
    component: vehicleMap,
  },
  {
    path: '/DeviceBeatMana',
    component: DeviceBeatMana
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
