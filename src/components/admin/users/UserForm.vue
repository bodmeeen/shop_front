<template>
    <div style="margin-bottom: 20px;">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3>Додати користувача</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input v-model="newUser.first_name" placeholder="Ім'я користувача" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newUser.last_name" placeholder="Прізвище користувача" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newUser.role" placeholder="Роль" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newUser.email" placeholder="Електронна адреса" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newUser.password_hash" placeholder="Хеш пароля" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newUser.phone_number" placeholder="Номер телефону" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
        </div>
        
        <button @click="addUser" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
          Зберегти
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Передача подій
const emit = defineEmits(['userCreated'])

const newUser = ref({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    password_hash: '',
    phone_number: ''
})

async function addUser() {
    if (!newUser.value.first_name || newUser.value.first_name.trim() === '') {
      alert("Введіть ім'я користувача");
      return; }
    if (!newUser.value.last_name || newUser.value.last_name.trim() === '') {
      alert("Введіть прізвище користувача");
      return; }
  try { 
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser.value)
    })

    if (response.ok) {
      console.log("Користувача успішно додано")
      newUser.value = { first_name: '', last_name: '', role: '', email: '', password_hash: '', phone_number: ''}
      emit('userCreated')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}
</script>