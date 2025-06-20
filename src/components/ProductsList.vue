<template>
    <!-- this will show if isLoading is true -->
    <div v-show="isLoading" class="products-list__loading">Loading...</div>

    <ul v-show="!isLoading" class="products-list">
        <li v-for="product in filteredProducts()" :key="product.id" class="products-list__item">
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
            isLoading: true, // to show loading if the products is still being fetched
        };
    },
    components: {
        Card
    },

    props: {
        search: {
            type: String,
            required: true
        }
    },
    // This will fetch data on mounting the component
    async mounted() {
        this.products = await fetchData()
        this.isLoading = !this.isLoading
    },

    methods: {
        //this will return filtered products which is equal to search value and will be looped over in line 5
        filteredProducts() {
            return this.products.filter(product => product.title.toLowerCase().includes(this.search.toLowerCase()))
        }
    }
})
</script>

<style scoped>
.products-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 2rem;

    width: 100%;

    padding: 0;
    margin: 0;

    justify-content: center;
}

.products-list__item {
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