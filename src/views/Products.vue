<template>
    <section>
        <div class="section__title">
            <h2>Products</h2>

            <div class="section__search">
                <input type="text" placeholder="Search..." v-model="searchQuery">
            </div>
        </div>


        <ProductsList :search="searchQuery" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsList from '../components/ProductsList.vue';

export default defineComponent({
    components: {
        ProductsList
    },

    data() {
        return {
            searchQuery: ''
        }
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

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
}

.section__search input {
    border-radius: 7px;
    padding: 7px 24px;
    border: 1px solid rgba(0, 0, 0, 0.375);
    font-size: 1.3rem;
    width: 320px;
    max-width: 100%;
}
</style>