import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductsList from '../../Products/ProductsList.vue';
import type { Product } from '../../../store/getProducts';

const createMockStore = (products: Product[]) => ({
    state: {
        ProductsCall: {
            products: products,
        },
    },
    dispatch: vi.fn(() => Promise.resolve()),
});

const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Apple iPhone',
        price: 999.99,
        description: 'A smartphone',
        category: 'electronics',
        image: 'https://example.com/iphone.jpg',
        rating: { rate: 4.8, count: 200 },
    },
    {
        id: 2,
        title: 'Samsung TV',
        price: 499.99,
        description: 'A smart TV',
        category: 'electronics',
        image: 'https://example.com/tv.jpg',
        rating: { rate: 4.5, count: 150 },
    },
];

describe('ProductsList.vue', () => {
    it('renders loading state when products are empty', () => {
        const wrapper = mount(ProductsList, {
            global: {
                mocks: { $store: createMockStore([]) },
                stubs: ['Card'],
            },
            props: { search: '' },
        });
        expect(wrapper.find('.products-list__loading').isVisible()).toBe(true);
        expect(wrapper.find('.products-list').exists()).toBe(true);
        expect(wrapper.findAll('.products-list__item').length).toBe(0);
    });

    it('renders products when products are available', () => {
        const wrapper = mount(ProductsList, {
            global: {
                mocks: { $store: createMockStore(mockProducts) },
                stubs: ['Card'],
            },
            props: { search: '' },
        });
        expect(wrapper.find('.products-list__loading').isVisible()).toBe(false);
        expect(wrapper.findAll('.products-list__item').length).toBe(2);
    });

    it('filters products based on search prop', () => {
        const wrapper = mount(ProductsList, {
            global: {
                mocks: { $store: createMockStore(mockProducts) },
                stubs: ['Card'],
            },
            props: { search: 'iphone' },
        });
        expect(wrapper.findAll('.products-list__item').length).toBe(1);
    });

    it('dispatches fetchData on mount', () => {
        const store = createMockStore(mockProducts);
        mount(ProductsList, {
            global: {
                mocks: { $store: store },
                stubs: ['Card'],
            },
            props: { search: '' },
        });
        expect(store.dispatch).toHaveBeenCalledWith('fetchData');
    });
});
