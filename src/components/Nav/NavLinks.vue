<template>
    <div class="nav__links" :class="{ 'nav__opened': open }">
        <ul class=" nav__list">
            <!-- Each link will toggle the nav bar to close after we click it -->
            <li class="nav__item"><router-link to="/" @click="$emit('close')">Home</router-link></li>
            <li class="nav__item"><router-link to="/products" @click="$emit('close')">Products</router-link></li>
            <li class="nav__item"><router-link to="/contact" @click="$emit('close')">Contact us</router-link></li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    open: boolean;
}>();
</script>

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
    color: green;
    font-weight: bold;
    font-size: 1.2rem;
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