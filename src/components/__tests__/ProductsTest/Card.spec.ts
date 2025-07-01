// describe, it define individual test cases
// expect verify test exceptions
// vi vitest version of jest.fn() used to mock
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils"; // mount mounts the comp. in simulated DOM, wrapper is the type of wrapper returned by mount
import Card from "../../Products/Card.vue";
import type { Product } from "../../../store/getProducts";

// Mock Vuex store
const mockDispatch = vi.fn();
// is an object pretending to be your Vuex store, but it only has the method you're testing: dispatch.
const $store = {
  // we dont rely on the real vuex store so we mock it
  dispatch: mockDispatch,
};

// Mock product prop >> this is what is expected to pass as prop to card
const product: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe("Tests Card component", () => {
  // describe >> group or related tests
  it("renders product details", () => {
    const wrapper = mount(Card, {
      global: {
        mocks: { $store },
        stubs: ["router-link"],
      },
      props: { product },
    });
    console.log("hi", wrapper.html);

    expect(wrapper.text()).toContain(product.title); // expects the wrapper to contain the title
    expect(wrapper.text()).toContain(product.category); // expects the wrapper to contain the category
    expect(wrapper.text()).toContain(product.price.toString());
    expect(wrapper.text()).toContain(product.rating.rate.toString());
  });

  it("calls addToCart when button is clicked", async () => {
    const wrapper = mount(Card, {
      global: {
        mocks: { $store },
        stubs: ["router-link"],
      },
      props: { product },
    });

    await wrapper.find("button").trigger("click");
    expect(mockDispatch).toHaveBeenCalledWith("cart/addProductToCart", product);
  });
});
