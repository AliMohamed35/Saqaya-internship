import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Card from '../Products/Card.vue'
import type { Product } from '../../store/getProducts'

// Mock Vuex store
const mockDispatch = vi.fn()
const $store = {
    dispatch: mockDispatch
}

// Mock product prop
const product: Product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'A test product',
    category: 'electronics',
    image: 'https://example.com/image.jpg',
    rating: {
        rate: 4.5,
        count: 100
    }
}

describe('Card.vue', () => {
    it('renders product details', () => {
        const wrapper = mount(Card, {
            global: {
                mocks: { $store }
            },
            props: { product }
        })

        expect(wrapper.text()).toContain(product.title)
        expect(wrapper.text()).toContain(product.category)
        expect(wrapper.text()).toContain(product.price.toString())
        expect(wrapper.text()).toContain(product.rating.rate.toString())
    })

    it('calls addToCart when button is clicked', async () => {
        const wrapper = mount(Card, {
            global: {
                mocks: { $store }
            },
            props: { product }
        })

        await wrapper.find('button').trigger('click')
        expect(mockDispatch).toHaveBeenCalledWith('cart/addProductToCart', product)
    })
})
