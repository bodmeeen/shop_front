<template>
  <section class="text-gray-600 body-font bg-gray-50 min-h-screen">
    <div class="container px-4 sm:px-5 py-12 sm:py-20 md:py-24 mx-auto">
      
      <h2 class="text-2xl font-bold text-slate-900 mb-4 px-2">Категорії</h2>
      <div class="flex overflow-x-auto gap-4 mb-10 pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <router-link 
          v-for="category in categories" 
          :key="category.id"
          :to="`/category/${category.id}`"
          class="flex-shrink-0 w-36 md:w-48 border border-slate-200 rounded-2xl bg-white overflow-hidden hover:shadow-soft transition-all duration-300 group block"
        >
          <div class="h-24 md:h-32 overflow-hidden bg-slate-100">
            <img 
              :src="category.image_url ? category.image_url : '/rustacean-flat-happy.svg'" 
              :alt="category.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-3 text-center bg-gradient-to-b from-white to-slate-50">
            <h3 class="text-sm md:text-base font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
              {{ category.title }}
            </h3>
          </div>
        </router-link>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mb-6 px-2">Всі товари</h2>
      <div class="flex flex-wrap -mx-2 sm:-mx-3">
        
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="px-2 sm:px-3 py-3 w-1/2 md:w-1/3 lg:w-1/4"
        >
          <ProductCard 
            :product="product" 
            :categoryName="getCategoryName(product.category_id)"
            @add-to-cart="handleAddToCart"
          />
        </div>

      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCart } from '../composables/userCart'
import { useToast } from '@/composables/useToast'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/components/ProductCard.vue'

const { addToCart } = useCart()
const { addToast } = useToast()

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