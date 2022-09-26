import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import AmapVueConfig from '@amap/amap-vue/lib/config';
AmapVueConfig.key = 'e0182f82d3a2e2470ca386ea85595acc';

Vue.use(ElementUI)


window._AMapSecurityConfig = {
  securityJsCode: 'c4ede32087e61f139613441cf05b5460'
}
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
