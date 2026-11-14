<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    
    <header class="bg-slate-900 text-white shadow-soft border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-3 sm:px-5 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md"></div> 
          <span class="text-lg sm:text-xl font-bold tracking-tight">Магазин</span>
        </div>

        <nav class="flex flex-wrap items-center justify-end gap-2 sm:gap-4 md:gap-6">
          <router-link to="/" class="text-slate-200 hover:text-white font-semibold text-sm sm:text-base">Вітрина</router-link>
          <router-link to="/cart" class="text-slate-200 hover:text-white font-semibold text-sm sm:text-base">Кошик</router-link>
          
          <div class="relative" ref="dropdownRef">
            <button 
              @click="toggleDropdown"
              class="flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold focus:outline-none py-1 text-sm sm:text-base"
            >
              <span>Акаунт</span>
              <svg 
                :class="['w-4 h-4 transition-transform duration-200', isDropdownOpen ? 'rotate-180' : '']" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-soft py-2 z-50 border border-slate-200 overflow-hidden">
              <router-link to="/profile" @click="closeDropdown" class="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                Кабінет користувача
              </router-link>
              
              <template v-if="!isLoggedIn">
                <router-link to="/login" @click="closeDropdown" class="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                  Вхід
                </router-link>
                <router-link to="/register" @click="closeDropdown" class="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50">
                  Реєстрація
                </router-link>
              </template>

              <template v-else>
                <div class="border-t border-slate-200 my-1"></div>
                <button @click="logout" class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                  Вийти
                </button>
              </template>
            </div>
          </div>

          <router-link 
            v-if="isAdminUser" 
            to="/admin" 
            class="text-emerald-400 hover:text-emerald-300 font-semibold text-sm sm:text-base"
          >
            Адмінка
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow">  
      <router-view />
    </main>

    <footer class="bg-slate-900 text-slate-300 py-8 mt-auto border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div class="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 text-sm sm:text-base">
          <router-link to="/about_us" class="text-slate-300 hover:text-white hover:underline transition-colors">Про нас</router-link>
          <router-link to="/delivery" class="text-slate-300 hover:text-white hover:underline transition-colors">Доставка</router-link>
          <router-link to="/contact" class="text-slate-300 hover:text-white hover:underline transition-colors">Контакти</router-link>
        </div>

        <p class="text-xs sm:text-sm text-slate-400 text-center">
          &copy; 2026 Магазин. Всі права захищено.
        </p>
      </div>
    </footer>
  </div>
  <ToastContainer />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ToastContainer from './ToastContainer.vue';

const router = useRouter();

const isLoggedIn = ref(false);
const userRole = ref<string | null>(null);

// Перевірка, чи є поточний користувач адміном
const isAdminUser = computed(() => userRole.value === 'admin');

const syncAuthState = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
  userRole.value = localStorage.getItem('userRole');
};

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  syncAuthState();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

// Закрити випадаюче меню якщо клікнути поза його межами
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

const logout = () => {
  if (confirm('Ви впевнені, що хочете вийти?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); 
    syncAuthState();
    closeDropdown(); 
    router.push('/'); 
  }
};

onMounted(() => {
  syncAuthState();
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('storage', syncAuthState);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('storage', syncAuthState);
});
</script>