import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hero from '../../Hero.vue';

describe('Hero.vue', () => {
    it('renders the hero section container', () => {
        const wrapper = mount(Hero);
        expect(wrapper.find('section.hero__section-container').exists()).toBe(true);
    });

    it('renders the hero heading', () => {
        const wrapper = mount(Hero);
        const heading = wrapper.find('h2');
        expect(heading.exists()).toBe(true);
    });

    it('uses semantic HTML structure', () => {
        const wrapper = mount(Hero);
        expect(wrapper.find('section').exists()).toBe(true);
        expect(wrapper.find('h2').exists()).toBe(true);
    });
});
