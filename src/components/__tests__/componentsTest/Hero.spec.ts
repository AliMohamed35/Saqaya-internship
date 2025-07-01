import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hero from '../../Hero.vue';

describe('Hero.vue', () => {
    it('renders the hero section with correct text', () => {
        const wrapper = mount(Hero);
        const section = wrapper.find('section.hero__section-container');
        expect(section.exists()).toBe(true);
        expect(section.find('h2').text()).toBe('This is the hero section');
    });
});
