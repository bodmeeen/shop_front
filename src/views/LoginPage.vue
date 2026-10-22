<template>
  <div class="max-w-xl mx-auto p-5">
    <h2 class="text-3xl font-bold mb-6">Вхід</h2>

    <div v-if="isConfirmed" class="bg-green-100 text-green-800 p-6 rounded-lg text-center">
      <h3 class="text-2xl font-bold mb-2">Вхід успішний!</h3>
      <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
        Повернутися на головну
      </router-link>
    </div>
    <div v-else class="bg-gray-50 p-6 rounded-lg shadow-sm border">
      <div class="mb-4 pb-4 border-b">
        <p class="text-lg font-bold">Введіть електронну адресу та пароль для входу </p>
      </div>

      <form @submit.prevent="authUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Електронна адреса</label>
          <input v-model="loginUser.email" type="text" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Пароль</label>
          <input v-model="loginUser.password" type="password" required class="w-full border p-2 rounded" />
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

const emit = defineEmits(['userConfirmed'])

const loginUser = ref({
  email: '',
  password: '',
})

interface LoginResponse {
  status: string;
  data: {
    token: string;
    user: {
      email: string;
    }
  }
}

const isSubmitting = ref(false)
const isConfirmed = ref(false)

async function authUser() {
  isSubmitting.value = true;

  const payload = { 
    email: loginUser.value.email,
    password: loginUser.value.password,
  }
try { 
    const response = await fetch('http://localhost:3000/api/users_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      const responseData = (await response.json()) as LoginResponse;
      
      localStorage.setItem('token', responseData.data.token);
      localStorage.setItem('userEmail', responseData.data.user.email); 

      isConfirmed.value = true;
    } else {
      const errorData = await response.json() as { message: string }; 
      alert(`Помилка: ${errorData.message}`);
    }
    } catch (error) {
    console.error('Помилка мережі:', error)
    alert('Помилка з\'єднання з сервером')
  } finally {
    isSubmitting.value = false
  }
}
</script>