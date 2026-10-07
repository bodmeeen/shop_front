import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AdminPage from './components/AdminPage.vue'
import CartPage from './components/CartPage.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import ProductPage from './components/ProductPage.vue'
import Page404 from './components/Page404.vue'

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
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage
  },
  {
  path: '/product/:id',
  name: 'ProductPage',
  component: ProductPage
  },
  {
  // Ловить всі шляхи яких не було в інших роутах
  path: '/:pathMatch(.*)*',
  name: 'Page404',
  component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router