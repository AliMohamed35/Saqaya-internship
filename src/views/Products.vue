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
import ProductsList from '../components/Products/ProductsList.vue';

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
    border-bottom: 2px solid black;
    width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.section__search input {
    border-radius: 7px;
    padding: 7px 24px;
    border: 2px solid black;
    font-size: 1.3rem;
    width: 320px;
    max-width: 100%;
}

@media(max-width:768px) {
    .section__title {
        flex-direction: column;
        margin-bottom: 1rem;
        border-bottom: none;
    }

    .section__search input {
        width: 250px;
    }
}
</style>