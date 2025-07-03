import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Nav from '../../Nav/Nav.vue';
import { createStore, Store } from 'vuex';

describe('Nav', () => {
    let store: Store<any>;
    beforeEach(() => {
        store = createStore({
            getters: {
                'cart/cartItems': () => [{}, {}],
            },
        });
    });

    it('renders BurgerMenu, NavLinks, CartButton, and CartDrawer', () => {
        const wrapper = mount(Nav, { global: { plugins: [store] } });
        expect(wrapper.findComponent({ name: 'BurgerMenu' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'NavLinks' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'CartButton' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'CartDrawer' }).exists()).toBe(true);
    });

    it('toggles nav and cart', async () => {
        const wrapper = mount(Nav, { global: { plugins: [store] } });
        await wrapper.find('.hamburger').trigger('click');
        expect(wrapper.vm.isNavOpen).toBe(true);
        await wrapper.findComponent({ name: 'CartButton' }).trigger('click');
        expect(wrapper.vm.isCartOpen).toBe(true);
    });

    it('shows cart badge with correct count', () => {
        const wrapper = mount(Nav, { global: { plugins: [store] } });
        expect(wrapper.find('.cart__badge').text()).toBe('2');
    });
});
