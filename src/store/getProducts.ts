import { defineStore } from "pinia";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

interface State {
  products: Product[];
}

export const useProductsStore = defineStore("products", {
  state: (): State => ({
    products: [],
  }),
  actions: {
    async fetchData() {
      let res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("failed to fetch data");
      const products: Product[] = await res.json();
      this.products = products;
    },
  },
});
