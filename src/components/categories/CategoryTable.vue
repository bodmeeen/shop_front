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
            <th class="p-3 border-b border-gray-200 font-semibold">Посилання на картинку</th>
          </tr>
        </thead>
        <!-- divide-y автоматично малює горизонтальні лінії між рядками таблиці -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50 transition-colors">
            <td class="p-3 text-gray-500">{{ category.id }}</td>
            <td class="p-3 font-medium text-gray-900">{{ category.title }}</td>
            <td class="p-3 text-gray-600">{{ category.image_url }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style> 
</style>

<script setup lang="ts">

interface Category {
  id: number;
  title: string;
  image_url: string;
}

// Вказуємо що цей компонент приймає масив товарів ззовні
defineProps<{
  categories: Category[]
}>();
</script>