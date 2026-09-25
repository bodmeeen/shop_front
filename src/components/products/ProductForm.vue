<template>
    <div style="margin-bottom: 20px;">
      <h3>Додати товар</h3>
      <!-- v-model пов'язує надрукований текст зі змінною newProduct.title -->
      <input v-model="newProduct.title" placeholder="Назва товару" />
      
      <input v-model="newProduct.body" placeholder="Опис товару" />
      <input v-model.number="newProduct.category_id" type="number" placeholder="Категорія товару" />
      <input v-model.number="newProduct.old_price" type="number" placeholder="Стара ціна" />
      <!-- .number автоматично перетворює введений текст на число -->
      <input v-model.number="newProduct.price" type="number" placeholder="Ціна" />
      <input v-model="newProduct.status" placeholder="Статус" />


      <button @click="addProduct">Зберегти</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Передача подій в App.vue
const emit = defineEmits(['productCreated'])

const newProduct = ref({
  title: '',
  body: '',
  category_id: 0,
  old_price: 0,
  price: 0,
  status: ''
})

async function addProduct() {
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
      newProduct.value = { title: '', body: '', category_id: 0, old_price: 0, price: 0, status: ''}
      emit('productCreated')
      // Тут треба оновлювати список товарів щоб новий з'явився в таблиці
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }
}
</script>