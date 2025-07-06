import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { reactive } from 'vue';
import ProductsList from '../../Products/ProductsList.vue';
import type { Product } from '../../../store/getProducts';

// Mock Vuex store
const mockDispatch = vi.fn();
const mockStore = {
    state: reactive({
        ProductsCall: {
            products: [] as Product[]
        }
    }),
    dispatch: mockDispatch
};

// Mock Vuex composable
vi.mock('vuex', () => ({
    useStore: () => mockStore,
}));

// Mock Card component
const MockCard = {
    name: 'Card',
    template: '<div class="mock-card">{{ product.title }}</div>',
    props: ['product']
};

// Mock product data
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

    beforeEach(() => {
        // Reset mocks and store state
        vi.clearAllMocks();
        mockStore.state.ProductsCall.products = [];
        mockDispatch.mockResolvedValue(undefined);
    });

    describe('Loading State', () => {
        it('renders loading state when products array is empty', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.find('.products-list__loading').exists()).toBe(true);
            expect(wrapper.find('.products-list__loading').isVisible()).toBe(true);
            expect(wrapper.find('.products-list').exists()).toBe(true);
            expect(wrapper.find('.products-list').isVisible()).toBe(false);
            expect(wrapper.findAll('.products-list__item')).toHaveLength(0);
        });

        it('calls fetchData when component mounts', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(mockDispatch).toHaveBeenCalledWith('fetchData');
        });
    });

    describe('Product Display', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = mockProducts;
        });

        it('renders products when products are available', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.find('.products-list__loading').isVisible()).toBe(false);
            expect(wrapper.find('.products-list').isVisible()).toBe(true);
            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
        });

        it('renders correct number of Card components', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            const cards = wrapper.findAllComponents(MockCard);
            expect(cards).toHaveLength(3);
        });

        it('passes correct product props to Card components', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            const cards = wrapper.findAllComponents(MockCard);

            expect(cards[0].props('product')).toEqual(mockProducts[0]);
            expect(cards[1].props('product')).toEqual(mockProducts[1]);
            expect(cards[2].props('product')).toEqual(mockProducts[2]);
        });

        it('renders products in correct order', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            const cardTexts = wrapper.findAll('.mock-card').map(card => card.text());

            expect(cardTexts[0]).toBe('Apple iPhone');
            expect(cardTexts[1]).toBe('Samsung TV');
            expect(cardTexts[2]).toBe('Nike Shoes');
        });
    });

    describe('Search Functionality', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = mockProducts;
        });

        it('filters products based on search prop (case-insensitive)', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'iphone' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('Apple iPhone');
        });

        it('filters products with uppercase search term', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'IPHONE' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('Apple iPhone');
        });

        it('filters products with partial search term', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'Samsung' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('Samsung TV');
        });

        it('filters products by category', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'electronics' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(2);
            const cardTexts = wrapper.findAll('.mock-card').map(card => card.text());
            expect(cardTexts).toContain('Apple iPhone');
            expect(cardTexts).toContain('Samsung TV');
        });

        it('shows no products when search term does not match', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'nonexistent' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(0);
        });

        it('shows all products when search is empty string', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
        });

        it('shows all products when search is whitespace only', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '   ' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
        });
    });

    describe('Component Structure', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = mockProducts;
        });

        it('has correct CSS classes', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.find('.products-list').exists()).toBe(true);
            expect(wrapper.find('.products-list__loading').exists()).toBe(true);
            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
        });

        it('renders as unordered list', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.find('ul').exists()).toBe(true);
            expect(wrapper.find('ul').classes()).toContain('products-list');
        });

        it('renders list items with correct structure', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            const listItems = wrapper.findAll('li');
            expect(listItems).toHaveLength(3);

            listItems.forEach(item => {
                expect(item.classes()).toContain('products-list__item');
            });
        });
    });

    describe('Props Validation', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = mockProducts;
        });

        it('handles search prop correctly', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'test' },
            });

            expect(wrapper.props('search')).toBe('test');
        });

        it('handles empty search prop', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.props('search')).toBe('');
        });
    });

    describe('Edge Cases', () => {
        it('handles single product correctly', () => {
            mockStore.state.ProductsCall.products = [mockProducts[0]];

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('Apple iPhone');
        });

        it('handles products with special characters in title', () => {
            const productWithSpecialChars: Product = {
                ...mockProducts[0],
                title: 'iPhone 14 Pro Max - 256GB'
            };

            mockStore.state.ProductsCall.products = [productWithSpecialChars];

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'pro max' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('iPhone 14 Pro Max - 256GB');
        });

        it('handles products with numbers in title', () => {
            const productWithNumbers: Product = {
                ...mockProducts[0],
                title: 'iPhone 14'
            };

            mockStore.state.ProductsCall.products = [productWithNumbers];

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '14' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('iPhone 14');
        });

        it('handles very long search terms', () => {
            mockStore.state.ProductsCall.products = mockProducts;

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: 'This is a very long search term that should not match any products' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(0);
        });
    });

    describe('Reactivity', () => {
        it('updates filtered products when search prop changes', async () => {
            mockStore.state.ProductsCall.products = mockProducts;

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);

            await wrapper.setProps({ search: 'iphone' });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(1);
            expect(wrapper.find('.mock-card').text()).toBe('Apple iPhone');
        });

        it('updates filtered products when store products change', async () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store: mockStore },
                    stubs: { Card: MockCard },
                },
                props: { search: '' },
            });

            expect(wrapper.findAll('.products-list__item')).toHaveLength(0);

            mockStore.state.ProductsCall.products = mockProducts;
            await wrapper.vm.$nextTick();

            expect(wrapper.findAll('.products-list__item')).toHaveLength(3);
        });
    });
});
