import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/golbal.less'
import { LocalStorage as Storage } from '@/util/index.js'
Vue.config.productionTip = false
Vue.prototype.$storage = new Storage('admin-')
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
