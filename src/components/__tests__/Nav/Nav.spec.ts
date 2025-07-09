import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Nav from '../../Nav/Nav.vue';
import { useCartStore } from '../../../store/cart';

// Mock child components
const MockBurgerMenu = {
    name: 'BurgerMenu',
    template: '<div class="mock-burger-menu"></div>'
};

const MockNavLinks = {
    name: 'NavLinks',
    template: '<div class="mock-nav-links"></div>',
    props: ['open'],
    emits: ['close']
};

const MockCartButton = {
    name: 'CartButton',
    template: '<button class="mock-cart-button" @click="$emit(\'click\')"></button>',
    emits: ['click']
};

const MockCartDrawer = {
    name: 'CartDrawer',
    template: '<div class="mock-cart-drawer"></div>',
    props: ['open'],
    emits: ['close']
};

describe('Nav', () => {
    let cartStore: ReturnType<typeof useCartStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        cartStore = useCartStore();
        cartStore.cart = [{}, {}] as any; // 2 items for badge
    });

    it('renders the main navigation structure and key elements', () => {
        const wrapper = mount(Nav, {
            global: {
                stubs: {
                    BurgerMenu: MockBurgerMenu,
                    NavLinks: MockNavLinks,
                    CartButton: MockCartButton,
                    CartDrawer: MockCartDrawer,
                    'router-link': {
                        template: '<a><slot /></a>',
                        props: ['to']
                    }
                }
            }
        });
        expect(wrapper.find('header').exists()).toBe(true);
        expect(wrapper.find('nav').exists()).toBe(true);
        expect(wrapper.find('.nav__logo').exists()).toBe(true);
        expect(wrapper.find('.hamburger').exists()).toBe(true);
        expect(wrapper.find('.cart__badge').exists()).toBe(true);
    });

    it('toggles nav when hamburger is clicked', async () => {
        const wrapper = mount(Nav, {
            global: {
                stubs: {
                    BurgerMenu: MockBurgerMenu,
                    NavLinks: MockNavLinks,
                    CartButton: MockCartButton,
                    CartDrawer: MockCartDrawer,
                    'router-link': {
                        template: '<a><slot /></a>',
                        props: ['to']
                    }
                }
            }
        });
        await wrapper.find('.hamburger').trigger('click');
        expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(true);
    });

    it('toggles cart when cart button is clicked', async () => {
        const wrapper = mount(Nav, {
            global: {
                stubs: {
                    BurgerMenu: MockBurgerMenu,
                    NavLinks: MockNavLinks,
                    CartButton: MockCartButton,
                    CartDrawer: MockCartDrawer,
                    'router-link': {
                        template: '<a><slot /></a>',
                        props: ['to']
                    }
                }
            }
        });
        await wrapper.findComponent(MockCartButton).trigger('click');
        expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(true);
    });
});
