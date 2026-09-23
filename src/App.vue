<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
}
// реактивна змінна
const products = ref<Product[]>([])

const newProduct = ref({
  title: '',
  body: '',
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
      newProduct.value = { title: '', body: '', old_price: 0, price: 0, status: ''}
      // Тут треба оновлювати список товарів щоб новий з'явився в таблиці
    } else {
      console.error("Бекенд повернув помилку")
    }
  } catch (err) {
      console.error("Помилка мережі: ", err)
  }


}

// Ф-я виконується автоматично при завантаженні сторінки
onMounted (async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const data = await response.json()

    // Отримання даних з бек
    products.value = data

  } catch (err) {
      console.error("Помилка завантаження: ", err)
  }
})
</script>

<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>Додати товар</h3>
      <!-- v-model пов'язує надрукований текст зі змінною newProduct.title -->
      <input v-model="newProduct.title" placeholder="Назва товару" />
      
      <input v-model="newProduct.body" placeholder="Опис товару" />
      <input v-model.number="newProduct.old_price" type="number" placeholder="Стара ціна" />
      <!-- .number автоматично перетворює введений текст на число -->
      <input v-model.number="newProduct.price" type="number" placeholder="Ціна" />
      <input v-model="newProduct.status" placeholder="Статус" />


      <button @click="addProduct">Зберегти</button>
    </div>
  </div>


  <div>
    <h1>Таблиця товарів</h1>
    
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Ціна</th>
        </tr>
      </thead>
      <tbody>
        <!-- Цей рядок буде повторюватися для кожного товару -->
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.body }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

// тут css
<style> 
</style>
