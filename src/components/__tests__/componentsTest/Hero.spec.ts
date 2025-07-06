import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hero from '../../Hero.vue';

describe('Hero.vue', () => {
    describe('Rendering', () => {
        it('renders the hero section with proper structure', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('section.hero__section-container');
            expect(section.exists()).toBe(true);
        });

        it('renders the hero heading with correct text', () => {
            const wrapper = mount(Hero);

            const heading = wrapper.find('h2');
            expect(heading.exists()).toBe(true);
            expect(heading.text()).toBe('This is the hero section');
        });
    });

    describe('Styling and Layout', () => {
        it('applies correct CSS class to the main container', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('.hero__section-container');
            expect(section.exists()).toBe(true);
            expect(section.classes()).toContain('hero__section-container');
        });

        it('has inline border-bottom style applied', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('section.hero__section-container');
            expect(section.attributes('style')).toContain('border-bottom: 1px solid black');
        });

        it('renders as a semantic section element', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('section');
            expect(section.exists()).toBe(true);
        });
    });

    describe('Content Structure', () => {
        it('has proper heading hierarchy with h2 element', () => {
            const wrapper = mount(Hero);

            const heading = wrapper.find('h2');
            expect(heading.exists()).toBe(true);
            expect(heading.element.tagName).toBe('H2');
        });

        it('contains the expected hero text content', () => {
            const wrapper = mount(Hero);

            const sectionText = wrapper.text();
            expect(sectionText).toContain('This is the hero section');
        });
    });

    describe('Component Structure', () => {
        it('has a single main container section', () => {
            const wrapper = mount(Hero);

            const sections = wrapper.findAll('section');
            expect(sections).toHaveLength(1);
        });

        it('has a single heading element', () => {
            const wrapper = mount(Hero);

            const headings = wrapper.findAll('h2');
            expect(headings).toHaveLength(1);
        });

        it('has proper nesting structure', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('section.hero__section-container');
            const heading = section.find('h2');

            expect(section.exists()).toBe(true);
            expect(heading.exists()).toBe(true);
            expect(heading.element.parentElement).toBe(section.element);
        });
    });

    describe('Accessibility', () => {
        it('uses semantic HTML structure', () => {
            const wrapper = mount(Hero);

            // Check for semantic elements
            expect(wrapper.find('section').exists()).toBe(true);
            expect(wrapper.find('h2').exists()).toBe(true);
        });

        it('has proper heading structure for screen readers', () => {
            const wrapper = mount(Hero);

            const heading = wrapper.find('h2');
            expect(heading.exists()).toBe(true);
            expect(heading.text()).toBeTruthy();
        });
    });

    describe('Component Behavior', () => {
        it('renders without errors', () => {
            expect(() => mount(Hero)).not.toThrow();
        });

        it('maintains consistent structure across renders', () => {
            const wrapper1 = mount(Hero);
            const wrapper2 = mount(Hero);

            expect(wrapper1.html()).toBe(wrapper2.html());
        });

        it('has scoped styles applied', () => {
            const wrapper = mount(Hero);

            // The component uses scoped styles, so we should see data attributes
            const section = wrapper.find('section');
            const attributes = section.attributes();

            // Check if any attribute starts with 'data-v-'
            const hasScopedStyle = Object.keys(attributes).some(key => key.startsWith('data-v-'));
            expect(hasScopedStyle).toBe(true);
        });
    });

    describe('Content Verification', () => {
        it('displays the correct hero message', () => {
            const wrapper = mount(Hero);

            const heroText = wrapper.find('h2').text();
            expect(heroText).toBe('This is the hero section');
        });

        it('has no additional content beyond the heading', () => {
            const wrapper = mount(Hero);

            const section = wrapper.find('section.hero__section-container');
            const children = section.findAll('*');

            // Should only have the h2 element as a direct child
            expect(children).toHaveLength(1);
            expect(children[0].element.tagName).toBe('H2');
        });
    });
});
