<template>
  <div 
    @click="goToProduct"
    class="border border-slate-200 rounded-2xl bg-white overflow-hidden h-full flex flex-col relative transition-all duration-300 shadow-soft hover:-translate-y-1 hover:shadow-lg cursor-pointer"
  >
    <div class="block overflow-hidden bg-slate-50">
      <div class="h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
        <img 
          src="/rustacean-flat-happy.svg" 
          alt="Фото іграшки" 
          class="w-full h-full object-contain hover:scale-105 transition-transform duration-300 bg-white"
        />
      </div>
    </div>
    
    <div class="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
      <h3 class="text-slate-500 text-[10px] sm:text-xs tracking-[0.18em] uppercase mb-1">{{ categoryName }}</h3>
      <h2 class="text-slate-900 title-font text-base sm:text-lg font-semibold mb-2 line-clamp-2">{{ product.title }}</h2>
      <p class="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 mt-auto">{{ (product.price / 100).toFixed(2) }} грн</p>

      <button
        @click.stop="$emit('add-to-cart', product)"
        :disabled="product.quantity === 0"
        :class="[
          'w-full font-bold py-2 px-3 sm:px-4 rounded-xl transition-colors text-sm sm:text-base',
          product.quantity === 0 
            ? 'bg-slate-300 text-slate-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm'
        ]">
        {{ product.quantity === 0 ? 'Немає в наявності' : 'В кошик' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

export interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
  quantity: number; 
}

const props = defineProps<{
  product: Product;
  categoryName: string;
}>()

const router = useRouter()

const goToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()
</script>