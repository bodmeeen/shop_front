<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-5 py-10 sm:py-14">
    <div class="mb-6 sm:mb-8 flex items-center justify-between gap-3">
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Ваш кошик</h2>
      <span v-if="cart.length > 0" class="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold">
        {{ cart.length }} товарів
      </span>
    </div>
    
    <div v-if="cart.length === 0" class="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-soft">
      <p class="text-lg text-slate-600">Кошик порожній.</p>
      <router-link to="/" class="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
        Повернутися до покупок
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cart"
        :key="item.id"
        @click="goToProduct(item.id)"
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4 min-w-0">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
              <img src="/rustacean-flat-happy.svg" alt="Товар" class="h-12 w-12 object-contain" />
            </div>
            <div class="min-w-0">
              <h3 class="truncate text-base sm:text-lg font-semibold text-slate-900">{{ item.title }}</h3>
              <p class="text-sm text-slate-600">Ціна: {{ (item.price / 100).toFixed(2) }} грн</p>
            </div>
          </div>
          
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div class="flex items-center justify-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
              <button 
                @click.stop="decreaseQuantity(item)" 
                class="px-3 py-2 text-lg font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              >-</button>
              
              <span class="min-w-11 px-3 text-center font-bold border-x border-slate-200 py-2 text-slate-900">
                {{ item.quantity }}
              </span>
              
              <button 
                @click.stop="addToCart(item)" 
                class="px-3 py-2 text-lg font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              >+</button>
            </div>

            <button 
              @click.stop="removeFromCart(item)" 
              class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Видалити
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-xl sm:text-2xl font-bold text-slate-900">Разом: {{ (totalPrice / 100).toFixed(2) }} грн</div>

          <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <button 
              @click="clearCart" 
              class="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Очистити кошик
            </button>

            <button 
              @click="goToCheckout" 
              class="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-emerald-400 hover:to-green-500 transition-colors"
            >
              Оформити замовлення
            </button>
          </div>
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

function goToProduct(productId: number) {
  router.push(`/product/${productId}`)
}
</script>