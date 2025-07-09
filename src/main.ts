import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/global.css'
// import store from "./store";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router).use(createPinia());

app.mount("#app");
