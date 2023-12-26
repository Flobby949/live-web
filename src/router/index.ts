import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'

import { userStore } from '@/store'
import { useToast } from 'vue-toastification'
const toast = useToast()

// 定义路由
const routes = [
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
        meta: {
          loginRequire: true
        },
        component: () => import('@/views/about.vue')
      },
      {
        path: '/liveRoom',
        name: 'liveRoom',
        component: () => import('@/views/liveRoom.vue')
      },
      {
        path: '/pkLiveRoom',
        name: 'pkLiveRoom',
        component: () => import('@/views/pkLiveRoom.vue')
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

// 前置守卫，如果没有登录，不能进入需要登录的页面
router.beforeEach((to, from, next) => {
  const store = userStore()
  if (to.matched.some((item) => item.meta.loginRequire)) {
    const token = store.token
    if (token) {
      next()
    } else {
      toast.error('登录已过期，请重新登录')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
