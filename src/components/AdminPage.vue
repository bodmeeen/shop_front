<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-5">Управління товарами</h2>
    
    <!-- Вставлення форми. Коли збережено, викликається loadProducts -->
    <ProductForm @productCreated="loadProducts" />
    
    <hr class="my-8 border-gray-300" />

    <!-- Вставлення таблиці, та передача в неї товарів -->
    <ProductTable :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'


import ProductForm from './products/ProductForm.vue'
import ProductTable from './products/ProductTable.vue'

const products = ref([])

// Ф-я для get
const loadProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    products.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження товарів:", err)
  }
}

// Завантаження таблиці при відкритті сторінки
onMounted(loadProducts)
</script>