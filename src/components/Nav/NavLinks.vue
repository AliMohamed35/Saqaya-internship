<template>
    <ul class=" nav__list">
        <!-- Each link will toggle the nav bar to close after we click it -->
        <li class="nav__item"><router-link to="/" @click="$emit('close')">Home</router-link></li>
        <li class="nav__item"><router-link to="/products" @click="$emit('close')">Products</router-link></li>
        <li class="nav__item"><router-link to="/contact" @click="$emit('close')">Contact us</router-link></li>
    </ul>
</template>

<style scoped>
.nav__list {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;

}

.nav__item a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
}

@media (max-width: 768px) {
    .nav__list {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        text-align: center;
    }

    .nav__item {
        padding: 10px;
        background: #80808026;
    }
}
</style>