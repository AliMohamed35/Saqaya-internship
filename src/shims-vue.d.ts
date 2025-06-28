// src/shims-vue.d.ts or src/env.d.ts
import { Store } from 'vuex';
import { Product } from './store/getProducts';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

declare module '@vue/runtime-core' {
    interface State {
        ProductsCall: {
            products: Product[];
        };
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
    }
}
