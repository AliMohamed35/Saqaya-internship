<template>
    <footer class="footer">
        <div class="footer__left-cols">
            <div class="footer__col">
                <h4 class="footer__col-title">Navigate</h4>
                <ul class="footer__col-list">
                    <li><a href="/about">About us</a></li>
                    <li>Blog</li>
                    <li>Contact us</li>
                    <li>Sitemap</li>
                </ul>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">Collection</h4>
                <ul class="footer__col-list">
                    <li><a href="/about">About us</a></li>
                    <li>Blog</li>
                    <li>Contact us</li>
                    <li>Sitemap</li>
                </ul>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">Categories</h4>
                <ul class="footer__col-list">
                    <li>Tables</li>
                    <li>Sofa</li>
                    <li>Lamps</li>
                    <li>Chairs</li>
                </ul>
            </div>
        </div>

        <div class="footer__right-cols">
            <address class="footer__address">
                <h4>399 CrowField Road, <br> Phoenix, Arizona 85012</h4>
                <p><a href="mailto:alimohameddev35@gmail.com">alimohameddev35@gmail.com</a></p>
                <p><a href="tel:+101093248871">01093248871</a></p>
            </address>

            <div class="footer__social">
                <h4 class="footer__social-title">Get Social</h4>
                <ul class="footer__social-icons">
                    <li><a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a></li>
                    <li><a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'footer'
})
</script>

<style scoped>
.footer {
    /* background-color: antiquewhite; */
    min-height: 200px;
    padding: 4rem;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-top: 3px solid black;
}

.footer__left-cols {
    display: flex;
    gap: 6rem;
    flex-wrap: nowrap;
    overflow: hidden;
    box-sizing: border-box;
}

.footer__col {
    display: flex;
    flex-direction: column;
    min-width: 150px;
    overflow: hidden;
    box-sizing: border-box;
}

.footer__col-title {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.footer__col-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer__col-list li {
    margin: .4rem 0;
    font-size: 1.3rem;
    text-decoration: none;
}

.footer__col-list li a {
    margin: .4rem 0;
    font-size: 1.3rem;
    color: black;
    text-decoration: none;
}

.footer__address {
    margin-bottom: 1rem;
}

.footer__address h4 {
    font-size: 1.6rem;
    line-height: 1.4;
    margin-bottom: 1rem;
}

.footer__address a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    font-style: normal;
}

.footer__social-title {
    margin-bottom: 1rem;
}

.footer__social-icons {
    padding: 0;
    display: flex;
    gap: 1rem;
    list-style: none;
    color: black;
}

.footer__social-icons a {
    color: black;
    font-size: 1.4rem;
}


@media (max-width: 1024px) {
    .footer {
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }

    .footer__left-cols {
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .footer__right-cols {
        text-align: center;
    }

    .footer__social-icons {

        display: flex;
        justify-content: center;
    }

}

@media (max-width: 768px) {
    .footer {
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 1rem;
        text-align: center;
    }

    .footer__left-cols {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 2rem;
        gap: 1.5rem;
    }

    .footer__right-cols {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
    }

    .footer__address {
        margin-bottom: 1rem;
    }

    .footer__social-icons {
        justify-content: center;
    }
}
</style>