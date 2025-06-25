import { Store } from 'vuex';
import { Product } from './store/getProducts';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

declare module '@vue/runtime-core' {
    // Declare your own store states.
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

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
} 