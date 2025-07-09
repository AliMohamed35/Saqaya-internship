import { mount } from '@vue/test-utils';
import CartButton from '../../Nav/CartButton.vue';
import { describe, it, expect } from 'vitest';

describe('CartButton', () => {
    it('renders the main button element', () => {
        const wrapper = mount(CartButton);
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });

    it('renders the shopping cart icon', () => {
        const wrapper = mount(CartButton);
        const icon = wrapper.find('i.fas.fa-shopping-cart');
        expect(icon.exists()).toBe(true);
    });

    it('emits click event when button is clicked', async () => {
        const wrapper = mount(CartButton);
        const button = wrapper.find('button');
        await button.trigger('click');
        expect(wrapper.emitted('click')).toBeTruthy();
    });
});
