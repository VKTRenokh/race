import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/AppGarage.vue')
  },
  {
    path: '/winners',
    component: () => import('@/views/AppWinners.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
