import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/category/:id',
          name: 'Category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          name: 'SubCategory',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: '/detail/:id',
          name: 'Detail',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: '/cartlist',
          component: () => import('@/views/CartList/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
