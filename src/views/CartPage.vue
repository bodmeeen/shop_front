<template>
  <div class="p-5 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-5">Ваш кошик</h2>
    
    <div v-if="cart.length === 0" class="text-gray-500">
      Кошик порожній.
    </div>

    <div v-else>
      <div v-for="item in cart" :key="item.id" class="border p-4 mb-4 flex justify-between items-center rounded shadow-sm">
        
        <div>
          <h3 class="font-bold text-lg">{{ item.title }}</h3>
          <p class="text-gray-600">Ціна: {{ item.price / 100 }} грн</p>
        </div>
        
        <!-- Керування к-стю та видаленням -->
        <div class="flex items-center gap-4">
          
          <!-- Блок +- -->
          <div class="flex items-center border rounded">
            <button 
              @click="decreaseQuantity(item)" 
              class="px-3 py-1 hover:bg-gray-100 font-bold transition-colors"
            >-</button>
            
            <span class="px-3 font-bold border-l border-r py-1">
              {{ item.quantity }}
            </span>
            
            <button 
              @click="addToCart(item)" 
              class="px-3 py-1 hover:bg-gray-100 font-bold transition-colors"
            >+</button>
          </div>

          <button 
            @click="removeFromCart(item)" 
            class="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Видалити
          </button>
          
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center border-t pt-4">
        <div class="text-xl font-bold">Разом: {{ totalPrice / 100}} грн</div>
        <button 
          @click="goToCheckout" 
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Оформити замовлення
        </button>
        <div class="mt-6 flex justify-between items-center border-t pt-4">
        <button 
          @click="clearCart" 
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Очистити кошик
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/userCart'


const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart()
const router = useRouter()

const totalPrice = computed(() => {
  return cart.value.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
})

function goToCheckout() {
  router.push('/checkout')
}
</script>