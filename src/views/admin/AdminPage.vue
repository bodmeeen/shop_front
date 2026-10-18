<template>
  <div class="p-5 max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold mb-5 text-gray-800">Управління БД</h2>
    
    <!-- Вкладки -->
    <div class="flex border-b border-gray-200 mb-6">
      <button 
        @click="activeTab = 'products'"
        :class="activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        class="py-2 px-6 border-b-2 font-medium text-lg transition-colors"
      >
        Товари
      </button>
        
      <button 
        @click="activeTab = 'users'"
        :class="activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        class="py-2 px-6 border-b-2 font-medium text-lg transition-colors"
      >
        Користувачі
      </button>
      
      <button 
        @click="activeTab = 'orders'"
        :class="activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        class="py-2 px-6 border-b-2 font-medium text-lg transition-colors"
      >
        Замовлення
      </button>

      <button 
        @click="activeTab = 'categories'"
        :class="activeTab === 'categories' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        class="py-2 px-6 border-b-2 font-medium text-lg transition-colors"
      >
        Категорії
      </button>

    </div>

    <!-- Показується тільки якщо activeTab === 'products' -->
    <div v-if="activeTab === 'products'">
      <ProductForm @productCreated="loadProducts" />
      <hr class="my-8 border-gray-300" />
      <ProductTable :products="products" @productDeleted="loadProducts" @productRestored="loadProducts" :categories="categories" />
    </div>

    <div v-if="activeTab === 'users'">
      <UserForm @userCreated="loadUsers" />
      <hr class="my-8 border-gray-300" />
      <UserTable :users="users" @userDeleted="loadUsers" />
    </div>

    <div v-if="activeTab === 'orders'">
      <OrderTable :orders="orders" />
    </div>
    
    <div v-if="activeTab === 'categories'">
      <CategoryTable :categories="categories" />
    </div>
  </div>
    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import ProductTable from '../../components/admin/products/ProductTable.vue'
import ProductForm from '../../components/admin/products/ProductForm.vue'

import OrderTable from '../../components/admin/orders/OrderTable.vue'

import UserTable from '../../components/admin/users/UserTable.vue'
import UserForm from '../../components/admin/users/UserForm.vue'

import CategoryTable from '../../components/admin/categories/CategoryTable.vue'

// Стандартне значення
const activeTab = ref('products')

const products = ref([])
const users = ref([])
const orders = ref([])
const categories = ref([])

const loadProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    products.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження товарів:", err)
  }
}

const loadCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    categories.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження категорій:", err)
  }
}

const loadUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users')
    users.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження користувачів:", err)
  }
}

const loadOrders = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/admin_orders')
    orders.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження замовлень:", err)
  }
}

onMounted(() => {
  loadProducts()
  loadUsers()
  loadOrders()
  loadCategories()
  })
</script>