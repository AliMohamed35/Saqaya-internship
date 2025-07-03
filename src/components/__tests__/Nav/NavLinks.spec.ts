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
    it('renders navigation links', () => {
        const wrapper = mount(NavLinks, { global: globalStubs });
        expect(wrapper.findAll('.nav__item')).toHaveLength(3);
    });

    it('emits close when a link is clicked', async () => {
        const wrapper = mount(NavLinks, { global: globalStubs });
        await wrapper.find('.nav__item a').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('applies nav__opened class when open is true', () => {
        const wrapper = mount(NavLinks, { props: { open: true }, global: globalStubs });
        expect(wrapper.find('.nav__links').classes()).toContain('nav__opened');
    });
});
