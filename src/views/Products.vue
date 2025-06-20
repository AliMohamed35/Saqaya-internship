<template>
    <section>
        <h1 class="section__title">
            Products
        </h1>

        <ProductsList />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsList from '../components/ProductsList.vue';

export default defineComponent({
    components: {
        ProductsList
    }
})
</script>


<style scoped>
section {
    max-width: 80%;

    margin: 1rem auto;
    padding: 4rem;


}

.section__title {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;

    border-bottom: 2px solid #ff9e21;
    width: fit-content;
}
</style>