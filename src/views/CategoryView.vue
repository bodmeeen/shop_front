<template>
  <section class="text-gray-600 body-font bg-gray-50 min-h-screen">
    <div class="container px-5 py-24 mx-auto">
      
      <!-- Заголовок категорії та кнопка назад -->
      <div class="flex items-center justify-between mb-8 px-2">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ categoryName }}
        </h2>
        <router-link to="/" class="text-blue-600 hover:text-blue-800 font-medium">
          &larr; Назад на головну
        </router-link>
      </div>

      <div v-if="products.length === 0" class="text-center py-20">
        <h3 class="text-xl text-gray-500">У цій категорії поки немає товарів</h3>
      </div>

      <div v-else class="flex flex-wrap -m-4">
        
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="p-4 w-1/2 md:w-1/3 lg:w-1/4"
        >
          <div class="border border-gray-200 rounded-lg bg-white overflow-hidden h-full flex flex-col">
            
            <router-link :to="`/product/${product.id}`" class="block overflow-hidden bg-gray-100">
              <img 
                src="/rustacean-flat-happy.svg" 
                alt="Фото іграшки" 
                class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </router-link>
            
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{ categoryName }}</h3>
              <h2 class="text-gray-900 title-font text-lg font-medium mb-2">{{ product.title }}</h2>
              <p class="text-xl font-bold text-gray-900 mb-4 mt-auto">{{ (product.price / 100).toFixed(2) }} грн</p>

              <button
                @click="handleAddToCart(product)"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                В кошик
              </button>
            </div>
            
          </div>
        </div>

      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/userCart'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const { addToCart } = useCart()
const { addToast } = useToast()

interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
}

const products = ref<Product[]>([])
const categoryName = ref<string>('Товари категорії')

const handleAddToCart = (product: Product) => {
  addToCart(product)
  addToast(`"${product.title}" додано до кошика!`, 'success')
}

onMounted(async () => {
  const categoryId = route.params.id

  try {
    const resProducts = await fetch(`http://localhost:3000/api/get_products_by_category_id/${categoryId}`)
    products.value = await resProducts.json()
  } catch (err) {
    console.error("Помилка завантаження товарів категорії:", err)
  }
})
</script>