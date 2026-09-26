<template>
  <div class="min-h-screen bg-gray-50">
    <header class="p-5 bg-white shadow-sm flex gap-4">
      <router-link to="/" class="text-blue-600 font-bold hover:underline">Вітрина</router-link>
      <router-link to="/admin" class="text-red-600 font-bold hover:underline">Адмінка</router-link>
    </header>

    <main>
      <!-- Роутер сам підставить сюди HomePage або AdminPage -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>