<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../../store/cart';
import BurgerMenu from './BurgerMenu.vue';
import CartDrawer from './CartDrawer.vue';
import CartButton from './CartButton.vue';
import NavLinks from './NavLinks.vue';

// Pinia cart store instance
const cartStore = useCartStore();

// Reactive data
const isNavOpen = ref(false);
const isCartOpen = ref(false);

// Methods
const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value;
};

// toggles the cart to close or open
const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};

// closes the navBar whenever any nav link is pressed
const closeNav = () => {
    isNavOpen.value = false;
};

// fetches the added products from Pinia store state to render in the cart
const cartTotal = computed(() => {
    return cartStore.cartItems.length;
});
</script>

<template>

    <header>
        <nav>

            <!-- BURGER MENU COMPONENT -->
            <div class="hamburger" @click="toggleNav">
                <BurgerMenu />
            </div>

            <!-- LOGO -->
            <div class="nav__logo"><router-link to="/">LOGO</router-link></div>


            <!-- NAVLINKS COMPONENT -->
            <div class="backdrop" v-if="isNavOpen" @click="toggleNav"></div>
            <NavLinks @close="closeNav" :open="isNavOpen" />

            <!-- CART BUTTON -->
            <!-- Will add cart length counter -->
            <div style="position: relative; display: inline-block;">
                <CartButton @click="toggleCart" />
                <span v-if="cartTotal >= 0" class="cart__badge">{{ cartTotal }}</span>
            </div>

            <!-- CART COMPONENT -->
            <teleport to="body">
                <CartDrawer :open="isCartOpen" @close="toggleCart" />
            </teleport>
        </nav>
    </header>

</template>


<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav__logo a {
    font-size: 1.8rem;
    font-weight: bold;
    color: #42b983;
    text-decoration: none;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 98;
}

.hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 20px;
    padding: 0;
    z-index: 100;
}

.cart__badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: bold;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

@media(max-width:768px) {
    .hamburger {
        display: flex;
    }

    .nav__links {
        display: flex;
        align-items: flex-start;
        position: fixed;
        top: 0;
        left: -100%;
        width: 70%;
        height: 100vh;
        background-color: antiquewhite;
        flex-direction: column;
        padding: 40px 20px;
        transition: left 0.3s ease;
        z-index: 99;
    }

    .nav__links.nav__opened {
        left: 0;
    }
}
</style>
