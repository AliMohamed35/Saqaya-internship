import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/products",
            name: "products",
            component: () => import("../views/Products.vue"),
        },
        {
            path: "/product/:id",
            name: "productDetails",
            component: () => import("../components/Products/ProductDetails.vue"),
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../views/Contact.vue"),
        },
    ],
});
export default router;
