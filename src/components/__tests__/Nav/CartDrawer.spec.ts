import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import CartDrawer from '../../Nav/CartDrawer.vue';
import { useCartStore } from '../../../store/cart';

describe('CartDrawer', () => {
    const cartItems = [
        { id: 1, title: 'Item 1', quantity: 2, price: 10 },
        { id: 2, title: 'Item 2', quantity: 1, price: 20 },
    ];
    let cartStore: ReturnType<typeof useCartStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        cartStore = useCartStore();
        cartStore.cart = cartItems as any;
        cartStore.removeProductFromCart = vi.fn();
    });

    it('renders the cart drawer and backdrop', () => {
        const wrapper = mount(CartDrawer, {
            props: { open: true },
        });
        expect(wrapper.find('.backdrop').exists()).toBe(true);
        expect(wrapper.find('.cart').exists()).toBe(true);
    });

    it('renders cart items and remove button', () => {
        const wrapper = mount(CartDrawer, {
            props: { open: true },
        });
        const items = wrapper.findAll('.list__item');
        expect(items.length).toBe(cartItems.length);
        expect(wrapper.find('.item__button').exists()).toBe(true);
    });

    it('emits close when backdrop is clicked', async () => {
        const wrapper = mount(CartDrawer, {
            props: { open: true },
        });
        await wrapper.find('.backdrop').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });
});
