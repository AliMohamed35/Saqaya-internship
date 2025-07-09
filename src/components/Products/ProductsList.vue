<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import type { Product } from '../../store/getProducts';
import Card from './Card.vue';
import { useProductsStore } from '../../store/getProducts';

// define the props
const props = defineProps<{
    search: string
}>()

const productsStore = useProductsStore();

// once the component mount execute the api call
onMounted(() => {
    productsStore.fetchData();
})

// API call
const products = computed<Product[]>(() => productsStore.products)

// track products length to show loader
const isLoading = computed(() => products.value.length === 0)

// filtering products to use the search feature
const filteredProducts = computed(() => {
    // If search is empty or only whitespace, return all products
    if (!props.search || props.search.trim() === '') {
        return products.value;
    }

    const searchTerm = props.search.toLowerCase().trim();

    return products.value.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
});

</script>


<template>
    <!-- this will show if isLoading is true -->
    <div v-show="isLoading" class="products-list__loading">Loading...</div>

    <ul v-show="!isLoading" class="products-list">
        <li v-for="product in filteredProducts" :key="product.id" class="products-list__item">
            <Card :product="product" />
        </li>
    </ul>
</template>


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
    box-shadow: 0px 5px 10px black;
}
</style>