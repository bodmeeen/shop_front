<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="p-5 bg-white shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div> 
        <span class="text-xl font-bold text-gray-800">Магазин</span>
      </div>

      <nav class="flex gap-4">
        <router-link to="/" class="text-blue-600 font-bold hover:underline">Вітрина</router-link>
        <router-link to="/admin" class="text-red-600 font-bold hover:underline">Адмінка</router-link>
        <router-link to="/cart" class="text-yellow-600 font-bold hover:underline">Кошик</router-link>
      </nav>
    </header>

    <main class="flex-grow">
      <!-- Роутер сам підставить сюди HomePage або AdminPage -->
      <router-view />
    </main>
    <footer class="bg-gray-600 text-white text-center py-6">
      <p>&copy; 2026</p>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>