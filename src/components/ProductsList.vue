<template>
    <div v-show="isLoading" class="products__loading">Loading...</div>

    <ul v-show="!isLoading">
        <li v-for="product in products" :key="product.id">
            <Card :product="product" />
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Product } from '../data/Products';
import { fetchData } from '../data/Products';
import Card from './Card.vue';

export default defineComponent({
    data() {
        return {
            products: [] as Product[],
            isLoading: true,
        };
    },
    components: {
        Card
    },
    // This will fetch data on mounting the component
    async mounted() {
        this.products = await fetchData()
        this.isLoading = !this.isLoading
    },
})
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 2rem;

    width: 100%;

    padding: 0;
    margin: 0;

    justify-content: center;
}

ul li {
    width: 300px;
    height: 400px;

    background-color: white;
    display: flex;
    flex-direction: column;

    border: 8px solid black;


    padding: 1rem;
    border-radius: 8px;
}
</style>