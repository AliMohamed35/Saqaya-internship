import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Nav from '../../Nav/Nav.vue';
import { createStore, Store } from 'vuex';

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
    let store: Store<any>;

    beforeEach(() => {
        store = createStore({
            getters: {
                'cart/cartItems': () => [{}, {}],
            },
        });
    });

    describe('Rendering', () => {
        it('renders BurgerMenu, NavLinks, CartButton, and CartDrawer', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.findComponent(MockBurgerMenu).exists()).toBe(true);
            expect(wrapper.findComponent(MockNavLinks).exists()).toBe(true);
            expect(wrapper.findComponent(MockCartButton).exists()).toBe(true);
            expect(wrapper.findComponent(MockCartDrawer).exists()).toBe(true);
        });

        it('renders the main navigation structure', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
        });

        it('renders the logo section', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.nav__logo').exists()).toBe(true);
            expect(wrapper.find('.nav__logo a').exists()).toBe(true);
            expect(wrapper.find('.nav__logo a').text()).toBe('LOGO');
        });

        it('renders the hamburger menu container', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.hamburger').exists()).toBe(true);
        });

        it('renders the cart badge container', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.cart__badge').exists()).toBe(true);
        });
    });

    describe('Component Integration', () => {
        it('passes correct props to NavLinks', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            const navLinks = wrapper.findComponent(MockNavLinks);

            expect(navLinks.props('open')).toBeDefined();
            expect(typeof navLinks.props('open')).toBe('boolean');
        });

        it('passes correct props to CartDrawer', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            const cartDrawer = wrapper.findComponent(MockCartDrawer);

            expect(cartDrawer.props('open')).toBeDefined();
            expect(typeof cartDrawer.props('open')).toBe('boolean');
        });

        it('listens to events from child components', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            const navLinks = wrapper.findComponent(MockNavLinks);
            const cartButton = wrapper.findComponent(MockCartButton);

            expect(navLinks.emitted()).toBeDefined();
            expect(cartButton.emitted()).toBeDefined();
        });
    });

    describe('User Interactions', () => {
        it('toggles nav when hamburger is clicked', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
                    plugins: [store],
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

        it('closes nav when close event is emitted from NavLinks', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            // First open the nav
            await wrapper.find('.hamburger').trigger('click');
            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(true);

            // Then emit close from NavLinks
            await wrapper.findComponent(MockNavLinks).vm.$emit('close');
            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(false);
        });

        it('closes cart when close event is emitted from CartDrawer', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            // First open the cart
            await wrapper.findComponent(MockCartButton).trigger('click');
            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(true);

            // Then emit close from CartDrawer
            await wrapper.findComponent(MockCartDrawer).vm.$emit('close');
            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(false);
        });

        it('toggles backdrop when nav is open', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            // Initially no backdrop
            expect(wrapper.find('.backdrop').exists()).toBe(false);

            // Open nav
            await wrapper.find('.hamburger').trigger('click');
            expect(wrapper.find('.backdrop').exists()).toBe(true);

            // Close nav
            await wrapper.findComponent(MockNavLinks).vm.$emit('close');
            expect(wrapper.find('.backdrop').exists()).toBe(false);
        });
    });

    describe('Store Integration', () => {
        it('shows cart badge with correct count', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.cart__badge').text()).toBe('2');
        });

        it('updates cart badge when store changes', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            // Initially shows 2 items
            expect(wrapper.find('.cart__badge').text()).toBe('2');

            // Update store to have 5 items
            const newStore = createStore({
                getters: {
                    'cart/cartItems': () => [{}, {}, {}, {}, {}],
                },
            });

            // Re-mount with new store
            const newWrapper = mount(Nav, {
                global: {
                    plugins: [newStore],
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
            expect(newWrapper.find('.cart__badge').text()).toBe('5');
        });

        it('shows cart badge with "0" when cart is empty', () => {
            const emptyStore = createStore({
                getters: {
                    'cart/cartItems': () => [],
                },
            });

            const wrapper = mount(Nav, {
                global: {
                    plugins: [emptyStore],
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
            expect(wrapper.find('.cart__badge').exists()).toBe(true);
            expect(wrapper.find('.cart__badge').text()).toBe('0');
        });
    });

    describe('Component State', () => {
        it('initializes with nav closed', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(false);
        });

        it('initializes with cart closed', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(false);
        });

        it('toggles nav state correctly', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(false);
            await wrapper.find('.hamburger').trigger('click');
            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(true);
            await wrapper.find('.hamburger').trigger('click');
            expect(wrapper.findComponent(MockNavLinks).props('open')).toBe(false);
        });

        it('toggles cart state correctly', async () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(false);
            await wrapper.findComponent(MockCartButton).trigger('click');
            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(true);
            await wrapper.findComponent(MockCartButton).trigger('click');
            expect(wrapper.findComponent(MockCartDrawer).props('open')).toBe(false);
        });
    });

    describe('Component Structure', () => {
        it('has proper HTML structure', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.hamburger').exists()).toBe(true);
            expect(wrapper.find('.nav__logo').exists()).toBe(true);
        });

        it('has correct CSS classes', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('.hamburger').exists()).toBe(true);
            expect(wrapper.find('.nav__logo').exists()).toBe(true);
            expect(wrapper.find('.cart__badge').exists()).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('uses semantic HTML structure', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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
            expect(wrapper.find('a').exists()).toBe(true);
        });

        it('has proper navigation structure', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            const header = wrapper.find('header');
            const nav = header.find('nav');

            expect(header.exists()).toBe(true);
            expect(nav.exists()).toBe(true);
        });
    });

    describe('Component Behavior', () => {
        it('renders without errors', () => {
            expect(() => mount(Nav, {
                global: {
                    plugins: [store],
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
            })).not.toThrow();
        });

        it('handles store changes gracefully', () => {
            const emptyStore = createStore({
                getters: {
                    'cart/cartItems': () => [],
                },
            });

            expect(() => mount(Nav, {
                global: {
                    plugins: [emptyStore],
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
            })).not.toThrow();
        });

        it('has scoped styles applied', () => {
            const wrapper = mount(Nav, {
                global: {
                    plugins: [store],
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

            const nav = wrapper.find('nav');
            const attributes = nav.attributes();
            const hasScopedStyle = Object.keys(attributes).some(key => key.startsWith('data-v-'));
            expect(hasScopedStyle).toBe(true);
        });
    });
});
