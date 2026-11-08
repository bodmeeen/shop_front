<template>
    <div style="margin-bottom: 20px;">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3>Додати категорію</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input v-model="newCategory.title" placeholder="Назва категорії" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newCategory.image_url" placeholder="Посилання на фото категорії" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
        </div>
        
        <button @click="addCategory" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
          Зберегти
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/axios'

// Передача подій в App.vue
const emit = defineEmits(['categoryCreated'])

const newCategory = ref({
  title: '',
  image_url: '',
})

async function addCategory() {
    if (!newCategory.value.title || newCategory.value.title.trim() === '') {
      alert("Введіть назву категорії");
      return; }
    if (!newCategory.value.image_url || newCategory.value.image_url.trim() === '') {
      alert("Введіть посилання на фото категорії");
      return; }
    
  try {
    const response = await api.post('/categories', newCategory.value)

    if (response.status >= 200 && response.status < 300) {
      console.log("Категорію успішно створено")
      newCategory.value = { title: '', image_url: ' ' }
      emit('categoryCreated')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}
</script>