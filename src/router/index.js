import Vue from 'vue'
import VueRouter from 'vue-router'

import RegionalMana from '@/components/RegionalMana'
import SiteMana from '@/components/SiteMana'
import Map from '@/views/QuYu/Map'
import RegManaList from '@/views/QuYu/RegManaList'
import DeviceMana from '@/components/DeviceMana'
import CarInfoRecord from '@/components/VehicleInfoRecord'

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
      }
    ]
  },
  {
    path: '/SiteMana',
    component: SiteMana
  },
  {
    path: '/DeviceMana',
    component: DeviceMana
  },
  {
    path: '/CarInfoRecord',
    component: CarInfoRecord
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
