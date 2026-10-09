<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">Таблиця замовлень </h1>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <th class="p-3 border-b border-gray-200 font-semibold">ID</th>
            <th class="p-3 border-b border-gray-200 font-semibold">ID клієнта</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Ім'я клієнта</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Прізвище клієнта</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Номер телефону</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Дані для доставки</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Занальна сума</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Статус</th>
            <th class="p-3 border-b border-gray-200"></th>
          </tr>
        </thead>
        <!-- divide-y автоматично малює горизонтальні лінії між рядками таблиці -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 text-gray-500">{{ order.id }}</td>
            <td class="p-3 font-medium text-gray-900">{{ order.user_id }}</td>
            <td class="p-3 text-gray-600">{{ order.customer_first_name }}</td>
            <td class="p-3 text-gray-500 ">{{ order.customer_last_name }}</td>
            <td class="p-3 text-gray-600 font-bold">{{ order.customer_phone }}</td>
            <td class="p-3 text-gray-600">{{ order.delivery_info }}</td>
            <td class="p-3 text-gray-600">{{ order.total_price }}</td>
            <td class="p-3 text-gray-600">{{ order.status }}</td>
            <!-- <td class="text-center align-middle p-2"> -->
              <!-- <button
               @click="deleteOrder(order.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"> 
                Видалити
              </button> -->
             <!-- </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

// const emit = defineEmits(['orderDeleted'])


interface Order {
  id: number,
  user_id: string,
  customer_first_name: string,
  customer_last_name: string,
  customer_phone: string,
  delivery_info: string,
  total_price: number,
  status: string
}

// async function deleteOrder(id: any) {
//     try { 
//     const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })

//     if (response.ok) {
//       console.log("Замовлення усішно видалено")
//       emit('orderDeleted')
//     } else {
//       console.error("Бекенд повернув помилку")
//     }
//   } catch (err) {
//       console.error("Помилка мережі: ", err)
//   }
// }

// Вказуємо що цей компонент приймає масив товарів ззовні
defineProps<{
  orders: Order[]
}>();
</script>