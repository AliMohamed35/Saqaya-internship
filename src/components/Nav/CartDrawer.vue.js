import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // gets the cart items stored in cart
        cartItems() {
            return this.$store.getters['cart/cartItems'];
        },
        cartTotal() {
            return this.$store.getters['cart/cartTotal'];
        }
    },
    methods: {
        removeFromCart(productId) {
            this.$store.dispatch('cart/removeProductFromCart', productId);
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['cart']} */ ;
/** @type {__VLS_StyleScopedClasses['cart']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
        } },
    ...{ class: (['backdrop', { 'backdrop--visible': __VLS_ctx.open }]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (['cart', { showCart: __VLS_ctx.open }]) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "cart__title" },
});
if (__VLS_ctx.cartItems.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "item__list" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.cartItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "list__item" },
        key: (item.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (item.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (item.price);
    (item.quantity);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removeFromCart(item.id);
            } },
        ...{ class: "item__button" },
    });
}
/** @type {__VLS_StyleScopedClasses['backdrop']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop--visible']} */ ;
/** @type {__VLS_StyleScopedClasses['showCart']} */ ;
/** @type {__VLS_StyleScopedClasses['cart']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__title']} */ ;
/** @type {__VLS_StyleScopedClasses['item__list']} */ ;
/** @type {__VLS_StyleScopedClasses['list__item']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['item__button']} */ ;
var __VLS_dollars;
let __VLS_self;
