import { createRouter, createWebHistory } from 'vue-router'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about.vue')
  }
  // 更多路由...
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
