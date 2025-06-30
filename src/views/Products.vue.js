import { defineComponent } from 'vue';
import ProductsList from '../components/Products/ProductsList.vue';
export default defineComponent({
    components: {
        ProductsList
    },
    data() {
        return {
            searchQuery: ''
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    ProductsList
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section__title']} */ ;
/** @type {__VLS_StyleScopedClasses['section__search']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section__search" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "text",
    placeholder: "Search...",
    value: (__VLS_ctx.searchQuery),
});
const __VLS_0 = {}.ProductsList;
/** @type {[typeof __VLS_components.ProductsList, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    search: (__VLS_ctx.searchQuery),
}));
const __VLS_2 = __VLS_1({
    search: (__VLS_ctx.searchQuery),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['section__title']} */ ;
/** @type {__VLS_StyleScopedClasses['section__search']} */ ;
var __VLS_dollars;
let __VLS_self;
