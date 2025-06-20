<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '../data/Products';

const route = useRoute();
const productId = route.params.id;
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref('');

async function fetchProductById(id: string | string[]) {
    try {
        loading.value = true;
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        product.value = await res.json();
    } catch (err: any) {
        error.value = err.message || 'Unknown error';
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchProductById(productId);
});
</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="product" class="product-details">
        <img :src="product.image" :alt="product.title" style="max-width:200px; max-height:200px; object-fit:contain;" />
        <h1>{{ product.title }}</h1>
        <p><strong>Price:</strong> ${{ product.price }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Rating:</strong> {{ product.rating?.rate }} ({{ product.rating?.count }} reviews)</p>
    </div>
</template>

<style scoped>
.product-details {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff8ef;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-details img {
    margin-bottom: 1rem;
}

.product-details h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.product-details p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
}
</style>