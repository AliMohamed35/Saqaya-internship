import { mount } from '@vue/test-utils';
import CartButton from '../../Nav/CartButton.vue';
import { describe, it, expect } from 'vitest';

describe('CartButton', () => {
    it('renders a button with shopping cart icon', () => {
        const wrapper = mount(CartButton);
        const button = wrapper.find('button.nav__cart-btn');
        expect(button.exists()).toBe(true);
        expect(button.find('i.fas.fa-shopping-cart').exists()).toBe(true);
    });
});
