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
          <p>Ціна: {{ item.price }} грн</p>
        </div>
        <div class="font-bold">
          Кількість: {{ item.quantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/userCart'

const { cart } = useCart()
</script>