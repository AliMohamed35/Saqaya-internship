import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BurgerMenu from '../../Nav/BurgerMenu.vue';

describe('BurgerMenu component', () => {
    it('renders three spans for the burger lines', () => {
        const wrapper = mount(BurgerMenu);
        const spans = wrapper.findAll('span');
        expect(spans).toHaveLength(3);
    });
});
