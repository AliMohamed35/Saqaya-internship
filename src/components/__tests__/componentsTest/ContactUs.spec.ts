import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactUs from '../../ContactUs.vue';

describe('ContactUs.vue', () => {
    it('renders the contact form with title and input fields', () => {
        const wrapper = mount(ContactUs);
        // Check for section and title
        expect(wrapper.find('section.contact').exists()).toBe(true);
        expect(wrapper.find('.contact__title').text()).toBe('Contact us');
        // Check for subtitle
        expect(wrapper.find('.contact__subtitle').exists()).toBe(true);
        // Check for form and fields
        const form = wrapper.find('form.contact__form');
        expect(form.exists()).toBe(true);
        expect(form.find('input#name').exists()).toBe(true);
        expect(form.find('input#email').exists()).toBe(true);
        expect(form.find('textarea#message').exists()).toBe(true);
        expect(form.find('button[type="submit"]').text()).toBe('Send Message');
    });
});
