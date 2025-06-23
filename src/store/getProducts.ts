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

export default ({
    state: {
        products: [],
    } as State,
    mutations: {
        assignProducts(state: State, products: Product[]) {
            state.products = products
            console.log(products)
        }
    },
    actions: {
        async fetchData({ commit }: { commit: (type: 'assignProducts', payload: Product[]) => void }): Promise<Product[]> {
            let res = await fetch('https://fakestoreapi.com/products');
            if (!res.ok) throw new Error('failed to fetch data') // error handling
            const products: Product[] = await res.json(); //  convert to json format
            commit('assignProducts', products);
            return products;
        }
    }
})