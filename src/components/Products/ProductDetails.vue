<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, type Product } from '../../store/getProducts'

// Hooks
const route = useRoute();
const error = ref('');
const isLoading = ref(false);

// Calling products from store
const productsStore = useProductsStore();

// filtering the selected product details to show
const product = computed<Product | undefined>(() => {
    const id = Number(route.params.id)
    return productsStore.products.find((p: Product) => p.id === id);
})

// showing loading state when there isn't products in store
const showLoading = computed(() => isLoading.value && !error.value);

// performing API call to fetch products once the component is rendered
onMounted(async () => {
    if (productsStore.products.length === 0) {
        isLoading.value = true;
        try {
            await productsStore.fetchData();
        } catch (err: any) {
            error.value = err.message || 'Unknown error'
        } finally {
            isLoading.value = false;
        }
    }
})
</script>

<template>
    <div v-if="showLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="product" class="product-details">
        <div class="product__details-image">
            <img :src="product.image" :alt="product.title"
                style="max-width:200px; max-height:200px; object-fit:contain;" />
        </div>
        <h1>{{ product.title }}</h1>
        <p><strong>Price: </strong> ${{ product.price }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Rating: </strong> <i class="fa-solid fa-star"></i> {{ product.rating?.rate }} ({{
            product.rating?.count
        }} reviews)</p>
    </div>
    <div v-else>Product not found.</div>
</template>


<style scoped>
.product-details {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 6px 14px rgb(0 0 0 / 28%);
    display: flex;
    flex-direction: column;
    border: 3px solid black;
}

.product__details-image {
    display: flex;
    justify-content: center;
}

.product-details img {
    margin-bottom: 1.1rem;
}

.product-details h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.product-details p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}
</style>
