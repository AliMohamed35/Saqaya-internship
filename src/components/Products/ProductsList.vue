<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import type { Product } from '../../store/getProducts';
import Card from './Card.vue';
import { useStore } from 'vuex';

// define the props
const props = defineProps<{
    search: string
}>()

const store = useStore();

// once the component mount execute the api call
onMounted(() => {
    store.dispatch('fetchData');
})

// API call
const products = computed<Product[]>(() => store.state.ProductsCall.products)

// track products length to show loader
const isLoading = computed(() => products.value.length === 0)

// filtering products to use the search feature
const filteredProducts = computed(() => products.value.filter((product: Product) => product.title.toLowerCase().includes(props.search.toLowerCase())));

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