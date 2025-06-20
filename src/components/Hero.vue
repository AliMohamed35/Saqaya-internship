<template>
    <section class="hero__section-container">
        <h2>This is the hero section</h2>
    </section>

    <!-- <section class="section__container">
        <h2>This is the best seller section</h2>
    </section> -->
</template>

<script>

</script>


<style>
.hero__section-container {
    background-image: url('/recycled-shoe-store-hero-image-bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: black;
    color: white;

    max-width: 80%;
    min-height: 700px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}

@media (max-width: 768px) {
    .hero__section-container {
        min-height: 350px;
        padding: 1rem;
    }

    .hero__section-container h2 {
        font-size: 1.5rem;
    }
}

/* .section__container {
    max-width: 80%;
    min-height: 700px;
    margin: 0 auto;
} */
</style>