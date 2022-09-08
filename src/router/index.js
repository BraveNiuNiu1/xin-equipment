import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  // 访问/，会自动跳转到/login
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  // {
  //   path: '/home',
  //   component: HomeView
  // },
  // 异步路由，访问他的时候才会显示
  {
    path: '/main',
    component: () => import( '../views/MainView.vue'),
    redirect: 'main/overview',
    children:[
      {
        path:'overview',
        // 路由定义时可以使用meta元属性，给路由添加更多信息
        meta: {name: '系统概览', permission: 'overview'},
        component: () => import( '../views/OverviewView.vue'),
      },
      {
        path:'registration',
        meta: {name: '设备登记', permission: 'register' },
        component: () => import( '../views/RegistrationView.vue'),
      },
      {
        path:'registration-add',
        // hide:true 隐藏不在侧栏显示
        meta: {name: '设备添加', permission: 'register', hide:true},
        component: () => import( '../views/RegistrationAdd.vue'),
      },
      {
        // 路由传参
        path:'registration-edit/:id',
        meta: {name: '设备编辑', permission: 'register', hide:true },
        component: () => import( '../views/RegistrationEdit.vue'),
      },
      {
        path:'management',
        meta: {name: '设备管理', permission: 'management'},
        component: () => import( '../views/ManagementView.vue'),
      },
      {
        path:'dictionary',
        meta: {name: '数据字典', permission: 'dictionary'},
        component: () => import( '../views/DictionaryView.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

export {
  routes
}
