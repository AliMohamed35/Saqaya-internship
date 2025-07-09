import { describe, it, expect, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ProductsList from '../../Products/ProductsList.vue';
import { useProductsStore, type Product } from '../../../store/getProducts';

// Mock Card component
const MockCard = {
    name: 'Card',
    template: '<div class="mock-card">{{ product.title }}</div>',
    props: ['product']
};

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
    {
        id: 3,
        title: 'Nike Shoes',
        price: 89.99,
        description: 'Running shoes',
        category: 'clothing',
        image: 'https://example.com/shoes.jpg',
        rating: { rate: 4.2, count: 75 },
    },
];

describe('ProductsList Component', () => {
    let wrapper: VueWrapper<any>;
    let productsStore: ReturnType<typeof useProductsStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        productsStore = useProductsStore();
        productsStore.products = [];
    });

    it('renders loading state when products array is empty', () => {
        wrapper = mount(ProductsList, {
            global: {
                stubs: { Card: MockCard },
            },
            props: { search: '' },
        });
        expect(wrapper.find('.products-list__loading').exists()).toBe(true);
    });

    it('renders products when products are available', () => {
        productsStore.products = mockProducts;
        wrapper = mount(ProductsList, {
            global: {
                stubs: { Card: MockCard },
            },
            props: { search: '' },
        });
        expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
    });

    it('filters products based on search prop', () => {
        productsStore.products = mockProducts;
        wrapper = mount(ProductsList, {
            global: {
                stubs: { Card: MockCard },
            },
            props: { search: 'iphone' },
        });
        expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
        expect(wrapper.find('.mock-card').text()).toBe('Apple iPhone');
    });
});
