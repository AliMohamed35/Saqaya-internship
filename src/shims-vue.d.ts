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

declare module 'vuex' {
    export * from 'vuex/types'
    export { createStore, useStore, Commit, ActionContext } from 'vuex/types'
}

declare module 'vuex/dist/vuex.mjs' {
    export * from 'vuex/types'
    export { createStore, useStore, Commit, ActionContext } from 'vuex/types'
}
