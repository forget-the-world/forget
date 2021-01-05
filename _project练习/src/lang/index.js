import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

Vue.use(VueI18n)
    // 设置对应的语言环境
    // 获取浏览器的语言环境
const navLang = navigator.language
let localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
if (localLang == 'zh-CN') {
    localLang = 'zh'
} else if (localLang == 'en-US') {
    localLang = 'en'
}
// 获取localStorage的语言状态，如果没有设置默认的语言环境，如果浏览器默认也没有语言环境，就设置为中文
let lang = localStorage.getItem("lang") || localLang || 'zh'
    // localStorage存储最新的语言信息
localStorage.setItem('lange', lang)
const i18n = new VueI18n({
    // 设置当前语言
    locale: localStorage.getItem('lange') || 'zh',
    messages: {
        en,
        zh
    }
})

export default i18n