import { ref } from 'vue'

// Можливі типи повіломлень
export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

// Глобальний стан
const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const addToast = (message: string, type: ToastType = 'success', duration: number = 3000) => {
    const id = toastId++
    toasts.value.push({ id, message, type })

    // Автоматичне видалення через заданий час
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}