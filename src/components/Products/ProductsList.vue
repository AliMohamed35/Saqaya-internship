<template>
    <!-- this will show if isLoading is true -->
    <div v-show="isLoading" class="products-list__loading">Loading...</div>

    <ul v-show="!isLoading" class="products-list">
        <li v-for="product in filteredProducts" :key="product.id" class="products-list__item">
            <Card :product="product" />
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Product } from '../../store/getProducts';
import Card from './Card.vue';

export default defineComponent({
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
    mounted() {
        this.$store.dispatch('fetchData')
    },

    computed: {
        products(): Product[] {
            return this.$store.state.ProductsCall.products
        },
        isLoading(): boolean {
            return this.products.length === 0;
        },
        //this will return filtered products which is equal to search value and will be looped over in line 5
        filteredProducts(): Product[] {
            if (!this.products) {
                return []
            }
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
    box-shadow: 0px 5px 10px black;
}
</style>