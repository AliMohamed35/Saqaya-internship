import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductDetails from '../../Products/ProductDetails.vue'
import type { Product } from '../../../store/getProducts'

const createMockStore = (products: Product[], error: string | null = null) => ({
    state: {
        ProductsCall: {
            products: products
        }
    },
    dispatch: vi.fn(() => {
        if (error) {
            return Promise.reject(new Error(error));
        }
        return Promise.resolve();
    })
});

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

describe('Tests the expected from ProductDetails component', () => {
    it('renders loading state initially', () => {
        const wrapper = mount(ProductDetails, {
            global: {
                mocks: {
                    // mocks the store [] >> means the mock store will contain empty array of objects
                    $store: createMockStore([]),
                    $route: {
                        params: { id: '1' }
                    }
                }
            }
        })
        expect(wrapper.text()).toContain('Loading...')
    })

    it('renders product details when product is found', async () => {
        const store = createMockStore([mockProduct]);
        const wrapper = mount(ProductDetails, {
            global: {
                mocks: {
                    $store: store,
                    $route: {
                        params: { id: '1' }
                    }
                }
            }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.text()).not.toContain('Loading...');
        expect(wrapper.find('h1').text()).toBe(mockProduct.title);
        expect(wrapper.text()).toContain(`$${mockProduct.price}`);
        expect(wrapper.text()).toContain(mockProduct.description);
    });

    it('renders "Product not found" when product is not in the store', async () => {
        const store = createMockStore([mockProduct]);
        const wrapper = mount(ProductDetails, {
            global: {
                mocks: {
                    $store: store,
                    $route: {
                        params: { id: '2' } // Different id
                    }
                }
            }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Product not found.');
    });

    it('renders error message when fetching data fails', async () => {
        const error = 'Failed to fetch';
        const store = createMockStore([], error);
        const wrapper = mount(ProductDetails, {
            global: {
                mocks: {
                    $store: store,
                    $route: {
                        params: { id: '1' }
                    }
                }
            }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain(`Error: ${error}`);
    });
}) 