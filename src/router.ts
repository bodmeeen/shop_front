import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import AdminPage from './views/admin/AdminPage.vue'
import CartPage from './views/CartPage.vue'
import CheckoutPage from './views/CheckoutPage.vue'
import ProductPage from './views/ProductPage.vue'
import Page404 from './views/Page404.vue'
import AboutUs from './views/AboutUs.vue'
import Delivery from './views/Delivery.vue'
import Contacts from './views/Contacts.vue'
import RegistrationPage from './views/RegistrationPage.vue'
import LoginPage from './views/LoginPage.vue'

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
    path: '/about_us',
    name: 'about_us',
    component: AboutUs
  },
  {
    path: '/delivery',
    name: 'delivery_info',
    component: Delivery
  },
  {
    path: '/contact',
    name: 'contacts',
    component: Contacts
  },
  {
    path: '/register',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    // Ловить всі шляхи яких не було в інших роутах, завжди повинен бути останннім
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: Page404
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router