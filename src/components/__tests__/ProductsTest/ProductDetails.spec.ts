import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { reactive } from 'vue'
import ProductDetails from '../../Products/ProductDetails.vue'
import type { Product } from '../../../store/getProducts'

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

// Mock Vue Router
const mockRoute = {
    params: { id: '1' }
};

// Mock Vuex composable
vi.mock('vuex', () => ({
    useStore: () => mockStore,
}));

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

    beforeEach(() => {
        // Reset mocks and store state
        vi.clearAllMocks();
        mockStore.state.ProductsCall.products = [];
        mockDispatch.mockResolvedValue(undefined);
        // Reset route params
        mockRoute.params.id = '1';
    });

    describe('Loading State', () => {
        it('calls fetchData when component mounts and products are empty', async () => {
            wrapper = mount(ProductDetails);

            // Wait for onMounted to execute
            await wrapper.vm.$nextTick();

            expect(mockDispatch).toHaveBeenCalledWith('fetchData');
        });

        it('does not call fetchData when products already exist', async () => {
            mockStore.state.ProductsCall.products = [mockProduct];

            wrapper = mount(ProductDetails);

            await wrapper.vm.$nextTick();

            expect(mockDispatch).not.toHaveBeenCalled();
        });
    });

    describe('Product Display', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = [mockProduct];
        });

        it('renders product details when product is found', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.text()).not.toContain('Loading...');
            expect(wrapper.find('.product-details').exists()).toBe(true);
        });

        it('renders product image with correct src and alt attributes', () => {
            wrapper = mount(ProductDetails);

            const image = wrapper.find('img');

            expect(image.exists()).toBe(true);
            expect(image.attributes('src')).toBe(mockProduct.image);
            expect(image.attributes('alt')).toBe(mockProduct.title);
        });

        it('renders product title', () => {
            wrapper = mount(ProductDetails);

            const title = wrapper.find('h1');

            expect(title.exists()).toBe(true);
            expect(title.text()).toBe(mockProduct.title);
        });

        it('renders product price with dollar sign', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain(`$${mockProduct.price}`);
        });

        it('renders product description', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain(mockProduct.description);
        });

        it('renders product category', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain(mockProduct.category);
        });

        it('renders product rating with star icon', () => {
            wrapper = mount(ProductDetails);

            const ratingText = wrapper.text();

            expect(ratingText).toContain(mockProduct.rating.rate.toString());
            expect(ratingText).toContain(mockProduct.rating.count.toString());
            expect(ratingText).toContain('reviews');

            const starIcon = wrapper.find('i.fa-solid.fa-star');
            expect(starIcon.exists()).toBe(true);
        });

        it('renders all product information sections', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain('Price:');
            expect(wrapper.text()).toContain('Description:');
            expect(wrapper.text()).toContain('Category:');
            expect(wrapper.text()).toContain('Rating:');
        });
    });

    describe('Product Not Found', () => {
        it('renders "Product not found" when product ID does not exist', () => {
            mockStore.state.ProductsCall.products = [mockProduct];

            // Mock route with different ID
            mockRoute.params.id = '999';

            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain('Product not found.');
            expect(wrapper.find('.product-details').exists()).toBe(false);
        });

        it('renders "Product not found" when products array is empty after loading', async () => {
            // Mock route with ID 1 but no products in store
            mockRoute.params.id = '1';
            mockStore.state.ProductsCall.products = [];

            // Mock fetchData to resolve but keep products empty
            mockDispatch.mockImplementation(async () => {
                // Simulate the action completing but products remaining empty
                mockStore.state.ProductsCall.products = [];
            });

            wrapper = mount(ProductDetails);

            // Wait for onMounted to execute and fetchData to complete
            await wrapper.vm.$nextTick();
            // Wait for the async fetchData to complete
            await new Promise(resolve => setTimeout(resolve, 10));
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain('Product not found.');
        });
    });

    describe('Error Handling', () => {
        it('renders error message when fetchData throws an error', async () => {
            const errorMessage = 'Failed to fetch products';
            mockDispatch.mockRejectedValue(new Error(errorMessage));

            wrapper = mount(ProductDetails);

            // Wait for onMounted to execute and error to be set
            await wrapper.vm.$nextTick();
            // Wait for the async error handling to complete
            await new Promise(resolve => setTimeout(resolve, 10));
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain(`Error: ${errorMessage}`);
            expect(wrapper.find('.product-details').exists()).toBe(false);
        });

        it('renders generic error message when error has no message property', async () => {
            mockDispatch.mockRejectedValue('Generic error');

            wrapper = mount(ProductDetails);

            await wrapper.vm.$nextTick();
            await new Promise(resolve => setTimeout(resolve, 10));
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain('Error: Unknown error');
        });

        it('does not show loading state when there is an error', async () => {
            mockDispatch.mockRejectedValue(new Error('Test error'));

            wrapper = mount(ProductDetails);

            await wrapper.vm.$nextTick();
            await new Promise(resolve => setTimeout(resolve, 10));
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).not.toContain('Loading...');
        });
    });

    describe('Route Parameter Handling', () => {
        it('finds product with different ID when route parameter changes', () => {
            mockStore.state.ProductsCall.products = [mockProduct, mockProduct2];

            // Test with ID 2
            mockRoute.params.id = '2';

            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain(mockProduct2.title);
            expect(wrapper.text()).toContain(`$${mockProduct2.price}`);
        });

        it('handles string ID parameter correctly', () => {
            mockStore.state.ProductsCall.products = [mockProduct];

            // Ensure ID is string but matches numeric ID
            mockRoute.params.id = '1';

            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain(mockProduct.title);
        });
    });

    describe('Component Structure', () => {
        beforeEach(() => {
            mockStore.state.ProductsCall.products = [mockProduct];
        });

        it('has correct CSS classes when product is displayed', () => {
            wrapper = mount(ProductDetails);

            expect(wrapper.find('.product-details').exists()).toBe(true);
            expect(wrapper.find('.product__details-image').exists()).toBe(true);
        });

        it('renders product image with correct styling attributes', () => {
            wrapper = mount(ProductDetails);

            const image = wrapper.find('img');
            const style = image.attributes('style');

            expect(style).toContain('max-width: 200px');
            expect(style).toContain('max-height: 200px');
            expect(style).toContain('object-fit: contain');
        });
    });

    describe('Edge Cases', () => {
        it('handles product with zero rating correctly', () => {
            const productWithZeroRating: Product = {
                ...mockProduct,
                rating: {
                    rate: 0,
                    count: 0
                }
            };

            mockStore.state.ProductsCall.products = [productWithZeroRating];

            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain('0 (0 reviews)');
        });

        it('handles product with decimal price correctly', () => {
            const productWithDecimalPrice: Product = {
                ...mockProduct,
                price: 19.99
            };

            mockStore.state.ProductsCall.products = [productWithDecimalPrice];

            wrapper = mount(ProductDetails);

            expect(wrapper.text()).toContain('$19.99');
        });

        it('handles product with very long title', () => {
            const productWithLongTitle: Product = {
                ...mockProduct,
                title: 'This is a very long product title that might wrap to multiple lines and should be handled properly by the component'
            };

            mockStore.state.ProductsCall.products = [productWithLongTitle];

            wrapper = mount(ProductDetails);

            expect(wrapper.find('h1').text()).toBe(productWithLongTitle.title);
        });
    });
}); 