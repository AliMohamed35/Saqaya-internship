import { createStore } from "vuex";
import ProductsCall from './getProducts';
import cart from "./cart";
export default createStore({
    modules: {
        ProductsCall,
        cart
    }
});
