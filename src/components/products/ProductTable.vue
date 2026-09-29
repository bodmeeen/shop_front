<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">Таблиця товарів</h1>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <th class="p-3 border-b border-gray-200 font-semibold">ID</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Назва</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Опис</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Стара ціна</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Ціна</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Статус</th>
            <th class="p-3 border-b border-gray-200"></th>
          </tr>
        </thead>
        <!-- divide-y автоматично малює горизонтальні лінії між рядками таблиці -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 text-gray-500">{{ product.id }}</td>
            <td class="p-3 font-medium text-gray-900">{{ product.title }}</td>
            <td class="p-3 text-gray-600">{{ product.body }}</td>
            <td class="p-3 text-gray-500 ">{{ product.old_price }}</td>
            <td class="p-3 text-gray-600 font-bold">{{ product.price }}</td>
            <td class="p-3 text-gray-600">{{ product.status }}</td>
            <td class="text-center align-middle p-2">
              <button
               @click="deleteProduct(product.id)"
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

// тут css
<style> 
</style>

<script setup lang="ts">

const emit = defineEmits(['productDeleted'])


interface Product {
  id: number;
  title: string;
  body: string;
  old_price: number;
  price: number;
  status: ''
}

async function deleteProduct(id: any) {
    try { 
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log("Товар усішно видалено")
      emit('productDeleted')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}

// Вказуємо що цей компонент приймає масив товарів ззовні
defineProps<{
  products: Product[]
}>();
</script>