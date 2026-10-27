<template>
  <section class="text-gray-600 body-font bg-gray-50 min-h-screen">
    <div class="container px-5 py-24 mx-auto">
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 px-2">Категорії</h2>
      <div class="flex overflow-x-auto gap-4 mb-10 pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <router-link 
          v-for="category in categories" 
          :key="category.id"
          :to="`/category/${category.id}`"
          class="flex-shrink-0 w-36 md:w-48 border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-lg transition-shadow group block"
        >
          <div class="h-24 md:h-32 overflow-hidden bg-gray-100">
            <img 
              :src="category.image_url ? category.image_url : '/rustacean-flat-happy.svg'" 
              :alt="category.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-3 text-center">
            <h3 class="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ category.title }}
            </h3>
          </div>
        </router-link>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-6 px-2">Всі товари</h2>
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
          
          <div class="border border-gray-200 rounded-lg bg-white overflow-hidden h-full flex flex-col">
            
            <router-link :to="`/product/${product.id}`" class="block overflow-hidden bg-gray-100">
              <img 
                src="/rustacean-flat-happy.svg" 
                alt="Фото іграшки" 
                class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </router-link>
            
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{ getCategoryName(product.category_id) }}</h3>
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
import { useCart } from '../composables/userCart'
import { useToast } from '@/composables/useToast'

const { addToCart } = useCart()
const { addToast } = useToast()

interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
}

interface Category {
  id: number;
  title: string;
  image_url: string | null;
}

const products = ref<Product[]>([])
const categories = ref<Category[]>([])

const getCategoryName = (categoryId: number) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.title : 'Завантаження...';
}

const handleAddToCart = (product: Product) => {
  addToCart(product)
  addToast(`"${product.title}" додано до кошика!`, 'success')
}

onMounted(async () => {
  try {
    const resProducts = await fetch('http://localhost:3000/api/products')
    products.value = await resProducts.json()

    const resCategories = await fetch('http://localhost:3000/api/categories')
    categories.value = await resCategories.json()
  } catch (err) {
    console.error("Помилка завантаження вітрини:", err)
  }
})
</script>