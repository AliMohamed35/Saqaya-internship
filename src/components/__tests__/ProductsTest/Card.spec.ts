// describe, it define individual test cases
// expect verify test exceptions
// vi vitest version of jest.fn() used to mock
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Card from "../../Products/Card.vue";
import type { Product } from "../../../store/getProducts";
import { useCartStore } from "../../../store/cart";

// Mock product data
const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product description",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe("Card Component", () => {
  let wrapper: VueWrapper<any>;
  let addProductToCartMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setActivePinia(createPinia());
    addProductToCartMock = vi.fn();
    wrapper = mount(Card, {
      global: {
        stubs: {
          "router-link": {
            template: "<a><slot /></a>",
            props: ["to"],
          },
        },
      },
      props: { product: mockProduct },
    });
    // Patch the store after mounting so the instance used by the component is mocked
    const cartStore = useCartStore();
    cartStore.addProductToCart = addProductToCartMock;
  });

  it("renders product image, title, and price", () => {
    const image = wrapper.find("img");
    const title = wrapper.find(".card__container-title");
    const price = wrapper.find(".card__container-price");
    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toBe(mockProduct.image);
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(mockProduct.title);
    expect(price.exists()).toBe(true);
    expect(price.text()).toBe(`$ ${mockProduct.price}`);
  });

  it("calls addToCart when Add to Cart button is clicked", async () => {
    const button = wrapper.find(".btns__button");
    await button.trigger("click");
    expect(addProductToCartMock).toHaveBeenCalledTimes(1);
    expect(addProductToCartMock).toHaveBeenCalledWith(mockProduct);
  });
});
