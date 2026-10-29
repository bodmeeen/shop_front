<template>
  <div 
    class="border border-gray-200 rounded-lg bg-white overflow-hidden h-full flex flex-col relative transition-all duration-300"
  >
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
        @click="$emit('add-to-cart', product)"
        :disabled="product.quantity === 0"
        :class="[
          'w-full font-bold py-2 px-4 rounded transition-colors',
          product.quantity === 0 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        ]">
        {{ product.quantity === 0 ? 'Немає в наявності' : 'В кошик' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
  quantity: number; 
}

defineProps<{
  product: Product;
  categoryName: string;
}>()

defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()
</script>