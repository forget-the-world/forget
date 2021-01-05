import Vuex from 'vuex'
// 引入vue
import Vue from 'vue'

// 使用vuex
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        name: '李明'
    },
    mutations: {
        add() {
            console.log("触发add")
        }
    }
})