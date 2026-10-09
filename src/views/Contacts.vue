<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div class="text-9xl font-extrabold text-gray-200 mb-6">Контакти</div>
    
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Наші контакти</h1>
    
    <p class="text-gray-500 mb-8 max-w-md">
        Ще контакти
    </p>
    
    <button 
      @click="goHome" 
      class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded transition-colors shadow-md"
    >
      Повернутися на головну
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>