<template>
    <!-- backdrop is always applied to the div but backdrop--visible will only apply if open is true-->
    <div :class="['backdrop', { 'backdrop--visible': open }]" @click.self="$emit('close')">
        <div :class="['cart', { showCart: open }]">
            <h4 class="cart__title">Cart</h4>
            <p>Your cart is empty....</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        open: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style>
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
    background-color: blanchedalmond;
    height: 100vh;
    position: fixed;
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
    font-size: 1.5rem;
}

.cart.showCart {
    transform: translateX(0);
}
</style>