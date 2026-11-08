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
            <th class="p-3 border-b border-gray-200 font-semibold">Категорія</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Опис</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Стара ціна</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Ціна</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Кількість</th>
            <th class="p-3 border-b border-gray-200 font-semibold">Статус</th>
            <th class="p-3 border-b border-gray-200">Змінити видимість</th>
            <th class="p-3 border-b border-gray-200">Змінити кількість</th>
          </tr>
        </thead>
        <!-- divide-y автоматично малює горизонтальні лінії між рядками таблиці -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 text-gray-500">{{ product.id }}</td>
            <td class="p-3 font-medium text-gray-900">{{ product.title }}</td>
            <td class="p-3 text-gray-600">{{ getCategoryName(product.category_id) }}</td>
            <td class="p-3 text-gray-600">{{ product.body }}</td>
            <td class="p-3 text-gray-500 ">{{ product.old_price }}</td>
            <td class="p-3 text-gray-600 font-bold">{{ product.price }}</td>
            <td class="p-3 text-gray-500 font-bold">{{ product.quantity }}</td>
            <td class="p-3 text-gray-600">{{ product.status }}</td>
            <td class="text-center align-middle p-2">
              <!-- Показується кнопка "Відновити" якщо товар прихований, і "Приховати" якщо інакше -->
              <button
                v-if="product.status === 'hidden'"
                @click="restoreProduct(product.id)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors"
              > 
                Відновити
              </button>

              <button
                v-else
                @click="softDeleteProduct(product.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
              > 
                Приховати
              </button>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div class="flex items-center gap-2">
                <button 
                  @click="changeQuantity(product, product.quantity - 1)" 
                  :disabled="product.quantity === 0"
                  class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold disabled:opacity-50"
                >
                  -
                </button>

                <span class="w-8 text-center font-medium">{{ product.quantity }}</span>
                <button 
                  @click="changeQuantity(product, product.quantity + 1)"
                  class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold"
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/axios'

const emit = defineEmits(['productDeleted', 'productRestored'])

const changeQuantity = async (product: any, newQuantity: number) => {
  if (newQuantity < 0) return; // Захист від мінуса

  try {
    const response = await api.patch(`/admin/products/${product.id}/quantity`, {
      quantity: newQuantity
    });

    if (response.status >= 200 && response.status < 300) {
      // Якщо бек успішно зберіг, оновити цифру на екрані
      product.quantity = newQuantity;
    } else {
      console.error("Помилка на сервері");
    }
  } catch (err) {
    console.error("Помилка мережі:", err);
  }
}

interface Product {
  id: number;
  title: string;
  category_id: number;
  body: string;
  old_price: number;
  quantity: number;
  price: number;
  status: string
}

interface Category {
  id: number;
  title: string;
}

async function softDeleteProduct(id: any) {
    try {
    const response = await api.patch(`/products/${id}/archive`)

    if (response.status >= 200 && response.status < 300) {
      console.log("Товар усішно видалено")
      emit('productDeleted')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}

async function restoreProduct(id: any) {
    try {
    const response = await api.patch(`/products/${id}/restore`)

    if (response.status >= 200 && response.status < 300) {
      console.log("Товар усішно відновлено")
      emit('productRestored')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}

const getCategoryName = (id: number) => {
  const category = props.categories?.find(c => c.id === id);
  return category ? category.title : 'Невідомо';
}

const props = defineProps <{
  products: Product[];
  categories: Category[];
}>();
</script>