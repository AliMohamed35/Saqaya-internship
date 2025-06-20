<script lang="ts">
import { defineComponent } from 'vue'
import Home from './views/Home.vue'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'home',
  components: {
    Nav,
    Footer
  }
}) 
</script>

<template>
  <div class="app">
    <Nav />

    <main>
      <RouterView />
    </main>

    <!-- <Footer /> -->
  </div>
</template>

<style scoped></style>
