import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartDrawer from '../../Nav/CartDrawer.vue';
import { createStore, Store } from 'vuex';

describe('CartDrawer', () => {
    const cartItems = [
        { id: 1, title: 'Item 1', quantity: 2, price: 10 },
        { id: 2, title: 'Item 2', quantity: 1, price: 20 },
    ];
    let store: Store<any>;
    beforeEach(() => { // creates a fresh vuex store after each test and it mocks 2 getters
        store = createStore({
            getters: {
                'cart/cartItems': () => cartItems,
                'cart/cartTotal': () => 30,
            },
        }) as Store<any>;
        store.dispatch = vi.fn();
    });

    it('renders when open is true', () => {
        const wrapper = mount(CartDrawer, {
            global: { plugins: [store] }, // injecting the store into the component during testing
            props: { open: true },
        });
        expect(wrapper.find('.backdrop--visible').exists()).toBe(true);
    });

    it('emits close when backdrop is clicked', async () => {
        const wrapper = mount(CartDrawer, {
            global: { plugins: [store] },
            props: { open: true },
        });
        await wrapper.find('.backdrop').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('renders cart items from store', () => {
        const wrapper = mount(CartDrawer, {
            global: { plugins: [store] },
            props: { open: true },
        });
        expect(wrapper.findAll('.list__item')).toHaveLength(cartItems.length);
    });

    it('calls removeFromCart when remove button is clicked', async () => {
        const wrapper = mount(CartDrawer, {
            global: { plugins: [store] },
            props: { open: true },
        });
        await wrapper.find('.item__button').trigger('click');
        expect(store.dispatch).toHaveBeenCalledWith('cart/removeProductFromCart', cartItems[0].id);
    });
});
