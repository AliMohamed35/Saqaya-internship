<template>

    <header>
        <nav>

            <!-- BURGER MENU COMPONENT -->
            <div class="hamburger" @click="toggleNav">
                <BurgerMenu />
            </div>

            <!-- LOGO -->
            <div class="nav__logo">Logo</div>


            <!-- NAVLINKS COMPONENT -->
            <div class="backdrop" v-if="isNavOpen" @click="toggleNav"></div>
            <div class="nav__links" :class="{ 'nav__opened': isNavOpen }">
                <NavLinks @close="closeNav" />
            </div>

            <!-- CART BUTTON -->
            <CartButton @click="toggleCart" />

            <teleport to="body">
                <CartDrawer :open="isCartOpen" @close="toggleCart" />
            </teleport>
        </nav>
    </header>

</template>

<script>
import BurgerMenu from './BurgerMenu.vue';
import CartDrawer from './CartDrawer.vue'
import CartButton from './CartButton.vue'
import NavLinks from './NavLinks.vue';

export default {
    data() {

        // to control opening and closing for Nav and Cart
        return {
            isNavOpen: false,
            isCartOpen: false,
        }
    },
    methods: {
        // to toggle the Nav bar on mobile screens
        toggleNav() {
            this.isNavOpen = !this.isNavOpen
        },
        // to toggle Cart on mobile screens
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        },
        closeNav() {
            this.isNavOpen = false;
        }
    },
    components: {
        CartDrawer,
        BurgerMenu,
        CartButton,
        NavLinks
    },
}
</script>


<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav__logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #42b983;
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
