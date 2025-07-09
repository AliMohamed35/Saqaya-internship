import { defineStore } from "pinia";
import type { Product } from "./getProducts";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),
  actions: {
    addToCart(product: Product) {
      const item = this.cart.find((item) => item.id == product.id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1, price: product.price });
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(productId: string | number) {
      const item = this.cart.find((item) => item.id == productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cart = this.cart.filter((item) => item.id !== productId);
        }
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    addProductToCart(product: Product) {
      this.addToCart(product);
    },
    removeProductFromCart(productId: string | number) {
      this.removeFromCart(productId);
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) => {
      return state.cart.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
    },
  },
});
