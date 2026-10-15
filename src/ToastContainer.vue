<template>
  <!-- Фіксація контейнера у правому нижньому куті -->
  <div class="fixed z-50 flex flex-col gap-2 pointer-events-none top-20 left-5 right-5 sm:bottom-auto sm:left-auto sm:right-5 sm:top-24">
    <transition-group name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-white min-w-[250px] flex justify-between items-center"
        :class="{
          'bg-green-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'bg-blue-500': toast.type === 'info'
        }"
      >
        <span>{{ toast.message }}</span>
        <button @click="removeToast(toast.id)" class="ml-4 text-white/80 hover:text-white font-bold">
          &times;
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
/* Анімація появи та зникнення */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
</style>