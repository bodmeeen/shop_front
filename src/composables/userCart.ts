import { ref, watch } from 'vue'

// дістається збережений стан з пам'яті браузера
const savedCart = localStorage.getItem('my_cart')

// якщо є дані то парсяться, якщо ні то створюється порожній масив
const cart = ref(savedCart ? JSON.parse(savedCart) : [])

// автоматичний перезапис кошика при будь-якій зміні
watch (cart, (newCart) => {
    localStorage.setItem('my_cart', JSON.stringify(newCart))
},
{ deep: true }) // deep: true стежить за зміною кількості вкладений полів

function addToCart (product: any) {
    const existingItem = cart.value.find((item: any) => item.id === product.id)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.value.push({ ...product, quantity: 1 })
    }
}

function clearCart() {
    cart.value = []
}

export function useCart() {
    return { cart, addToCart, clearCart }
}
