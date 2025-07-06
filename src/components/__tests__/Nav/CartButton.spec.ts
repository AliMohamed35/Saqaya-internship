import { mount } from '@vue/test-utils';
import CartButton from '../../Nav/CartButton.vue';
import { describe, it, expect } from 'vitest';

describe('CartButton', () => {
    describe('Rendering', () => {
        it('renders a button with shopping cart icon', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button.nav__cart-btn');
            expect(button.exists()).toBe(true);
            expect(button.find('i.fas.fa-shopping-cart').exists()).toBe(true);
        });

        it('renders the main button element', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');
            expect(button.exists()).toBe(true);
            expect(button.classes()).toContain('nav__cart-btn');
        });

        it('renders the shopping cart icon', () => {
            const wrapper = mount(CartButton);
            const icon = wrapper.find('i.fas.fa-shopping-cart');
            expect(icon.exists()).toBe(true);
            expect(icon.classes()).toContain('fas');
            expect(icon.classes()).toContain('fa-shopping-cart');
        });
    });

    describe('Styling and Classes', () => {
        it('applies correct CSS classes to button', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');
            expect(button.classes()).toContain('nav__cart-btn');
        });

        it('applies correct CSS classes to icon', () => {
            const wrapper = mount(CartButton);
            const icon = wrapper.find('i');
            expect(icon.classes()).toContain('fas');
            expect(icon.classes()).toContain('fa-shopping-cart');
        });

        it('has proper element structure', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');
            const icon = button.find('i');

            expect(button.exists()).toBe(true);
            expect(icon.exists()).toBe(true);
            expect(icon.element.parentElement).toBe(button.element);
        });
    });

    describe('Component Structure', () => {
        it('has exactly one button element', () => {
            const wrapper = mount(CartButton);
            const buttons = wrapper.findAll('button');
            expect(buttons).toHaveLength(1);
        });

        it('has exactly one icon element', () => {
            const wrapper = mount(CartButton);
            const icons = wrapper.findAll('i');
            expect(icons).toHaveLength(1);
        });

        it('maintains consistent structure across renders', () => {
            const wrapper1 = mount(CartButton);
            const wrapper2 = mount(CartButton);

            expect(wrapper1.html()).toBe(wrapper2.html());
        });
    });

    describe('Accessibility', () => {
        it('uses semantic HTML structure', () => {
            const wrapper = mount(CartButton);

            // Check for semantic elements
            expect(wrapper.find('button').exists()).toBe(true);
            expect(wrapper.find('i').exists()).toBe(true);
        });

        it('has proper button element for accessibility', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');

            expect(button.exists()).toBe(true);
            expect(button.element.tagName).toBe('BUTTON');
        });

        it('has proper icon element for screen readers', () => {
            const wrapper = mount(CartButton);
            const icon = wrapper.find('i');

            expect(icon.exists()).toBe(true);
            expect(icon.element.tagName).toBe('I');
        });
    });

    describe('Event Handling', () => {
        it('emits click event when button is clicked', async () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');

            await button.trigger('click');
            expect(wrapper.emitted('click')).toBeTruthy();
        });

        it('can be clicked multiple times', async () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');

            await button.trigger('click');
            await button.trigger('click');
            await button.trigger('click');

            expect(wrapper.emitted('click')).toHaveLength(3);
        });

        it('button is clickable and interactive', async () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');

            expect(button.exists()).toBe(true);
            await button.trigger('click');
            expect(wrapper.emitted('click')).toBeTruthy();
        });
    });

    describe('Component Behavior', () => {
        it('renders without errors', () => {
            expect(() => mount(CartButton)).not.toThrow();
        });

        it('is a clickable component', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');

            expect(button.exists()).toBe(true);
            expect(button.element.disabled).toBeFalsy();
        });

        it('has no props or complex state', () => {
            const wrapper = mount(CartButton);

            // Should not have any props
            expect(wrapper.props()).toEqual({});
        });
    });

    describe('Content Verification', () => {
        it('has no text content', () => {
            const wrapper = mount(CartButton);
            expect(wrapper.text()).toBe('');
        });

        it('contains only button and icon elements', () => {
            const wrapper = mount(CartButton);
            const button = wrapper.find('button');
            const icon = button.find('i');

            // Should only have the icon as a child
            expect(button.findAll('*')).toHaveLength(1);
            expect(icon.exists()).toBe(true);
        });

        it('has correct icon classes', () => {
            const wrapper = mount(CartButton);
            const icon = wrapper.find('i');

            expect(icon.classes()).toContain('fas');
            expect(icon.classes()).toContain('fa-shopping-cart');
        });
    });
});
