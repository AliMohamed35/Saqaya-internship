import type { Product } from './getProducts';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
}

export default {
    namespaced: true,

    state: {
        cart: []
    } as CartState,

    mutations: {
        addToCart(state: CartState, product: Product) {
            const item = state.cart.find(item => item.id == product.id)

            if (item) {
                item.quantity++;
            } else {
                state.cart.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart(state: CartState, productId: string | number) {
            const item = state.cart.find(item => item.id == productId)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--
                } else {
                    state.cart = state.cart.filter(item => item.id !== productId);
                }
            }
        }
    },
    actions: {
        addProductToCart({ commit }: { commit: (type: string, payload: any) => void }, product: Product) {
            commit('addToCart', product)
        },
        removeProductFromCart({ commit }: { commit: (type: string, payload: any) => void }, productId: string | number) {
            commit('removeFromCart', productId)
        }
    },
    getters: {
        cartItems: (state: CartState) => state.cart,
        cartTotal: (state: CartState) => {
            return state.cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
        }
    }
}