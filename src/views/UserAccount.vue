<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-6 relative">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Особистий кабінет</h1>

    <div class="flex flex-col md:flex-row gap-8">
      
      <aside class="w-full md:w-64 flex-shrink-0">
        <nav class="flex flex-col space-y-1">
          <button 
            @click="activeTab = 'info'"
            :class="['text-left px-4 py-3 rounded-lg font-medium transition-colors', 
                     activeTab === 'info' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100']"
          >
            Особисті дані
          </button>
          
          <button 
            @click="activeTab = 'orders'"
            :class="['text-left px-4 py-3 rounded-lg font-medium transition-colors', 
                     activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100']"
          >
            Історія замовлень
          </button>

          <button 
            @click="logout"
            class="text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 mt-4 transition-colors"
          >
            Вийти з акаунту
          </button>
        </nav>
      </aside>

      <main class="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        
        <div v-if="activeTab === 'info'">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Ваша інформація</h2>
          
          <div class="space-y-4 max-w-md">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <div class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                {{ userEmail }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Роль</label>
              <div class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 capitalize">
                {{ userRole === 'admin' ? 'Адміністратор' : 'Покупець' }}
              </div>
            </div>

            <div class="pt-6 mt-6 border-t border-gray-100">
              <button class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Редагувати дані
              </button>
            </div>
          </div>
        </div>

        <!-- Вкладка Історія замовлень -->
        <div v-if="activeTab === 'orders'">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Ваші замовлення</h2>
          
          <div v-if="orders.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p class="text-gray-500">Ви ще нічого не замовляли.</p>
            <router-link to="/" class="mt-4 inline-block text-blue-600 font-medium hover:underline">
                Перейти до каталогу
            </router-link>
          </div>

          <div v-else class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <div 
              v-for="order in orders" 
              :key="order.id" 
              class="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow"
            >
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <span class="font-bold text-gray-900 text-lg">Замовлення #{{ order.id }}</span>
                  <span :class="getStatusColor(order.status)" class="px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {{ order.status }}
                  </span>
                </div>
                <div class="text-sm text-gray-500 mt-2 space-y-1">
                  <p>Дата: <span class="text-gray-700 font-medium">{{ formatDate(order.created_at) }}</span></p>
                  <p>Сума: <span class="text-gray-900 font-bold">{{ order.total_price / 100 }} грн</span></p>
                </div>
              </div>

              <button 
                @click="openOrderDetails(order.id)"
                class="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors whitespace-nowrap"
              >
                Деталі
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            Деталі замовлення #{{ selectedOrderId }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1">
          <div v-if="isLoadingDetails" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else-if="orderDetails">
            <div class="mb-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              <p><span class="font-semibold">Отримувач:</span> {{ orderDetails.order.customer_first_name }} {{ orderDetails.order.customer_last_name }}</p>
              <p><span class="font-semibold">Телефон:</span> {{ orderDetails.order.customer_phone }}</p>
              <p><span class="font-semibold">Доставка:</span> {{ orderDetails.order.delivery_info }}</p>
            </div>

            <h4 class="font-bold text-gray-900 mb-3">Товари:</h4>
            <ul class="divide-y divide-gray-200 border-t border-b border-gray-200">
              <li v-for="item in orderDetails.items" :key="item.product_id" class="py-3 flex justify-between items-center">
                <div>
                  <p class="font-medium text-gray-900">{{ item.title }}</p>
                  <p class="text-sm text-gray-500">Кількість: {{ item.quantity }} шт. <span class="mx-1">|</span> Арт: {{ item.product_id }}</p>
                </div>
                <div class="font-bold text-gray-900">
                  {{ item.price_at_purchase / 100 }} грн
                </div>
              </li>
            </ul>

            <div class="mt-6 flex justify-end">
              <p class="text-lg">
                Всього: <span class="font-bold text-2xl text-gray-900 ml-2">{{ orderDetails.order.total_price / 100 }} грн</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/axios'; 

const router = useRouter();

const activeTab = ref('info');

const userEmail = ref(localStorage.getItem('userEmail') || 'Невідомо');
const userRole = ref(localStorage.getItem('userRole') || 'customer');

const logout = () => {
  if (confirm('Ви впевнені, що хочете вийти?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  }
};

interface Order {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone: string;
  delivery_info: string;
  total_price: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  title: string; 
}

const isModalOpen = ref(false);
const isLoadingDetails = ref(false);
const selectedOrderId = ref<number | null>(null);
const orderDetails = ref<{ order: Order; items: OrderItem[] } | null>(null);

const orders = ref<Order[]>([]);

const fetchOrders = async () => {
  try {
    const response = await api.get('/orders');
    orders.value = response.data.data; 
  } catch (error) {
    console.error('Помилка при завантаженні замовлень:', error);
  }
};

onMounted(() => {
  fetchOrders();
});

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA'); 
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'доставлено': return 'bg-green-100 text-green-800';
    case 'в обробці': return 'bg-blue-100 text-blue-800';
    case 'скасовано': return 'bg-red-100 text-red-800';
    case 'new': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const openOrderDetails = async (orderId: number) => {
  selectedOrderId.value = orderId;
  isModalOpen.value = true;
  isLoadingDetails.value = true;
  orderDetails.value = null;

  try {
    const response = await api.get(`/orders/${orderId}`);
    orderDetails.value = response.data.data;
  } catch (error) {
    console.error('Помилка при завантаженні деталей:', error);
    alert('Не вдалося завантажити деталі замовлення');
    isModalOpen.value = false;
  } finally {
    isLoadingDetails.value = false;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedOrderId.value = null;
};
</script>