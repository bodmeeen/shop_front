<template>
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

<script setup lang="ts">


interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
}

// Вказуємо що цей компонент приймає масив товарів ззовні
defineProps<{
  products: Product[]
}>();
</script>