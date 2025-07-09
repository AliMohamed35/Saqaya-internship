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
    it('renders the main navigation container', () => {
        const wrapper = mount(NavLinks, { global: globalStubs });
        expect(wrapper.find('.nav__links').exists()).toBe(true);
    });

    it('renders all navigation items', () => {
        const wrapper = mount(NavLinks, { global: globalStubs });
        expect(wrapper.findAll('.nav__item')).toHaveLength(3);
    });

    it('emits close when a link is clicked', async () => {
        const wrapper = mount(NavLinks, { global: globalStubs });
        await wrapper.find('.nav__item a').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });
});
