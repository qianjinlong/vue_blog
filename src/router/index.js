import Vue from 'vue'
// 导入路由插件
import Router from 'vue-router'
// 导入上面定义的组件
import Main from '@/components/Main'
import Login from '@/components/Login'
import UserTable from '@/components/UserTable'
import ArticleTable from '@/components/ArticleTable'

// 安装路由
Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 配置路由
export default new Router({
  routes: [
    {
      // 路由路径
      path: '/main',
      // 路由名称
      name: 'Main',
      // 跳转到组件
      component: Main,
      children: [
        {
          // 路由路径
          path: '/main/article',
          // 路由名称
          name: 'ArticleTable',
          // 跳转到组件
          component: ArticleTable
        },
        {
          // 路由路径
          path: '/main/user',
          // 路由名称
          name: 'UserTable',
          // 跳转到组件
          component: UserTable
        }
      ]
    },
    {
      // 路由路径
      path: '/',
      // 路由名称
      name: 'Login',
      // 跳转到组件
      component: Login
    }
  ]
})
