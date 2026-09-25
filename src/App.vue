<template>
  <main>
    <!-- Форма. Коли подає сигнал то запускається fetchProducts -->
    <ProductForm @productCreated="fetchProducts" />
    
    <!-- Передача масиву товарів в таблицю-->
    <ProductTable :products="products" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductForm from './components/products/ProductForm.vue';
import ProductTable from './components/products/ProductTable.vue';

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
}
// реактивна змінна
const products = ref<Product[]>([])

const newProduct = ref({
  title: '',
  body: '',
  category_id: 0,
  old_price: 0,
  price: 0,
  status: ''
})

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    products.value = await response.json()
  } catch (err) {
      console.error("Помилка завантаження: ", err)
  }
}

// Ф-я виконується автоматично при завантаженні сторінки
onMounted (() => {
  fetchProducts()
})
</script>

