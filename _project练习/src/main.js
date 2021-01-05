import Vue from 'vue'
// 相对路径引入的App.vue文件
import App from './App.vue'
// 引入store文件
import store from './store/store.js'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入iview
import iviewUi from 'view-design'
import 'view-design/dist/styles/iview.css'
// 引入国际化
import i18n from './lang/index.js'
// 引入路由router
import router from './router/index.js'

import axios from 'axios'
Vue.prototype.$http = axios

// 注册全局的grid
import { Grid, GridItem } from './components/Grid/index.js'
Vue.use(Grid)
Vue.use(GridItem)

// console.log(i18n)
Vue.use(iviewUi)

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.use(elementUi)
new Vue({
    // 渲染节点
    render: h => h(App),
    i18n,
    // 挂载store文件
    store,
    // 挂载路由
    router
}).$mount('#app')