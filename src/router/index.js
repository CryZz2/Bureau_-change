import { createRouter, createWebHistory } from 'vue-router'

import Devises from '@/components/Devises.vue'


const routes = [
  {
    path: '/',
    name: 'Devises',
    component: Devises
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
