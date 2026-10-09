<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">Таблиця користувачів</h1>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <th class="p-3 border-b border-gray-200 font-semibold">ID</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Ім'я</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Прізвище</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Роль</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Електронна адреса</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Хеш пароля</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Номер телефону</th>
            <th class="p-3 border-b border-gray-200"></th>
          </tr>
        </thead>
        <!-- divide-y автоматично малює горизонтальні лінії між рядками таблиці -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 text-gray-500">{{ user.id }}</td>
            <td class="p-3 font-medium text-gray-900">{{ user.first_name }}</td>
            <td class="p-3 text-gray-600">{{ user.last_name }}</td>
            <td class="p-3 text-gray-500 ">{{ user.role }}</td>
            <td class="p-3 text-gray-600 font-bold">{{ user.email }}</td>
            <td class="p-3 text-gray-600 font-bold">{{ user.password_hash}}</td>
            <td class="p-3 text-gray-600 font-bold">{{ user.phone_number }}</td>
            <td class="text-center align-middle p-2">
              <button
               @click="deleteUser(user.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"> 
                Видалити
              </button>
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['userDeleted'])

interface User {
  id: number,
  first_name: string,
  last_name: string,
  role: string,
  email: string,
  password_hash: string,
  phone_number: string
}

async function deleteUser(id: any) {
    try { 
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log("Користувача усішно видалено")
      emit('userDeleted')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}

// Вказуємо що цей компонент приймає масив товарів ззовні
defineProps<{
  users: User[]
}>();
</script>