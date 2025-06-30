import BurgerMenu from './BurgerMenu.vue';
import CartDrawer from './CartDrawer.vue';
import CartButton from './CartButton.vue';
import NavLinks from './NavLinks.vue';
export default (await import('vue')).defineComponent({
    data() {
        // to control opening and closing for Nav and Cart
        return {
            isNavOpen: false,
            isCartOpen: false,
        };
    },
    methods: {
        // to toggle the Nav bar on mobile screens
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        // to toggle Cart on mobile screens
        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        },
        // sets the isNavOpen to false auto after closing the menu.
        closeNav() {
            this.isNavOpen = false;
        }
    },
    components: {
        CartDrawer,
        BurgerMenu,
        CartButton,
        NavLinks
    },
    computed: {
        // this fetches the total number of items in cart
        cartTotal() {
            return this.$store.getters['cart/cartItems'].length;
        }
    }
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    CartDrawer,
    BurgerMenu,
    CartButton,
    NavLinks
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['nav__links']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.toggleNav) },
    ...{ class: "hamburger" },
});
const __VLS_0 = {}.BurgerMenu;
/** @type {[typeof __VLS_components.BurgerMenu, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "nav__logo" },
});
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    to: "/",
}));
const __VLS_6 = __VLS_5({
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
var __VLS_7;
if (__VLS_ctx.isNavOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.toggleNav) },
        ...{ class: "backdrop" },
    });
}
const __VLS_8 = {}.NavLinks;
/** @type {[typeof __VLS_components.NavLinks, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClose': {} },
    open: (__VLS_ctx.isNavOpen),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClose': {} },
    open: (__VLS_ctx.isNavOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClose: (__VLS_ctx.closeNav)
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
const __VLS_16 = {}.CartButton;
/** @type {[typeof __VLS_components.CartButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.toggleCart)
};
var __VLS_19;
if (__VLS_ctx.cartTotal >= 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "cart__badge" },
    });
    (__VLS_ctx.cartTotal);
}
const __VLS_24 = {}.teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.teleport, typeof __VLS_components.Teleport, typeof __VLS_components.teleport, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    to: "body",
}));
const __VLS_26 = __VLS_25({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.CartDrawer;
/** @type {[typeof __VLS_components.CartDrawer, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClose': {} },
    open: (__VLS_ctx.isCartOpen),
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClose': {} },
    open: (__VLS_ctx.isCartOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClose: (__VLS_ctx.toggleCart)
};
var __VLS_31;
var __VLS_27;
/** @type {__VLS_StyleScopedClasses['hamburger']} */ ;
/** @type {__VLS_StyleScopedClasses['nav__logo']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__badge']} */ ;
var __VLS_dollars;
let __VLS_self;
