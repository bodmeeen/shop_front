<template>
  <div class="max-w-xl mx-auto p-5">
    <h2 class="text-3xl font-bold mb-6">Оформлення замовлення</h2>

    <!-- Вікно подяки після успішної покупки -->
    <div v-if="orderSuccess" class="bg-green-100 text-green-800 p-6 rounded-lg text-center">
      <h3 class="text-2xl font-bold mb-2">Дякуємо за замовлення!</h3>
      <p>Ваше замовлення успішно створено.</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
        Повернутися на головну
      </router-link>
    </div>

    <div v-else-if="cart.length === 0" class="text-gray-500">
      Ваш кошик порожній. Немає чого оформлювати.
    </div>

    <!-- Сама форма -->
    <div v-else class="bg-gray-50 p-6 rounded-lg shadow-sm border">
      <div class="mb-4 pb-4 border-b">
        <p class="text-lg font-bold">До сплати: {{ totalPrice }} грн</p>
      </div>

      <form @submit.prevent="submitOrder" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Ім'я</label>
          <input v-model="form.firstName" type="text" required class="w-full border p-2 rounded" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Прізвище</label>
          <input v-model="form.lastName" type="text" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Телефон</label>
          <input v-model="form.phone" type="text" required class="w-full border p-2 rounded" placeholder="+380..." />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Відділення пошти / Адреса</label>
          <input v-model="form.delivery" type="text" required class="w-full border p-2 rounded" />
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors disabled:bg-blue-300 mt-4"
        >
          {{ isSubmitting ? 'Відправка...' : 'Підтвердити' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/userCart'

const { cart, clearCart } = useCart()

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  delivery: ''
})

const isSubmitting = ref(false)
const orderSuccess = ref(false)

const totalPrice = computed(() => {
  return cart.value.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
})

async function submitOrder() {
  isSubmitting.value = true

  const payload = {
    customer_first_name: form.value.firstName,
    customer_last_name: form.value.lastName,
    customer_phone: form.value.phone,
    delivery_info: form.value.delivery,
    total_price: totalPrice.value,
    items: cart.value.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }))
  }

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      orderSuccess.value = true 
      clearCart()
    } else {
      const errorData = await response.json()
      alert(`Помилка: ${errorData.message}`)
    }
  } catch (error) {
    console.error('Помилка мережі:', error)
    alert('Помилка з\'єднання з сервером')
  } finally {
    isSubmitting.value = false
  }
}
</script>