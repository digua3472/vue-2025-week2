import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/week1',
      name: 'week1',
      component: () => import('../views/Week1View.vue'),
    },
    {
      path: '/week2',
      name: 'week2',
      component: () => import('../views/Week2View.vue'),
    },
  ],
})

export default router
