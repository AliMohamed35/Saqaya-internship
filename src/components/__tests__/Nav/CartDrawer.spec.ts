import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CartDrawer from '../../Nav/CartDrawer.vue';
import { createStore, Store } from 'vuex';

describe('CartDrawer', () => {
    const cartItems = [
        { id: 1, title: 'Item 1', quantity: 2, price: 10 },
        { id: 2, title: 'Item 2', quantity: 1, price: 20 },
    ];
    let store: Store<any>;

    beforeEach(() => {
        store = createStore({
            getters: {
                'cart/cartItems': () => cartItems,
                'cart/cartTotal': () => 30,
            },
        }) as Store<any>;
        store.dispatch = vi.fn();
    });

    describe('Rendering', () => {
        it('renders when open is true', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            expect(wrapper.find('.backdrop--visible').exists()).toBe(true);
        });

        it('does not render backdrop--visible when open is false', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: false },
            });
            expect(wrapper.find('.backdrop--visible').exists()).toBe(false);
        });

        it('renders the cart title', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            expect(wrapper.find('.cart__title').text()).toBe('Cart');
        });

        it('renders cart items from store', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            expect(wrapper.findAll('.list__item')).toHaveLength(cartItems.length);
        });
    });

    describe('Props and State', () => {
        it('accepts open prop correctly', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            expect(wrapper.props('open')).toBe(true);
        });

        it('applies correct classes based on open prop', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const backdrop = wrapper.find('.backdrop');
            expect(backdrop.classes()).toContain('backdrop--visible');

            const cart = wrapper.find('.cart');
            expect(cart.classes()).toContain('showCart');
        });

        it('does not apply visible classes when closed', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: false },
            });

            const backdrop = wrapper.find('.backdrop');
            expect(backdrop.classes()).not.toContain('backdrop--visible');

            const cart = wrapper.find('.cart');
            expect(cart.classes()).not.toContain('showCart');
        });
    });

    describe('Store Integration', () => {
        it('displays cart items from store', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const items = wrapper.findAll('.list__item');
            expect(items).toHaveLength(2);

            // Check first item content
            expect(items[0].text()).toContain('Item 1');
            expect(items[0].text()).toContain('x 2');
            expect(items[0].text()).toContain('Price: $20.00');
        });

        it('displays empty cart message when no items', () => {
            const emptyStore = createStore({
                getters: {
                    'cart/cartItems': () => [],
                    'cart/cartTotal': () => 0,
                },
            });

            const wrapper = mount(CartDrawer, {
                global: { plugins: [emptyStore] },
                props: { open: true },
            });

            expect(wrapper.text()).toContain('Your cart is empty....');
            expect(wrapper.findAll('.list__item')).toHaveLength(0);
        });

        it('calculates item prices correctly', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const items = wrapper.findAll('.list__item');
            expect(items[0].text()).toContain('Price: $20.00'); // 2 * 10
            expect(items[1].text()).toContain('Price: $20.00'); // 1 * 20
        });
    });

    describe('User Interactions', () => {
        it('emits close when backdrop is clicked', async () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            await wrapper.find('.backdrop').trigger('click');
            expect(wrapper.emitted('close')).toBeTruthy();
        });

        it('calls removeFromCart when remove button is clicked', async () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            await wrapper.find('.item__button').trigger('click');
            expect(store.dispatch).toHaveBeenCalledWith('cart/removeProductFromCart', cartItems[0].id);
        });

        it('calls removeFromCart with correct product ID for each item', async () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const removeButtons = wrapper.findAll('.item__button');
            expect(removeButtons).toHaveLength(2);

            await removeButtons[1].trigger('click');
            expect(store.dispatch).toHaveBeenCalledWith('cart/removeProductFromCart', cartItems[1].id);
        });

        it('does not emit close when cart content is clicked', async () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            await wrapper.find('.cart').trigger('click');
            expect(wrapper.emitted('close')).toBeFalsy();
        });
    });

    describe('Component Structure', () => {
        it('has proper HTML structure', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            expect(wrapper.find('.backdrop').exists()).toBe(true);
            expect(wrapper.find('.cart').exists()).toBe(true);
            expect(wrapper.find('.cart__title').exists()).toBe(true);
            expect(wrapper.find('.item__list').exists()).toBe(true);
        });

        it('renders list items with proper structure', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const listItems = wrapper.findAll('.list__item');
            expect(listItems).toHaveLength(2);

            listItems.forEach(item => {
                expect(item.find('.card').exists()).toBe(true);
                expect(item.find('h3').exists()).toBe(true);
                expect(item.find('.item__button').exists()).toBe(true);
            });
        });

        it('maintains consistent structure across renders', () => {
            const wrapper1 = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });
            const wrapper2 = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            expect(wrapper1.html()).toBe(wrapper2.html());
        });
    });

    describe('Accessibility', () => {
        it('uses semantic HTML structure', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            expect(wrapper.find('h4').exists()).toBe(true);
            expect(wrapper.find('ul').exists()).toBe(true);
            expect(wrapper.find('li').exists()).toBe(true);
            expect(wrapper.find('button').exists()).toBe(true);
        });

        it('has proper heading hierarchy', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const title = wrapper.find('h4');
            expect(title.exists()).toBe(true);
            expect(title.text()).toBe('Cart');
        });

        it('has proper button elements for remove actions', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const buttons = wrapper.findAll('button');
            expect(buttons).toHaveLength(2);

            buttons.forEach(button => {
                expect(button.text()).toBe('Remove');
                expect(button.element.tagName).toBe('BUTTON');
            });
        });
    });

    describe('Component Behavior', () => {
        it('renders without errors', () => {
            expect(() => mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            })).not.toThrow();
        });

        it('handles empty cart gracefully', () => {
            const emptyStore = createStore({
                getters: {
                    'cart/cartItems': () => [],
                    'cart/cartTotal': () => 0,
                },
            });

            expect(() => mount(CartDrawer, {
                global: { plugins: [emptyStore] },
                props: { open: true },
            })).not.toThrow();
        });

        it('has scoped styles applied', () => {
            const wrapper = mount(CartDrawer, {
                global: { plugins: [store] },
                props: { open: true },
            });

            const backdrop = wrapper.find('.backdrop');
            const attributes = backdrop.attributes();
            const hasScopedStyle = Object.keys(attributes).some(key => key.startsWith('data-v-'));
            expect(hasScopedStyle).toBe(true);
        });
    });
});
