import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../../Footer.vue';

describe('Footer.vue', () => {
    describe('Rendering', () => {
        it('renders the footer with proper structure', () => {
            const wrapper = mount(Footer);

            // Check main footer element
            const footer = wrapper.find('footer.footer');
            expect(footer.exists()).toBe(true);

            // Check main container sections
            expect(footer.find('.footer__left-cols').exists()).toBe(true);
            expect(footer.find('.footer__right-cols').exists()).toBe(true);
        });

        it('renders all three left column sections', () => {
            const wrapper = mount(Footer);

            const leftCols = wrapper.find('.footer__left-cols');
            const columns = leftCols.findAll('.footer__col');
            expect(columns).toHaveLength(3);
        });
    });

    describe('Navigation Sections', () => {
        it('renders Navigate section with correct title and links', () => {
            const wrapper = mount(Footer);

            const navigateSection = wrapper.findAll('.footer__col')[0];
            const title = navigateSection.find('.footer__col-title');
            expect(title.text()).toBe('Navigate');

            const links = navigateSection.findAll('li');
            expect(links).toHaveLength(4);
            expect(links[0].text()).toBe('About us');
            expect(links[1].text()).toBe('Blog');
            expect(links[2].text()).toBe('Contact us');
            expect(links[3].text()).toBe('Sitemap');

            // Check that first link has href
            const aboutLink = navigateSection.find('a[href="/about"]');
            expect(aboutLink.exists()).toBe(true);
        });

        it('renders Collection section with correct title and links', () => {
            const wrapper = mount(Footer);

            const collectionSection = wrapper.findAll('.footer__col')[1];
            const title = collectionSection.find('.footer__col-title');
            expect(title.text()).toBe('Collection');

            const links = collectionSection.findAll('li');
            expect(links).toHaveLength(4);
            expect(links[0].text()).toBe('About us');
            expect(links[1].text()).toBe('Blog');
            expect(links[2].text()).toBe('Contact us');
            expect(links[3].text()).toBe('Sitemap');

            // Check that first link has href
            const aboutLink = collectionSection.find('a[href="/about"]');
            expect(aboutLink.exists()).toBe(true);
        });

        it('renders Categories section with correct title and items', () => {
            const wrapper = mount(Footer);

            const categoriesSection = wrapper.findAll('.footer__col')[2];
            const title = categoriesSection.find('.footer__col-title');
            expect(title.text()).toBe('Categories');

            const items = categoriesSection.findAll('li');
            expect(items).toHaveLength(4);
            expect(items[0].text()).toBe('Tables');
            expect(items[1].text()).toBe('Sofa');
            expect(items[2].text()).toBe('Lamps');
            expect(items[3].text()).toBe('Chairs');
        });
    });

    describe('Contact Information', () => {
        it('renders address section with correct information', () => {
            const wrapper = mount(Footer);

            const address = wrapper.find('.footer__address');
            expect(address.exists()).toBe(true);

            const addressHeading = address.find('h4');
            expect(addressHeading.exists()).toBe(true);
            expect(addressHeading.text()).toContain('399 CrowField Road');
            expect(addressHeading.text()).toContain('Phoenix, Arizona 85012');
        });

        it('renders email link with correct href and text', () => {
            const wrapper = mount(Footer);

            const emailLink = wrapper.find('a[href="mailto:alimohameddev35@gmail.com"]');
            expect(emailLink.exists()).toBe(true);
            expect(emailLink.text()).toBe('alimohameddev35@gmail.com');
        });

        it('renders phone link with correct href and text', () => {
            const wrapper = mount(Footer);

            const phoneLink = wrapper.find('a[href="tel:+101093248871"]');
            expect(phoneLink.exists()).toBe(true);
            expect(phoneLink.text()).toBe('01093248871');
        });
    });

    describe('Social Media Section', () => {
        it('renders social section with correct title', () => {
            const wrapper = mount(Footer);

            const socialSection = wrapper.find('.footer__social');
            expect(socialSection.exists()).toBe(true);

            const title = socialSection.find('.footer__social-title');
            expect(title.exists()).toBe(true);
            expect(title.text()).toBe('Get Social');
        });

        it('renders all social media icons with proper attributes', () => {
            const wrapper = mount(Footer);

            const socialIcons = wrapper.findAll('.footer__social-icons a');
            expect(socialIcons).toHaveLength(3);

            // Check Facebook
            const facebookLink = socialIcons[0];
            expect(facebookLink.attributes('href')).toBe('#');
            expect(facebookLink.attributes('aria-label')).toBe('Facebook');
            expect(facebookLink.find('.fab.fa-facebook').exists()).toBe(true);

            // Check Twitter
            const twitterLink = socialIcons[1];
            expect(twitterLink.attributes('href')).toBe('#');
            expect(twitterLink.attributes('aria-label')).toBe('Twitter');
            expect(twitterLink.find('.fab.fa-twitter').exists()).toBe(true);

            // Check Instagram
            const instagramLink = socialIcons[2];
            expect(instagramLink.attributes('href')).toBe('#');
            expect(instagramLink.attributes('aria-label')).toBe('Instagram');
            expect(instagramLink.find('.fab.fa-instagram').exists()).toBe(true);
        });
    });

    describe('Styling Classes', () => {
        it('applies correct CSS classes to all elements', () => {
            const wrapper = mount(Footer);

            // Check main footer classes
            expect(wrapper.find('.footer').exists()).toBe(true);
            expect(wrapper.find('.footer__left-cols').exists()).toBe(true);
            expect(wrapper.find('.footer__right-cols').exists()).toBe(true);

            // Check column classes
            expect(wrapper.find('.footer__col').exists()).toBe(true);
            expect(wrapper.find('.footer__col-title').exists()).toBe(true);
            expect(wrapper.find('.footer__col-list').exists()).toBe(true);

            // Check address classes
            expect(wrapper.find('.footer__address').exists()).toBe(true);

            // Check social classes
            expect(wrapper.find('.footer__social').exists()).toBe(true);
            expect(wrapper.find('.footer__social-title').exists()).toBe(true);
            expect(wrapper.find('.footer__social-icons').exists()).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('has proper semantic HTML structure', () => {
            const wrapper = mount(Footer);

            // Check semantic elements
            expect(wrapper.find('footer').exists()).toBe(true);
            expect(wrapper.find('address').exists()).toBe(true);
            expect(wrapper.find('h4').exists()).toBe(true);
            expect(wrapper.find('ul').exists()).toBe(true);
            expect(wrapper.find('li').exists()).toBe(true);
            expect(wrapper.find('a').exists()).toBe(true);
        });

        it('has proper aria-labels for social media icons', () => {
            const wrapper = mount(Footer);

            const socialIcons = wrapper.findAll('.footer__social-icons a');
            expect(socialIcons[0].attributes('aria-label')).toBe('Facebook');
            expect(socialIcons[1].attributes('aria-label')).toBe('Twitter');
            expect(socialIcons[2].attributes('aria-label')).toBe('Instagram');
        });

        it('has proper link structure with href attributes', () => {
            const wrapper = mount(Footer);

            // Check navigation links
            const aboutLinks = wrapper.findAll('a[href="/about"]');
            expect(aboutLinks.length).toBeGreaterThan(0);

            // Check contact links
            expect(wrapper.find('a[href="mailto:alimohameddev35@gmail.com"]').exists()).toBe(true);
            expect(wrapper.find('a[href="tel:+101093248871"]').exists()).toBe(true);

            // Check social links
            const socialLinks = wrapper.findAll('.footer__social-icons a[href="#"]');
            expect(socialLinks).toHaveLength(3);
        });
    });

    describe('Content Verification', () => {
        it('contains all expected text content', () => {
            const wrapper = mount(Footer);
            const footerText = wrapper.text();

            // Check section titles
            expect(footerText).toContain('Navigate');
            expect(footerText).toContain('Collection');
            expect(footerText).toContain('Categories');
            expect(footerText).toContain('Get Social');

            // Check navigation items
            expect(footerText).toContain('About us');
            expect(footerText).toContain('Blog');
            expect(footerText).toContain('Contact us');
            expect(footerText).toContain('Sitemap');

            // Check category items
            expect(footerText).toContain('Tables');
            expect(footerText).toContain('Sofa');
            expect(footerText).toContain('Lamps');
            expect(footerText).toContain('Chairs');

            // Check contact information
            expect(footerText).toContain('399 CrowField Road');
            expect(footerText).toContain('Phoenix, Arizona 85012');
            expect(footerText).toContain('alimohameddev35@gmail.com');
            expect(footerText).toContain('01093248871');
        });
    });
});
