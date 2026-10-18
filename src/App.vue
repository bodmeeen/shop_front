<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="p-5 bg-gray-800 shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div> 
        <span class="text-xl font-bold text-white">Магазин</span>
      </div>

      <nav class="flex gap-4">
        <router-link to="/" class="text-white font-bold hover:underline">Вітрина</router-link>
        <router-link to="/cart" class="text-white font-bold hover:underline">Кошик</router-link>
        <router-link to="/register" class="text-white font-bold hover:underline">Реєстрація</router-link>
        <router-link to="/login" class="text-white font-bold hover:underline">Вхід</router-link>
        <router-link to="/admin" class="text-green-600 font-bold hover:underline">Адмінка</router-link>
      </nav>
    </header>

    <main class="flex-grow">  
      <!-- Роутер сам підставить сюди HomePage або AdminPage -->
      <router-view />
    </main>
    <footer class="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div class="container mx-auto flex flex-col items-center">
        <div class="flex flex-wrap justify-center gap-6 mb-4">
          <router-link to="/about_us" class="hover:text-white hover:underline transition-colors">Про нас</router-link>
          <router-link to="/delivery" class="hover:text-white hover:underline transition-colors">Доставка</router-link>
          <router-link to="/contact" class="hover:text-white hover:underline transition-colors">Контакти</router-link>
        </div>

        <p class="text-sm text-gray-400">
          &copy; 2026 Магазин. Всі права захищено.
        </p>

      </div>
    </footer>
  </div>
  <ToastContainer />
</template>

<script setup lang="ts">
import ToastContainer from './ToastContainer.vue'
</script>