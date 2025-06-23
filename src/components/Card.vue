<template>
    <div class="card__container">
        <img :src="product.image" :alt="product.description">
        <h3 class="card__container-title">{{ product.title }}</h3>
        <p class="card__container-price">$ {{ product.price }}</p>

        <div class="card__container-rating">
            <p class="card__container-rating--rate"><i class="fa-solid fa-star"></i> {{ product.rating.rate }}</p>
            <p>{{ product.category }}</p>
        </div>

    </div>

    <div class="btns">
        <button class="btns__button" @click="addToCart(product)">Add to cart</button>
        <a class="btns__link" href="#"><router-link :to="`/product/${product.id}`">Details</router-link></a>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Product } from '../store/getProducts'

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<Product>,
            required: true
        }
    },

    methods: {
        addToCart(product: Product) {
            this.$store.dispatch('cart/addProductToCart', product)
        }
    }
})
</script>

<style scoped>
.card__container {
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card__container img {
    width: 100%;
    height: 140px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.card__container-title {
    font-size: 2rem;
    margin: 1rem 0rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    min-height: 2.6em;
}

.card__container-price {
    font-weight: bold;
    font-size: 1.3rem;
}

.card__container-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0rem;
    font-weight: bold;
    font-size: 1.3rem;
}

.card__container-rating--rate i {
    color: #ff9e21;
}

.btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
}

.btns a {
    text-decoration: none !important;
    font-weight: bold;
    font-size: 1.2rem;
    color: #ff9e21;
}

.btns__button {
    padding: .5rem 1.3rem;
    background-color: black;
    color: white;
    border: none;
    font-size: .9rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.309);
    transition: ease 0.3s;
}

.btns__link:hover {
    color: #ff9f21be;
}

.btns__button:hover {
    background-color: rgba(0, 0, 0, 0.418);
}
</style>