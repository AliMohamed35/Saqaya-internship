<template>
    <header>
        <nav class="nav">
            <button class="nav__hamburger" @click="toggleNav">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="nav__links" :class="{ 'nav__links--active': isNavOpen }">
                <div class="nav__logo">Logo</div>
                <ul class="nav__list">
                    <li class="nav__item" @click="toggleNav"><router-link class="nav__link" to="/">Home</router-link>
                    </li>
                    <li class="nav__item" @click="toggleNav"><router-link class="nav__link"
                            to="/products">Products</router-link></li>
                    <li class="nav__item" @click="toggleNav"><router-link class="nav__link" to="/contact">Contact
                            us</router-link></li>
                </ul>
            </div>

            <div class="nav__logo-mob">Logo</div>
            <div class="nav__right-items" style="display: flex; align-items: center;">
                <a href="#" class="nav__signin-link">Sign in</a>

                <div style="position: relative; display: inline-block;">
                    <CartButton @click="toggleCart" />
                    <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
                </div>

                <teleport to="body">
                    <CartDrawer :open="isCartOpen" @close="toggleCart" />
                </teleport>
            </div>
        </nav>
    </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import CartDrawer from './CartDrawer.vue'
import CartButton from './CartButton.vue'



export default defineComponent({
    data() {
        return {
            isNavOpen: false,
            isCartOpen: false
        }
    },

    components: {
        CartDrawer,
        CartButton,

    },

    mounted() {
        // Add resize event listener to close menu on resize
        window.addEventListener('resize', this.handleResize)
    },

    beforeUnmount() {
        // Clean up event listener when component is destroyed
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        toggleNav(): void {
            this.isNavOpen = !this.isNavOpen
        },
        toggleCart(): void {
            this.isCartOpen = !this.isCartOpen;
        },
        handleResize(): void {
            // Close the navigation menu when window is resized
            if (this.isNavOpen) {
                this.isNavOpen = false
                const navLinks = document.querySelector('.nav-links')
                if (navLinks) {
                    navLinks.classList.remove('active')
                }
            }
        }
    },

    computed: {
        cartCount(): number {
            return this.$store.getters['cart/cartItems'].length;
        }
    }
})
</script>



<style scoped>
.nav {
    /* background-color: antiquewhite; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    position: relative;
    border-bottom: 3px solid black;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.109);
}

.nav__links {
    display: flex;
    align-items: center;
    padding: 0px 30px;
}

.nav__logo {
    font-size: 2rem;
    font-weight: bolder;
}

.nav__list {
    display: flex;
    list-style: none;
    gap: 1rem;
}

.nav__link {
    text-decoration: none;
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
}

.nav__right-items {
    display: flex;
    gap: 1rem;
}

.nav__right-items a {
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
}

.nav__hamburger {
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

.nav__hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: black;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.nav__logo-mob {
    display: none;
}

.nav__cart-btn {
    background-color: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .nav {
        padding: 20px 30px;
    }

    .nav__hamburger {
        display: flex;
        position: static;
        margin-right: 0;
    }

    .nav__links {
        position: fixed;
        top: 0;
        left: -100%;
        width: 70%;
        height: 100vh;
        background-color: white;
        border-right: 1px solid black;
        box-shadow: 0px 5px 10px black;
        flex-direction: column;
        padding: 40px 20px;
        transition: left 0.3s ease;
        z-index: 99;
    }

    .nav__links--active {
        left: 0;
    }

    .nav__list {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        width: 100%;
        padding: 0;
        margin-top: 1rem;
    }

    .nav__item {
        background-color: #00000014;
        width: 100%;
        text-align: center;
        padding: 1rem;
    }

    .nav__logo {
        display: none;
    }

    .nav__logo-mob {
        display: block;
        font-size: 2rem;
        font-weight: bolder;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav__right-items {
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .nav__right-items a:not(.nav__icon-link) {
        display: none;
    }
}

.cart-badge {
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
</style>
