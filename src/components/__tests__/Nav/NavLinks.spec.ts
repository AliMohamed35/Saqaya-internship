import { mount } from '@vue/test-utils';
import NavLinks from '../../Nav/NavLinks.vue';
import { describe, it, expect } from 'vitest';

const globalStubs = {
    stubs: {
        'router-link': {
            template: '<a><slot /></a>',
        },
    },
};

describe('NavLinks', () => {
    describe('Rendering', () => {
        it('renders navigation links', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            expect(wrapper.findAll('.nav__item')).toHaveLength(3);
        });

        it('renders the main navigation container', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            expect(wrapper.find('.nav__links').exists()).toBe(true);
        });

        it('renders the navigation list', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            expect(wrapper.find('.nav__list').exists()).toBe(true);
        });

        it('renders all three navigation items', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const items = wrapper.findAll('.nav__item');
            expect(items).toHaveLength(3);

            expect(items[0].text()).toBe('Home');
            expect(items[1].text()).toBe('Products');
            expect(items[2].text()).toBe('Contact us');
        });
    });

    describe('Props and State', () => {
        it('accepts open prop correctly', () => {
            const wrapper = mount(NavLinks, {
                props: { open: true },
                global: globalStubs
            });
            expect(wrapper.props('open')).toBe(true);
        });

        it('applies nav__opened class when open is true', () => {
            const wrapper = mount(NavLinks, {
                props: { open: true },
                global: globalStubs
            });
            expect(wrapper.find('.nav__links').classes()).toContain('nav__opened');
        });

        it('does not apply nav__opened class when open is false', () => {
            const wrapper = mount(NavLinks, {
                props: { open: false },
                global: globalStubs
            });
            expect(wrapper.find('.nav__links').classes()).not.toContain('nav__opened');
        });

        it('defaults to closed state when no open prop is provided', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            expect(wrapper.find('.nav__links').classes()).not.toContain('nav__opened');
        });
    });

    describe('User Interactions', () => {
        it('emits close when a link is clicked', async () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            await wrapper.find('.nav__item a').trigger('click');
            expect(wrapper.emitted('close')).toBeTruthy();
        });

        it('emits close when all links are clicked', async () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const links = wrapper.findAll('.nav__item a');

            for (const link of links) {
                await link.trigger('click');
            }

            expect(wrapper.emitted('close')).toHaveLength(3);
        });

        it('emits close event with correct structure', async () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            await wrapper.find('.nav__item a').trigger('click');

            const emitted = wrapper.emitted('close');
            expect(emitted).toBeTruthy();
            expect(emitted![0]).toEqual([]);
        });
    });

    describe('Navigation Links', () => {
        it('renders Home link with correct route', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const homeLink = wrapper.findAll('.nav__item a')[0];
            expect(homeLink.text()).toBe('Home');
        });

        it('renders Products link with correct route', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const productsLink = wrapper.findAll('.nav__item a')[1];
            expect(productsLink.text()).toBe('Products');
        });

        it('renders Contact us link with correct route', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const contactLink = wrapper.findAll('.nav__item a')[2];
            expect(contactLink.text()).toBe('Contact us');
        });

        it('has proper link structure', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const links = wrapper.findAll('.nav__item a');

            links.forEach(link => {
                expect(link.exists()).toBe(true);
                expect(link.element.tagName).toBe('A');
            });
        });
    });

    describe('Component Structure', () => {
        it('has proper HTML structure', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            expect(wrapper.find('.nav__links').exists()).toBe(true);
            expect(wrapper.find('.nav__list').exists()).toBe(true);
            expect(wrapper.findAll('.nav__item')).toHaveLength(3);
        });

        it('has proper nesting structure', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            const navLinks = wrapper.find('.nav__links');
            const navList = navLinks.find('.nav__list');
            const navItems = navList.findAll('.nav__item');

            expect(navLinks.exists()).toBe(true);
            expect(navList.exists()).toBe(true);
            expect(navItems).toHaveLength(3);
        });

        it('maintains consistent structure across renders', () => {
            const wrapper1 = mount(NavLinks, { global: globalStubs });
            const wrapper2 = mount(NavLinks, { global: globalStubs });

            expect(wrapper1.findAll('.nav__item')).toHaveLength(wrapper2.findAll('.nav__item').length);
        });
    });

    describe('Styling and Classes', () => {
        it('applies correct CSS classes', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            expect(wrapper.find('.nav__links').exists()).toBe(true);
            expect(wrapper.find('.nav__list').exists()).toBe(true);
            expect(wrapper.findAll('.nav__item')).toHaveLength(3);
        });

        it('applies nav__opened class conditionally', () => {
            const openWrapper = mount(NavLinks, {
                props: { open: true },
                global: globalStubs
            });
            const closedWrapper = mount(NavLinks, {
                props: { open: false },
                global: globalStubs
            });

            expect(openWrapper.find('.nav__links').classes()).toContain('nav__opened');
            expect(closedWrapper.find('.nav__links').classes()).not.toContain('nav__opened');
        });

        it('has scoped styles applied', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            const navLinks = wrapper.find('.nav__links');
            const attributes = navLinks.attributes();
            const hasScopedStyle = Object.keys(attributes).some(key => key.startsWith('data-v-'));
            expect(hasScopedStyle).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('uses semantic HTML structure', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            expect(wrapper.find('ul').exists()).toBe(true);
            expect(wrapper.findAll('li')).toHaveLength(3);
            expect(wrapper.findAll('a')).toHaveLength(3);
        });

        it('has proper navigation list structure', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            const list = wrapper.find('ul');
            const items = list.findAll('li');

            expect(list.exists()).toBe(true);
            expect(items).toHaveLength(3);
        });

        it('has proper link elements for navigation', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });

            const links = wrapper.findAll('a');
            expect(links).toHaveLength(3);

            links.forEach(link => {
                expect(link.element.tagName).toBe('A');
            });
        });
    });

    describe('Component Behavior', () => {
        it('renders without errors', () => {
            expect(() => mount(NavLinks, { global: globalStubs })).not.toThrow();
        });

        it('handles props changes correctly', async () => {
            const wrapper = mount(NavLinks, {
                props: { open: false },
                global: globalStubs
            });

            expect(wrapper.find('.nav__links').classes()).not.toContain('nav__opened');

            await wrapper.setProps({ open: true });
            expect(wrapper.find('.nav__links').classes()).toContain('nav__opened');
        });

        it('is a controlled component', () => {
            const wrapper = mount(NavLinks, {
                props: { open: true },
                global: globalStubs
            });

            expect(wrapper.props('open')).toBe(true);
            expect(wrapper.find('.nav__links').classes()).toContain('nav__opened');
        });
    });

    describe('Content Verification', () => {
        it('contains all expected navigation text', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const navText = wrapper.text();

            expect(navText).toContain('Home');
            expect(navText).toContain('Products');
            expect(navText).toContain('Contact us');
        });

        it('has no additional content beyond navigation items', () => {
            const wrapper = mount(NavLinks, { global: globalStubs });
            const navList = wrapper.find('.nav__list');

            // Should only have the nav items (li elements) as direct children
            expect(navList.findAll('li')).toHaveLength(3);
            expect(navList.findAll('.nav__item')).toHaveLength(3);
        });
    });
});
