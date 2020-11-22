import Vue from 'vue'
// 导入路由插件
import Router from 'vue-router'
// 导入上面定义的组件
import Main from '@/components/Main'
import Login from '@/components/Login'
import UserInformation from '@/components/UserInformation'
import ArticleTable from '@/components/ArticleTable'
import ArticleTableSelect from '@/components/ArticleTableSelect'
import ArticleAdd from '@/components/ArticleAdd'
import ClassifyTable from '@/components/ClassifyTable'
import ClassifyAdd from '@/components/ClassifyAdd'
import CommentTable from '@/components/CommentTable'

// 安装路由
Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push

Router.prototype.push = function push (to) {
  return originalPush.call(this, to).catch(err => err)
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
          path: '/main/article/add',
          // 路由名称
          name: 'ArticleAdd',
          // 跳转到组件
          component: ArticleAdd
        },
        {
          // 路由路径
          path: '/main/article/select',
          // 路由名称
          name: 'ArticleTableSelect',
          // 跳转到组件
          component: ArticleTableSelect
        },
        {
          // 路由路径
          path: '/main/classify',
          // 路由名称
          name: 'ClassifyTable',
          // 跳转到组件
          component: ClassifyTable
        },
        {
          // 路由路径
          path: '/main/classify/add',
          // 路由名称
          name: 'ClassifyAdd',
          // 跳转到组件
          component: ClassifyAdd
        },
        {
          // 路由路径
          path: '/main/comment',
          // 路由名称
          name: 'CommentTable',
          // 跳转到组件
          component: CommentTable
        },
        {
          // 路由路径
          path: '/main/user',
          // 路由名称
          name: 'UserInformation',
          // 跳转到组件
          component: UserInformation
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
