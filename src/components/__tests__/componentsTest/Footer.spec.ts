import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../../Footer.vue';

describe('Footer.vue', () => {
    it('renders the main footer and container sections', () => {
        const wrapper = mount(Footer);
        const footer = wrapper.find('footer.footer');
        expect(footer.exists()).toBe(true);
        expect(footer.find('.footer__left-cols').exists()).toBe(true);
        expect(footer.find('.footer__right-cols').exists()).toBe(true);
    });

    it('renders key sections: columns, address, and social', () => {
        const wrapper = mount(Footer);
        expect(wrapper.findAll('.footer__col').length).toBeGreaterThanOrEqual(3);
        expect(wrapper.find('.footer__address').exists()).toBe(true);
        expect(wrapper.find('.footer__social').exists()).toBe(true);
    });

    it('uses semantic HTML structure', () => {
        const wrapper = mount(Footer);
        expect(wrapper.find('footer').exists()).toBe(true);
        expect(wrapper.find('address').exists()).toBe(true);
        expect(wrapper.find('ul').exists()).toBe(true);
        expect(wrapper.find('a').exists()).toBe(true);
    });
});
