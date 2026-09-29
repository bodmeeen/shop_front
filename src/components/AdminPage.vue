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

    </div>

    <!-- Показується тільки якщо activeTab === 'products' -->
    <div v-if="activeTab === 'products'">
      <ProductForm @productCreated="loadProducts" />
      <hr class="my-8 border-gray-300" />
      <ProductTable :products="products" @productDeleted="loadProducts" />
    </div>

    <div v-if="activeTab === 'users'">
      <UserForm @userCreated="loadUsers" />
      <hr class="my-8 border-gray-300" />
      <UserTable :users="users" @userDeleted="loadUsers" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import ProductForm from './products/ProductForm.vue'
import ProductTable from './products/ProductTable.vue'

import UserForm from './users/UserForm.vue'
import UserTable from './users/UserTable.vue'


// Змінна, яка пам'ятає, яка вкладка зараз відкрита
const activeTab = ref('products')

const products = ref([])
const users = ref([])

const loadProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    products.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження товарів:", err)
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


onMounted(() => {
  loadProducts()
  loadUsers()
  })
</script>