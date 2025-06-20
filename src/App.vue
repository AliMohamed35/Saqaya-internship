<script lang="ts">
import { defineComponent } from 'vue'
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

    <Footer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app>*:nth-last-child(1) {
  /* Ensures the footer is always at the bottom */
  margin-top: auto;
}
</style>
