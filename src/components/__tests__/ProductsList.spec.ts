import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import ProductsList from '../Products/ProductsList.vue'
import type { Product } from '../../store/getProducts'

// Mock Vuex store
const mockDispatch = vi.fn()
const mockState = {
    ProductsCall: {
        products: [] as Product[]
    }
}

const $store = {
    dispatch: mockDispatch,
    state: mockState
}

// Mock products data
const mockProducts: Product[] = [
    {
        id: 1,
        title: 'iPhone 14',
        price: 999.99,
        description: 'Latest iPhone model',
        category: 'electronics',
        image: 'https://example.com/iphone.jpg',
        rating: {
            rate: 4.5,
            count: 100
        }
    },
    {
        id: 2,
        title: 'Samsung Galaxy',
        price: 899.99,
        description: 'Android smartphone',
        category: 'electronics',
        image: 'https://example.com/samsung.jpg',
        rating: {
            rate: 4.2,
            count: 85
        }
    },
    {
        id: 3,
        title: 'Nike Shoes',
        price: 129.99,
        description: 'Comfortable running shoes',
        category: 'clothing',
        image: 'https://example.com/nike.jpg',
        rating: {
            rate: 4.8,
            count: 200
        }
    }
]

describe('ProductsList.vue', () => {
    let wrapper: VueWrapper<any>

    beforeEach(() => {
        vi.clearAllMocks()
        mockState.ProductsCall.products = []
    })

    describe('Component Mounting', () => {
        it('dispatches fetchData action on mount', () => {
            mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(mockDispatch).toHaveBeenCalledWith('fetchData')
        })
    })

    describe('Loading State', () => {
        it('shows loading message when products array is empty', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.find('.products-list__loading').exists()).toBe(true)
            expect(wrapper.find('.products-list__loading').text()).toBe('Loading...')
            expect(wrapper.find('.products-list').isVisible()).toBe(false)
        })

        it('hides loading message when products are available', () => {
            mockState.ProductsCall.products = mockProducts

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.find('.products-list__loading').isVisible()).toBe(false)
            expect(wrapper.find('.products-list').isVisible()).toBe(true)
        })
    })

    describe('Products Rendering', () => {
        beforeEach(() => {
            mockState.ProductsCall.products = mockProducts
        })

        it('renders all products when no search filter is applied', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(3)
        })

        it('renders Card components with correct product props', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            const cards = wrapper.findAllComponents({ name: 'Card' })
            expect(cards).toHaveLength(3)

            // Check that each card receives the correct product prop
            cards.forEach((card, index) => {
                expect(card.props('product')).toEqual(mockProducts[index])
            })
        })
    })

    describe('Search Filtering', () => {
        beforeEach(() => {
            mockState.ProductsCall.products = mockProducts
        })

        it('filters products by title (case insensitive)', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'iphone'
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(1)
        })

        it('filters products by title with uppercase search', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'IPHONE'
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(1)
        })

        it('returns all products when search is empty string', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(3)
        })

        it('returns empty array when no products match search', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'nonexistent'
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(0)
        })

        it('filters products by partial title match', () => {
            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'phone'
                }
            })

            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(1)
        })
    })

    describe('Edge Cases', () => {
        it('handles null/undefined products gracefully', () => {
            mockState.ProductsCall.products = null as any

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.vm.isLoading).toBe(true)
            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(0)
        })

        it('handles empty products array', () => {
            mockState.ProductsCall.products = []

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.find('.products-list__loading').exists()).toBe(true)
            const productItems = wrapper.findAll('.products-list__item')
            expect(productItems).toHaveLength(0)
        })
    })

    describe('Computed Properties', () => {
        it('computes isLoading correctly when products are empty', () => {
            mockState.ProductsCall.products = []

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.vm.isLoading).toBe(true)
        })

        it('computes isLoading correctly when products are available', () => {
            mockState.ProductsCall.products = mockProducts

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: ''
                }
            })

            expect(wrapper.vm.isLoading).toBe(false)
        })

        it('computes filteredProducts correctly', () => {
            mockState.ProductsCall.products = mockProducts

            wrapper = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'iphone'
                }
            })

            expect(wrapper.vm.filteredProducts).toHaveLength(1)
            expect(wrapper.vm.filteredProducts[0].title).toBe('iPhone 14')
        })
    })

    describe('Props Validation', () => {
        it('accepts string search prop', () => {
            expect(() => {
                mount(ProductsList, {
                    global: {
                        mocks: { $store }
                    },
                    props: {
                        search: 'test'
                    }
                })
            }).not.toThrow()
        })

        it('has search prop defined as required string', () => {
            const component = mount(ProductsList, {
                global: {
                    mocks: { $store }
                },
                props: {
                    search: 'test'
                }
            })

            expect(component.vm.$props.search).toBe('test')
        })
    })
}) 