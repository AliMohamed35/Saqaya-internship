<script lang="ts" setup>
import type { Product } from '../../store/getProducts';
import { useCartStore } from '../../store/cart';

// define props
const props = defineProps<{ product: Product }>();

const cartStore = useCartStore();

// add to cart function which uses Pinia store action
function addToCart(product: Product) {
    cartStore.addProductToCart(product);
}
</script>

<template>
    <div class="card__container">
        <img :src="props.product.image" :alt="props.product.description">
        <h3 class="card__container-title">{{ props.product.title }}</h3>
        <p class="card__container-price">$ {{ props.product.price }}</p>

        <div class="card__container-rating">
            <p class="card__container-rating--rate"><i class="fa-solid fa-star"></i> {{ props.product.rating.rate }}</p>
            <p>{{ props.product.category }}</p>
        </div>

        <div class="btns">
            <button class="btns__button" @click="addToCart(props.product)">Add to cart</button>
            <router-link class="btns__link" :to="`/product/${props.product.id}`">Details</router-link>
        </div>
    </div>

</template>


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