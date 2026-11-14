<template>
  <div class="container px-4 sm:px-5 py-12 sm:py-20 md:py-24 mx-auto">
    <button 
      @click="goBack" 
      class="flex mb-8 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    >
      ← Назад
    </button>
    
    <div v-if="product && category">
      <!-- Основна картка товару -->
      <div class="lg:w-4/5 mx-auto flex flex-wrap bg-white rounded-3xl shadow-soft border border-slate-200 p-4 sm:p-6 lg:p-8">
        <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-2xl bg-slate-50 p-6" :src="resolveImageUrl(product.image_url)">
        
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h3 class="text-slate-500 text-xs tracking-[0.2em] uppercase mb-1">{{ category.title }}</h3>
          
          <h1 class="text-slate-900 text-3xl title-font font-semibold mb-1">{{ product.title }}</h1>
          
          <p class="leading-relaxed mt-4 text-slate-600">{{ product.body || 'Опис для цього товару відсутній.' }}</p>
          
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
          
          <div class="flex items-center">
            <span class="title-font font-medium text-2xl text-gray-900">{{ (product.price / 100).toFixed(2) }} грн</span>
            
            <button
              @click="handleAddToCart(product)"
              :disabled="product.quantity === 0"
              :class="[
                'flex ml-auto border-0 py-2 px-6 focus:outline-none rounded transition-colors',
                product.quantity === 0 
                  ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                  : 'text-white bg-indigo-500 hover:bg-indigo-600'
              ]">
              {{ product.quantity === 0 ? 'Немає в наявності' : 'Додати в кошик' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Секція "Схожі товари" -->
      <div v-if="similarProducts.length > 0" class="lg:w-4/5 mx-auto mt-20 pt-10 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Схожі товари</h2>

        <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:snap-none">
          <div 
            v-for="simProduct in similarProducts" 
            :key="simProduct.id"
            class="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow min-w-[220px] md:min-w-0 flex-shrink-0 snap-start md:snap-none"
          >
            <!-- Клік по картинці або назві веде на сторінку цього товару -->
            <router-link :to="`/product/${simProduct.id}`" class="block group">
              <img 
                alt="product" 
                class="w-full h-40 object-cover object-center rounded mb-4" 
                :src="resolveImageUrl(simProduct.image_url)"
              >
              <h3 class="text-gray-900 font-medium text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
                {{ simProduct.title }}
              </h3>
            </router-link>

            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span class="font-bold text-gray-900">{{ (simProduct.price / 100).toFixed(2) }} грн</span>
              
              <button
                @click="handleAddToCart(simProduct)"
                :disabled="simProduct.quantity === 0"
                :class="[
                  'text-sm py-1.5 px-3 rounded transition-colors',
                  simProduct.quantity === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white'
                ]"
              >
                {{ simProduct.quantity === 0 ? 'Немає' : 'Купити' }}
              </button>
            </div>
          </div>
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { useCart } from '../composables/userCart'

const { addToCart } = useCart()
const { addToast } = useToast()

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const category = ref<Category | null>(null)
const similarProducts = ref<Product[]>([])

const resolveImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl) return '/rustacean-flat-happy.svg'
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl
  if (imageUrl.startsWith('/')) return `http://localhost:3000${imageUrl}`
  return imageUrl
}

const goBack = () => {
  router.back()
}

interface Product {
  id: number;
  title: string;
  category_id: number;
  body: string;
  old_price: number;
  price: number;
  quantity: number;
  status: string;
  image_url?: string | null;
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const loadCategory = async (categoryId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`)
    category.value = await response.json()
  } catch (err) {
    console.error("Помилка завантаження категорії:", err)
  }
}

const normalizeProductId = (value: string | string[] | undefined): string | null => {
  const rawId = Array.isArray(value) ? value[0] : value
  if (!rawId) return null

  const normalized = Number(rawId)
  return Number.isFinite(normalized) ? String(normalized) : null
}

const loadSimilarProducts = async (productId: string | string[] | undefined) => {
  const normalizedId = normalizeProductId(productId)
  if (!normalizedId) {
    similarProducts.value = []
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/api/products/${normalizedId}/similar`)
    if (response.ok) {
      similarProducts.value = await response.json()
    }
  } catch (err) {
    console.error("Помилка завантаження схожих товарів:", err)
  }
}

const loadProduct = async () => {
  try {
    const id = normalizeProductId(route.params.id)
    if (!id) return

    const response = await fetch(`http://localhost:3000/api/products/${id}`)
    product.value = await response.json()
    
    if (product.value && product.value.category_id) {
      await Promise.all([
        loadCategory(product.value.category_id),
        loadSimilarProducts(id)
      ])
    }
  } catch (err) {
    console.error("Помилка завантаження товару:", err)
  }
}

const handleAddToCart = (item: Product) => {
  addToCart(item)
  addToast(`"${item.title}" додано до кошика!`, 'success')
}

onMounted(() => {
  loadProduct()
})

// Перезавантаження даних, якщо користувач клікнув на схожий товар і URL змінився
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      loadProduct()
    }
  }
)
</script>