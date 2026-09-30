import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AdminPage from './components/AdminPage.vue'
import CartPage from './components/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router