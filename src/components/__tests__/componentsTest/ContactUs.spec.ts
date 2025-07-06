import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactUs from '../../ContactUs.vue';

describe('ContactUs.vue', () => {
    describe('Rendering', () => {
        it('renders the contact section with proper structure', () => {
            const wrapper = mount(ContactUs);

            // Check main section
            expect(wrapper.find('section.contact').exists()).toBe(true);
            expect(wrapper.find('.contact__container').exists()).toBe(true);
        });

        it('renders the title and subtitle correctly', () => {
            const wrapper = mount(ContactUs);

            // Check title
            const title = wrapper.find('.contact__title');
            expect(title.exists()).toBe(true);
            expect(title.text()).toBe('Contact us');

            // Check subtitle
            const subtitle = wrapper.find('.contact__subtitle');
            expect(subtitle.exists()).toBe(true);
            expect(subtitle.text()).toBe("Get in touch with us. We'd love to hear from you.");
        });

        it('renders the contact form with all required elements', () => {
            const wrapper = mount(ContactUs);

            const form = wrapper.find('form.contact__form');
            expect(form.exists()).toBe(true);
            expect(form.attributes('action')).toBe('#');
        });
    });

    describe('Form Elements', () => {
        it('renders all form groups with proper structure', () => {
            const wrapper = mount(ContactUs);

            const formGroups = wrapper.findAll('.contact__form-group');
            expect(formGroups).toHaveLength(3);
        });

        it('renders name input field with correct attributes', () => {
            const wrapper = mount(ContactUs);

            const nameInput = wrapper.find('input#name');
            expect(nameInput.exists()).toBe(true);
            expect(nameInput.attributes('type')).toBe('text');
            expect(nameInput.attributes('placeholder')).toBe('Enter your name');
            expect(nameInput.attributes('required')).toBeDefined();
            expect(nameInput.classes()).toContain('contact__input');

            const nameLabel = wrapper.find('label[for="name"]');
            expect(nameLabel.exists()).toBe(true);
            expect(nameLabel.text()).toBe('Name');
            expect(nameLabel.classes()).toContain('contact__label');
        });

        it('renders email input field with correct attributes', () => {
            const wrapper = mount(ContactUs);

            const emailInput = wrapper.find('input#email');
            expect(emailInput.exists()).toBe(true);
            expect(emailInput.attributes('type')).toBe('email');
            expect(emailInput.attributes('placeholder')).toBe('Enter your email');
            expect(emailInput.attributes('required')).toBeDefined();
            expect(emailInput.classes()).toContain('contact__input');

            const emailLabel = wrapper.find('label[for="email"]');
            expect(emailLabel.exists()).toBe(true);
            expect(emailLabel.text()).toBe('Email');
            expect(emailLabel.classes()).toContain('contact__label');
        });

        it('renders message textarea with correct attributes', () => {
            const wrapper = mount(ContactUs);

            const messageTextarea = wrapper.find('textarea#message');
            expect(messageTextarea.exists()).toBe(true);
            expect(messageTextarea.attributes('cols')).toBe('30');
            expect(messageTextarea.attributes('rows')).toBe('6');
            expect(messageTextarea.attributes('placeholder')).toBe('Enter your message');
            expect(messageTextarea.attributes('required')).toBeDefined();
            expect(messageTextarea.classes()).toContain('contact__textarea');

            const messageLabel = wrapper.find('label[for="message"]');
            expect(messageLabel.exists()).toBe(true);
            expect(messageLabel.text()).toBe('Message');
            expect(messageLabel.classes()).toContain('contact__label');
        });

        it('renders submit button with correct text and attributes', () => {
            const wrapper = mount(ContactUs);

            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.exists()).toBe(true);
            expect(submitButton.text()).toBe('Send Message');
            expect(submitButton.classes()).toContain('contact__button');
        });
    });

    describe('Styling Classes', () => {
        it('applies correct CSS classes to all elements', () => {
            const wrapper = mount(ContactUs);

            // Check main container classes
            expect(wrapper.find('.contact').exists()).toBe(true);
            expect(wrapper.find('.contact__container').exists()).toBe(true);
            expect(wrapper.find('.contact__title').exists()).toBe(true);
            expect(wrapper.find('.contact__subtitle').exists()).toBe(true);
            expect(wrapper.find('.contact__form').exists()).toBe(true);

            // Check form element classes
            expect(wrapper.find('.contact__form-group').exists()).toBe(true);
            expect(wrapper.find('.contact__label').exists()).toBe(true);
            expect(wrapper.find('.contact__input').exists()).toBe(true);
            expect(wrapper.find('.contact__textarea').exists()).toBe(true);
            expect(wrapper.find('.contact__button').exists()).toBe(true);
        });
    });

    describe('Form Validation', () => {
        it('has required attributes on all form fields', () => {
            const wrapper = mount(ContactUs);

            const nameInput = wrapper.find('input#name');
            const emailInput = wrapper.find('input#email');
            const messageTextarea = wrapper.find('textarea#message');

            expect(nameInput.attributes('required')).toBeDefined();
            expect(emailInput.attributes('required')).toBeDefined();
            expect(messageTextarea.attributes('required')).toBeDefined();
        });
    });

    describe('Accessibility', () => {
        it('has proper label associations for form fields', () => {
            const wrapper = mount(ContactUs);

            // Check that labels are properly associated with inputs
            const nameLabel = wrapper.find('label[for="name"]');
            const emailLabel = wrapper.find('label[for="email"]');
            const messageLabel = wrapper.find('label[for="message"]');

            expect(nameLabel.exists()).toBe(true);
            expect(emailLabel.exists()).toBe(true);
            expect(messageLabel.exists()).toBe(true);

            // Check that corresponding inputs exist
            expect(wrapper.find('input#name').exists()).toBe(true);
            expect(wrapper.find('input#email').exists()).toBe(true);
            expect(wrapper.find('textarea#message').exists()).toBe(true);
        });

        it('has proper form structure with semantic HTML', () => {
            const wrapper = mount(ContactUs);

            // Check semantic structure
            expect(wrapper.find('section').exists()).toBe(true);
            expect(wrapper.find('form').exists()).toBe(true);
            expect(wrapper.find('h2').exists()).toBe(true);
            expect(wrapper.find('label').exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('textarea').exists()).toBe(true);
            expect(wrapper.find('button').exists()).toBe(true);
        });
    });
});
