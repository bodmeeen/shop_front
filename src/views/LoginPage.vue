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
import api from '@/axios'

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
      role: string;
    }
  }
}

const isSubmitting = ref(false)
const isConfirmed = ref(false)

function getUserIdFromToken(token: string): string {
  if (!token) return '';

  const payloadPart = token.split('.')[1];
  if (!payloadPart) return '';

  try {
    const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const payload = JSON.parse(atob(padded));
    return payload.sub ? String(payload.sub) : '';
  } catch {
    return '';
  }
}

async function authUser() {
  isSubmitting.value = true;

  const payload = { 
    email: loginUser.value.email,
    password: loginUser.value.password,
  }
  
  try { 
    // axios замість fetch
    const response = await api.post<LoginResponse>('/users/login', payload)

    // Axios сам розпаковує JSON
    const { token, user } = response.data.data;
      
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', user.email); 
    localStorage.setItem('userRole', user.role);

    const userId = getUserIdFromToken(token);
    if (userId) {
      localStorage.setItem('userId', userId);
    }

    isConfirmed.value = true;
  } catch (error: any) {
    console.error('Помилка:', error)
    const msg = error.response?.data?.message || 'Помилка з\'єднання з сервером';
    alert(`Помилка: ${msg}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>