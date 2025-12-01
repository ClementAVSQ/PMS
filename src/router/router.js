import { createRouter, createWebHistory } from 'vue-router'

import Homepage from '../views/homepage.vue'
import contact from '../views/contact.vue'


const routes = [
  { path: '/', name: 'Homepage', component: Homepage },
  { path: '/contact', name: 'contact', component: contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
