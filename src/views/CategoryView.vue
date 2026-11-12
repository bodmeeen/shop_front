<template>
  <section class="text-gray-600 body-font bg-gray-50 min-h-screen">
    <div class="container px-5 py-24 mx-auto">
      
     <button 
        @click="goBack" 
        class="flex mb-8 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
      >
        ← Назад
      </button>

      <div v-if="products.length === 0" class="text-center py-20">
        <h3 class="text-xl text-gray-500">У цій категорії поки немає товарів</h3>
      </div>

      <div v-else class="flex flex-wrap -m-4">
        
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="p-4 w-1/2 md:w-1/3 lg:w-1/4"
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
import { useRoute } from 'vue-router'
import { useCart } from '../composables/userCart'
import { useToast } from '@/composables/useToast'
import router from '@/router'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const { addToCart } = useCart()
const { addToast } = useToast()

interface Category {
  id: number;
  title: string;
  image_url: string | null;
}

interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
  quantity: number; 
}

const categories = ref<Category[]>([])
const products = ref<Product[]>([])

const goBack = () => {
    router.back()
}

const getCategoryName = (categoryId: number) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.title : 'Завантаження...';
}

const handleAddToCart = (product: Product) => {
  addToCart(product)
  addToast(`"${product.title}" додано до кошика!`, 'success')
}

onMounted(async () => {
  const categoryId = route.params.id

  try {
    const resProducts = await fetch(`http://localhost:3000/api/products/category/${categoryId}`)
    products.value = await resProducts.json()

    const resCategories = await fetch('http://localhost:3000/api/categories')
    categories.value = await resCategories.json()
  } catch (err) {
    console.error("Помилка завантаження товарів категорії:", err)
  }
})
</script>