<template>
  <div class="max-w-xl mx-auto p-5">
    <h2 class="text-3xl font-bold mb-6">Оформлення замовлення</h2>

    <div v-if="isRegistered" class="bg-green-100 text-green-800 p-6 rounded-lg text-center">
      <h3 class="text-2xl font-bold mb-2">Реєстрація успішна!</h3>
      <p>Ваш акаунт створено.</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
        Повернутися на головну
      </router-link>
    </div>
    <div v-else class="bg-gray-50 p-6 rounded-lg shadow-sm border">
      <div class="mb-4 pb-4 border-b">
        <p class="text-lg font-bold">Введіть свої дані для реєстрації тут </p>
      </div>

      <form @submit.prevent="addUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Ім'я</label>
          <input v-model="newUser.firstName" type="text" required class="w-full border p-2 rounded" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Прізвище</label>
          <input v-model="newUser.lastName" type="text" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Пароль</label>
          <input v-model="newUser.password" type="password" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Електронна адреса</label>
          <input v-model="newUser.email" type="text" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Номер телефону</label>
          <input v-model="newUser.phone" type="text" required class="w-full border p-2 rounded" placeholder="+380..." />
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
import { ref } from 'vue'

const emit = defineEmits(['userCreated'])

const newUser = ref({
  firstName: '',
  lastName: '',
  role: '',
  email: '',
  password: '',
  phone: '',
})

const isSubmitting = ref(false)
const isRegistered = ref(false)


async function addUser() {
  isSubmitting.value = true;

  const payload = { 
    first_name: newUser.value.firstName,
    last_name: newUser.value.lastName,
    role: "user",
    email: newUser.value.email,
    password: newUser.value.password,
    phone_number: newUser.value.phone,
  }
  try { 
    const response = await fetch('http://localhost:3000/api/users_reg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      isRegistered.value = true
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