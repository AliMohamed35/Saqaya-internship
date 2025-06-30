export default {
    namespaced: true,
    state: {
        cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    },
    mutations: {
        addToCart(state, product) {
            const item = state.cart.find((item) => item.id == product.id);
            if (item) {
                item.quantity++;
            }
            else {
                state.cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeFromCart(state, productId) {
            const item = state.cart.find((item) => item.id == productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
                else {
                    state.cart = state.cart.filter((item) => item.id !== productId);
                }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        clearState(state) {
            state.cart = [];
            localStorage.removeItem("cart");
        },
    },
    actions: {
        addProductToCart({ commit }, product) {
            commit("addToCart", product);
        },
        removeProductFromCart({ commit }, productId) {
            commit("removeFromCart", productId);
        },
    },
    getters: {
        cartItems: (state) => state.cart,
        cartTotal: (state) => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
    },
};
