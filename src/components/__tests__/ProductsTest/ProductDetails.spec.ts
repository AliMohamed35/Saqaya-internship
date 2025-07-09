import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductDetails from '../../Products/ProductDetails.vue'
import type { Product } from '../../../store/getProducts'
import { useProductsStore } from '../../../store/getProducts'

// Mock Vue Router
const mockRoute = {
    params: { id: '1' }
};

// Mock Vue Router composable
vi.mock('vue-router', () => ({
    useRoute: () => mockRoute,
}));

// Mock product data
const mockProduct: Product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: 'men\'s clothing',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
        rate: 3.9,
        count: 120
    }
};

const mockProduct2: Product = {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.',
    category: 'men\'s clothing',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
        rate: 4.1,
        count: 259
    }
};

describe('ProductDetails Component', () => {
    let wrapper: VueWrapper<any>;
    let fetchDataMock: ReturnType<typeof vi.fn>;
    let productsStore: ReturnType<typeof useProductsStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        fetchDataMock = vi.fn();
        productsStore = useProductsStore();
        productsStore.fetchData = fetchDataMock;
        productsStore.products = [];
        mockRoute.params.id = '1';
    });

    it('calls fetchData when component mounts and products are empty', async () => {
        // Ensure products is empty before mounting
        productsStore.products = [];
        wrapper = mount(ProductDetails);
        await wrapper.vm.$nextTick();
        expect(fetchDataMock).toHaveBeenCalled();
    });

    it('renders product details when product is found', async () => {
        productsStore.products = [mockProduct];
        wrapper = mount(ProductDetails);
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain(mockProduct.title);
        expect(wrapper.text()).toContain(`$${mockProduct.price}`);
        expect(wrapper.text()).toContain(mockProduct.description);
    });

    it('renders "Product not found" when product ID does not exist', async () => {
        productsStore.products = [mockProduct];
        mockRoute.params.id = '999';
        wrapper = mount(ProductDetails);
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('Product not found.');
    });

    it('renders error message when fetchData throws an error', async () => {
        const errorMessage = 'Failed to fetch products';
        fetchDataMock.mockImplementation(() => { throw new Error(errorMessage); });
        wrapper = mount(ProductDetails);
        await wrapper.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 10));
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain(`Error: ${errorMessage}`);
    });
}); 