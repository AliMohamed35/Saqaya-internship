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
                    <li class="nav__item" @click="toggleNav"><router-link class="nav__link" to="/about">About
                            us</router-link></li>
                </ul>
            </div>

            <div class="nav__logo-mob">Logo</div>

            <div class="nav__right-items" style="display: flex; align-items: center;">
                <a href="#" class="nav__icon-link"><i class="fas fa-search"></i></a>
                <a href="#" class="nav__signin-link">Sign in</a>

                <button class="nav__cart-btn" @click="toggleCart"><i class="fas fa-shopping-cart"></i></button>

                <teleport to="body">
                    <Cart :open="isCartOpen" @close="toggleCart" />
                </teleport>
            </div>
        </nav>
    </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    data() {
        return {
            isNavOpen: false,
            isCartOpen: false
        }
    },

    methods: {
        toggleNav(): void {
            this.isNavOpen = !this.isNavOpen
            const navLinks = document.querySelector('.nav-links')
            if (navLinks) {
                if (this.isNavOpen) {
                    navLinks.classList.add('active')
                } else {
                    navLinks.classList.remove('active')
                }
            }
        },
        toggleCart(): void {
            this.isCartOpen = !this.isCartOpen;
        }
    }
})
</script>



<style scoped>
.nav {
    background-color: antiquewhite;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    position: relative;
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
    background-color: antiquewhite;
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
        background-color: #e5a34a;
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
</style>
