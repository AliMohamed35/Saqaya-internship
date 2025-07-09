import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactUs from '../../ContactUs.vue';

describe('ContactUs.vue', () => {
    it('renders the contact section and container', () => {
        const wrapper = mount(ContactUs);
        expect(wrapper.find('section.contact').exists()).toBe(true);
        expect(wrapper.find('.contact__container').exists()).toBe(true);
    });

    it('renders all form fields and submit button', () => {
        const wrapper = mount(ContactUs);
        expect(wrapper.find('input#name').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('textarea#message').exists()).toBe(true);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('associates labels with form fields', () => {
        const wrapper = mount(ContactUs);
        expect(wrapper.find('label[for="name"]').exists()).toBe(true);
        expect(wrapper.find('label[for="email"]').exists()).toBe(true);
        expect(wrapper.find('label[for="message"]').exists()).toBe(true);
    });
});
