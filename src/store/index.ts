import { createStore } from "vuex";
import ProductsCall from './getProducts';

export default createStore({
    modules: {
        ProductsCall
    }
})