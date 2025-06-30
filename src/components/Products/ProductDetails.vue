<template>
    <div v-if="isLoading">Loading...</div>
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

<script lang="ts">
import { defineComponent } from 'vue';
import { Product } from '../../store/getProducts';

export default defineComponent({
    data() {
        return {
            error: ''
        };
    },
    computed: {
        // the purpose of this is to feed data to product computed function 
        products(): Product[] {
            // It reaches into Vuex store goes to the state and returns the products array from it.
            return this.$store.state.ProductsCall.products;
        },
        product(): Product | undefined {
            // This one extracts the id from the url and searches for the product with the same
            // id in the products array that we just got in the function above
            const id = Number(this.$route.params.id);
            return this.products.find((p: Product) => p.id === id);

        },
        isLoading(): boolean {
            return this.products.length === 0 && !this.error;
        }
    },
    async created() {
        if (this.products.length === 0) {
            try {
                await this.$store.dispatch('fetchData');
            } catch (err: any) {
                this.error = err.message || 'Unknown error';
            }
        }
    }
});
</script>

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
