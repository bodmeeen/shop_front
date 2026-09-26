<template>
  <section class="text-gray-600 body-font bg-gray-50 min-h-screen">
    <div class="container px-5 py-24 mx-auto">
      
      <div class="flex flex-wrap -m-4">
        
        <!-- адаптивна ширина -->
        <!-- 
          w-1/2     = 2 товари (на мобільному)
          sm:w-1/2   = 4 товари (на планшеті)
          lg:w-1/4   = 4 товари (на стандартному ноуті)
          xl:w-1/4   = 4 товари (на широкому моніторі)
        -->
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="p-4 w-1/2 md:w-1/3 lg:w-1/4"
        >
          
          <div class="border border-gray-200 rounded-lg bg-white overflow-hidden h-full">
            
            <a class="block relative h-48 border-b border-gray-100">
              <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260">
            </a>
            
            <div class="p-5">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">КАТЕГОРІЯ {{ product.category_id }}</h3>
              <h2 class="text-gray-900 title-font text-lg font-medium">{{ product.title }}</h2>
              <p class="mt-2 text-lg font-bold text-gray-900">{{ product.price / 100 }} грн</p>
            </div>
            
          </div>
          
        </div>

      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
}

// Збереження даних
const products = ref<Product[]>([])

// Функція, яка завантажить товари з бекенду при відкритті сторінки
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    products.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження вітрини:", err)
  }
})
</script>