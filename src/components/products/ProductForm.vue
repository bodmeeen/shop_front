<template>
    <div style="margin-bottom: 20px;">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3>Додати товар</h3>
        <!-- v-model пов'язує надрукований текст зі змінною newProduct.title -->
        <!-- .number автоматично перетворює введений текст на число -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input v-model="newProduct.title" placeholder="Назва товару" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newProduct.body" placeholder="Опис товару" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model.number="newProduct.old_price" type="number" placeholder="Стара ціна" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model.number="newProduct.price" type="number" placeholder="Ціна" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
          <input v-model="newProduct.status" placeholder="Статус" class="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
        </div>
        
        <button @click="addProduct" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors">
          Зберегти
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Передача подій в App.vue
const emit = defineEmits(['productCreated'])

const newProduct = ref({
  title: '',
  body: '',
  old_price: null,
  price: null,
  status: ''
})

async function addProduct() {
    if (!newProduct.value.title || newProduct.value.title.trim() === '') {
      alert("Введіть назву товару");
      return; }
    if (!newProduct.value.body || newProduct.value.body.trim() === '') {
      alert("Введіть опис товару");
      return; }
    if (!newProduct.value.price || newProduct.value.price < 0) {
      alert("Введіть ціну товару");
      return; }
    if (!newProduct.value.status || newProduct.value.status.trim() === '') {
      alert("Введіть статус товару");
      return; }
  try { 
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct.value)
    })

    if (response.ok) {
      console.log("Товар усішно створено")
      newProduct.value = { title: '', body: '', old_price: null, price: null, status: ''}
      emit('productCreated')
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}
</script>