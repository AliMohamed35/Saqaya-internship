import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../../Footer.vue';

describe('Footer.vue', () => {
    it('renders the footer with main sections and key text', () => {
        const wrapper = mount(Footer);
        // Check for main footer element
        const footer = wrapper.find('footer.footer');
        expect(footer.exists()).toBe(true);
        // Check for left columns
        expect(footer.findAll('.footer__col-title').length).toBeGreaterThanOrEqual(3);
        expect(footer.text()).toContain('Navigate');
        expect(footer.text()).toContain('Collection');
        expect(footer.text()).toContain('Categories');
        // Check for address
        expect(footer.text()).toContain('399 CrowField Road');
        expect(footer.find('a[href="mailto:alimohameddev35@gmail.com"]').exists()).toBe(true);
        // Check for social section
        expect(footer.text()).toContain('Get Social');
        expect(footer.findAll('.footer__social-icons a').length).toBeGreaterThanOrEqual(3);
    });
});
