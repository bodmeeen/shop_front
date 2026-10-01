<template>
  <div class="p-5 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-5">Ваш кошик</h2>
    
    <div v-if="cart.length === 0" class="text-gray-500">
      Кошик порожній.
    </div>

    <div v-else>
      <div v-for="item in cart" :key="item.id" class="border p-4 mb-2 flex justify-between">
        <div>
          <h3 class="font-bold">{{ item.title }}</h3>
          <p>Ціна: {{ item.price / 100 }} грн</p>
        </div>
        <div class="font-bold">
          Кількість: {{ item.quantity }}
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/userCart'

const { cart } = useCart()
const router = useRouter()


const totalPrice = computed(() => {
  return cart.value.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
})

function goToCheckout() {
  router.push('/checkout')
}
</script>