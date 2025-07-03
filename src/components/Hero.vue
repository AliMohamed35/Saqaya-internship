<template>
    <section class="hero__section-container" style="border-bottom: 1px solid black">
        <h2>This is the hero section</h2>
    </section>
</template>

<style scoped>
.hero__section-container {
    color: black;
    max-width: 80%;
    min-height: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid black;
    border-left: 1px solid black;
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