export default {
    state: {
        products: [],
    },
    mutations: {
        assignProducts(state, products) {
            state.products = products;
        },
    },
    actions: {
        async fetchData({ commit, }) {
            let res = await fetch("https://fakestoreapi.com/products");
            if (!res.ok)
                throw new Error("failed to fetch data"); // error handling
            const products = await res.json(); //  convert to json format
            commit("assignProducts", products);
        },
    },
};
