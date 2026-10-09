import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import AdminPage from './views/admin/AdminPage.vue'
import CartPage from './views/CartPage.vue'
import CheckoutPage from './views/CheckoutPage.vue'
import ProductPage from './views/ProductPage.vue'
import Page404 from './views/Page404.vue'

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
  // Ловить всі шляхи яких не було в інших роутах, завжди повинен бути останннім
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