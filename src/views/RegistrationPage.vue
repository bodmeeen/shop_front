<template>
  <div class="max-w-xl mx-auto p-5">
    <h2 class="text-3xl font-bold mb-6">Реєстрація</h2>

    <div v-if="isRegistered" class="bg-green-100 text-green-800 p-6 rounded-lg text-center">
      <h3 class="text-2xl font-bold mb-2">Реєстрація успішна!</h3>
      <p>Ваш акаунт створено</p>
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
          <label class="block text-sm font-medium mb-1">Електронна адреса</label>
          <input v-model="newUser.email" type="text" required class="w-full border p-2 rounded" /> <!-- Змінити type на email коли не треба буде тестувати -->
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Пароль</label>
          <input v-model="newUser.password" type="password" required class="w-full border p-2 rounded" />
        </div>

        <div>
          <div class="flex justify-between items-end mb-1">
            <label class="block text-sm font-medium">Введіть пароль ще раз</label>
            <!-- Текст перевірки, з'являється тільки якщо користувач почав вводити другий пароль -->
            <span 
              v-if="confirmPassword.length > 0" 
              class="text-xs font-bold"
              :class="passwordsMatch ? 'text-green-600' : 'text-red-500'"
            >
              {{ passwordsMatch ? ' Паролі збігаються' : ' Паролі не збігаються' }}
            </span>
          </div>
          
          <input 
            v-model="confirmPassword" 
            type="password" 
            required 
            class="w-full border p-2 rounded transition-colors focus:outline-none focus:ring-2"
            :class="[
              confirmPassword.length === 0 ? 'border-gray-200' : 
              passwordsMatch ? 'border-green-500 focus:ring-green-200' : 'border-red-500 focus:ring-red-200'
            ]"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting || (confirmPassword.length > 0 && !passwordsMatch)"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors disabled:bg-blue-300 mt-4 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Відправка...' : 'Підтвердити' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

const router = useRouter()

const emit = defineEmits(['userCreated'])

const newUser = ref({
  firstName: '',
  email: '',
  password: '',
})

const confirmPassword = ref('')

const isSubmitting = ref(false)
const isRegistered = ref(false)

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

const passwordsMatch = computed(() => {
  return newUser.value.password === confirmPassword.value
})

async function addUser() {
  // Додатковий захист перед відправкою
  if (newUser.value.password !== confirmPassword.value) {
    alert('Паролі не збігаються!')
    return
  }

  isSubmitting.value = true;

  const payload = { 
    first_name: newUser.value.firstName,
    email: newUser.value.email,
    password: newUser.value.password,
  }
  
  try { 
    const response = await api.post('/users/registration', payload)
    const { token, user } = response.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('userRole', user.role)

    const userId = getUserIdFromToken(token)
    if (userId) {
      localStorage.setItem('userId', userId)
    }

    isRegistered.value = true
    router.push('/profile')
  } catch (error: any) {
    console.error('Помилка реєстрації:', error)
    const msg = error.response?.data?.message || 'Помилка з\'єднання з сервером'
    alert(`Помилка: ${msg}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>