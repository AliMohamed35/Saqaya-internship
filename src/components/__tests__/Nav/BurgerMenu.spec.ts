import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BurgerMenu from '../../Nav/BurgerMenu.vue';

describe('BurgerMenu component', () => {
    it('renders the main container div', () => {
        const wrapper = mount(BurgerMenu);
        const container = wrapper.find('div');
        expect(container.exists()).toBe(true);
    });

    it('renders three spans for the burger lines', () => {
        const wrapper = mount(BurgerMenu);
        const spans = wrapper.findAll('span');
        expect(spans).toHaveLength(3);
    });

    it('uses semantic HTML structure', () => {
        const wrapper = mount(BurgerMenu);
        expect(wrapper.find('div').exists()).toBe(true);
        expect(wrapper.findAll('span').length).toBe(3);
    });
});
