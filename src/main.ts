import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

// Імпортування налаштувань роутера
import router from './router'

import { useToast } from './composables/useToast.ts'

const { addToast } = useToast();

const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await originalFetch(input, init);

    if (response.status === 429) {
        addToast("Забагато дій. Чекай", 'error', 4000);

        throw new Error("Rate limit exceeded (429)");
    }
    return response;
};

// Створення додатку та тимчасовий запис його в змінну
const app = createApp(App)

// Об'єднання додатка з роутером
app.use(router)

// Запуск додатку та відображення його на сторінці
app.mount('#app')