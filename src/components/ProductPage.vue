<template>
  <div class="container px-5 py-24 mx-auto">
    <button 
      @click="goBack" 
      class="flex mb-8 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    >
      ← Назад
    </button>
    
    <div v-if="product" class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/rustacean-flat-happy.svg">
      
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Товар</h2>
        
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ product.title }}</h1>
        
        <p class="leading-relaxed mt-4">{{ product.body || 'Опис для цього товару відсутній.' }}</p>
        
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
        </div>
        
        <div class="flex items-center">
          <!-- Виводимо ціну -->
          <span class="title-font font-medium text-2xl text-gray-900">{{ product.price / 100}} грн</span>
          
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            @click="addToCart(product)"
            >
            Додати в кошик
          </button>
        </div>
      </div>
    </div>

    <!-- Це показується поки немає відповіді від бекенду -->
    <div v-else class="text-center text-xl mt-20 text-gray-500">
      Завантаження товару...
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCart } from '../composables/userCart'
const{ addToCart } = useCart()

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)


const goBack = () => {
    router.back()
}

interface Product {
  id: number;
  title: string;
  body: string;
  old_price: number;
  price: number;
  status: string
}


const loadProduct = async () => {
  try {
    const id = route.params.id;

    const response = await fetch(`http://localhost:3000/api/get_product_by_id/${id}`)
    product.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження товару:", err)
  }
}

onMounted(() => {
  loadProduct()
})
</script>