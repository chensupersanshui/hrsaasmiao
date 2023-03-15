// import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// // import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import '@/styles/index.scss' // global css
// import i18n from '@/lang'
// import App from './App'
// import store from './store'
// import router from './router'
// import Components from './components'
// import * as directives from '@/directives'
// import * as filters from '@/filters'
// import '@/icons' // icon
// import '@/permission' // permission control
// import checkPermission from './mixin/checkPermission'
// // import { values } from 'core-js/core/array'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, directives[key])
// })
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })
// Vue.use(Components)
// Vue.mixin(checkPermission)
// Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// })
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import * as filters from '@/filters'
import Components from '@/components'
import VuePrint from 'vue-print-nb'
import checkPermission from '@/mixin/checkPermission'
import i18n from '@/lang' // 引入i18n实例
import '@/icons' // icon
import '@/permission' // permission control
// directives是所有指令的一个集合
Object.keys(directives).forEach(key => {
// key就是指令名称
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Components) // 注册自己的自定义组件
Vue.mixin(checkPermission) // 全局混入  会让所有的组件都自动拥有该混入组件的方法和属性
Vue.use(VuePrint) // 注册打印插件
// set ElementUI lang to EN
Vue.use(ElementUI, {
  // t方法是去找 对应的语言下的 显示值
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
