<script lang="ts" setup>
import { computed } from 'vue';
import { useCartStore } from '../../store/cart';

// Define props
defineProps<{
    open: boolean;
}>();

// Define emits
const emit = defineEmits<{
    close: [];
}>();

// Pinia cart store instance
const cartStore = useCartStore();

// Computed properties
const cartItems = computed(() => {
    return cartStore.cartItems;
});

// Methods
const removeFromCart = (productId: number) => {
    cartStore.removeProductFromCart(productId);
};
</script>

<template>
    <!-- backdrop is always applied to the div but backdrop--visible will only apply if open is true-->
    <div :class="['backdrop', { 'backdrop--visible': open }]" @click.self="emit('close')">
        <div :class="['cart', { showCart: open }]">
            <h4 class="cart__title">Cart</h4>

            <!-- PlaceHolder if the cart is empty -->
            <p v-if="cartItems.length === 0">Your cart is empty....</p>

            <ul class="item__list">
                <!-- LOOPS OVER ITEMS FROM $STORE STATE -->
                <li class="list__item" v-for="item in cartItems" :key="item.id">
                    <div class="card">
                        <h3>{{ item.title }}</h3>
                        <p>x {{ item.quantity }}</p>
                        <p>Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>

                        <!-- this function executes the action in store and then the store fires the mutation responsible for the delete -->
                        <button class="item__button" @click="removeFromCart(item.id)">Remove</button>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.234);
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 1000;
}

.backdrop--visible {
    opacity: 1;
    pointer-events: auto;
}

.cart {
    width: 300px;
    background-color: white;
    border-left: 2px solid black;
    height: 100vh;
    position: fixed;
    overflow: scroll;
    right: 0;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
}

.cart__title {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.cart p {
    font-size: 1rem;
    margin-top: 1rem;
}

.cart.showCart {
    transform: translateX(0);
}

.item__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.list__item {
    padding: 10px;
    border: 2px solid black;
    margin-bottom: 1rem;
}

.item__button {
    width: 100%;
    margin-top: 1rem;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
    font-size: 1rem;
}
</style>