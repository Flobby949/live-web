import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'
// 定义路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about.vue')
      }
    ]
  }
  // 更多路由...
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
