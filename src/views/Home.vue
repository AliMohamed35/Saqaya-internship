<template>
    <!-- This is the home page -->
    <Hero />
</template>

<script>
import { defineComponent } from 'vue';
import Hero from '../components/Hero.vue'


export default defineComponent({
    components: {
        Hero,
    }
})
</script>