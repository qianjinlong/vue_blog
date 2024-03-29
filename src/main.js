// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// ES6 写法，会被转换成 require("vue"); （require 是 NodeJS 提供的模块加载器）
import Vue from 'vue'

// 意思同上，但是指定了查找路径，./ 为当前目录
import App from './App'

// 导入 index.js 路由配置目录
import router from './router'

// 导入 axios, 并加到原型链中
import axios from 'axios'

// 用来解决 vue 中 post 请求
import QS from 'qs'

// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios

Vue.prototype.qs = QS

// 在 Vue 中使用 ElementUI
Vue.use(ElementUI)

// 关闭浏览器控制台关于环境的相关提示
Vue.config.productionTip = false

/* eslint-disable no-new */
// 实例化 Vue
new Vue({
  el: '#app',
  // 配置路由
  router,
  // 引入组件，使用的是 import App from './App' 定义的 App 组件
  components: { App },
  // HTML 代码模板，会替换 < App /> 中的内容
  template: '<App/>'
})
