// describe, it define individual test cases
// expect verify test exceptions
// vi vitest version of jest.fn() used to mock
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils"; // mount mounts the comp. in simulated DOM, wrapper is the type of wrapper returned by mount
import Card from "../../Products/Card.vue";
import type { Product } from "../../../store/getProducts";

// Mock Vuex store
const mockDispatch = vi.fn();
// is an object pretending to be your Vuex store, but it only has the method you're testing: dispatch.
const mockStore = {
  // we dont rely on the real vuex store so we mock it
  dispatch: mockDispatch,
};

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

// Mock Vuex composable
vi.mock('vuex', () => ({
  useStore: () => mockStore,
}));

describe("Card Component", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mount component with default props
    wrapper = mount(Card, {
      global: {
        mocks: { $store: mockStore },
        stubs: {
          "router-link": {
            template: "<a><slot /></a>",
            props: ["to"],
          },
        },
      },
      props: { product: mockProduct },
    });
  });

  describe("Rendering", () => {
    it("renders product image with correct src and alt attributes", () => {
      const image = wrapper.find("img");

      expect(image.exists()).toBe(true);
      expect(image.attributes("src")).toBe(mockProduct.image);
      expect(image.attributes("alt")).toBe(mockProduct.description);
    });

    it("renders product title", () => {
      const title = wrapper.find(".card__container-title");

      expect(title.exists()).toBe(true);
      expect(title.text()).toBe(mockProduct.title);
    });

    it("renders product price with dollar sign", () => {
      const price = wrapper.find(".card__container-price");

      expect(price.exists()).toBe(true);
      expect(price.text()).toBe(`$ ${mockProduct.price}`);
    });

    it("renders product rating", () => {
      const rating = wrapper.find(".card__container-rating--rate");

      expect(rating.exists()).toBe(true);
      expect(rating.text()).toContain(mockProduct.rating.rate.toString());
    });

    it("renders product category", () => {
      const category = wrapper.find(".card__container-rating p:last-child");

      expect(category.exists()).toBe(true);
      expect(category.text()).toBe(mockProduct.category);
    });

    it("renders Add to Cart button", () => {
      const button = wrapper.find(".btns__button");

      expect(button.exists()).toBe(true);
      expect(button.text()).toBe("Add to cart");
    });

    it("renders Details link with correct route", () => {
      const link = wrapper.find("a");

      expect(link.exists()).toBe(true);
      expect(link.text()).toBe("Details");
    });
  });

  describe("User Interactions", () => {
    it("calls addToCart when Add to Cart button is clicked", async () => {
      const button = wrapper.find(".btns__button");

      await button.trigger("click");

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith("cart/addProductToCart", mockProduct);
    });

    it("does not call addToCart when other elements are clicked", async () => {
      const title = wrapper.find(".card__container-title");

      await title.trigger("click");

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe("Props Validation", () => {
    it("renders correctly with different product data", () => {
      const differentProduct: Product = {
        id: 2,
        title: "Different Product",
        price: 149.99,
        description: "Another test product",
        category: "clothing",
        image: "https://example.com/different-image.jpg",
        rating: {
          rate: 3.8,
          count: 50,
        },
      };

      const newWrapper = mount(Card, {
        global: {
          mocks: { $store: mockStore },
          stubs: {
            "router-link": {
              template: "<a><slot /></a>",
              props: ["to"],
            },
          },
        },
        props: { product: differentProduct },
      });

      expect(newWrapper.find(".card__container-title").text()).toBe(differentProduct.title);
      expect(newWrapper.find(".card__container-price").text()).toBe(`$ ${differentProduct.price}`);
      expect(newWrapper.find(".card__container-rating--rate").text()).toContain(differentProduct.rating.rate.toString());
      expect(newWrapper.find(".card__container-rating p:last-child").text()).toBe(differentProduct.category);
    });

    it("handles product with decimal price correctly", () => {
      const productWithDecimal: Product = {
        ...mockProduct,
        price: 19.99,
      };

      const newWrapper = mount(Card, {
        global: {
          mocks: { $store: mockStore },
          stubs: {
            "router-link": {
              template: "<a><slot /></a>",
              props: ["to"],
            },
          },
        },
        props: { product: productWithDecimal },
      });

      expect(newWrapper.find(".card__container-price").text()).toBe("$ 19.99");
    });

    it("handles product with zero rating correctly", () => {
      const productWithZeroRating: Product = {
        ...mockProduct,
        rating: {
          rate: 0,
          count: 0,
        },
      };

      const newWrapper = mount(Card, {
        global: {
          mocks: { $store: mockStore },
          stubs: {
            "router-link": {
              template: "<a><slot /></a>",
              props: ["to"],
            },
          },
        },
        props: { product: productWithZeroRating },
      });

      expect(newWrapper.find(".card__container-rating--rate").text()).toContain("0");
    });
  });

  describe("Component Structure", () => {
    it("has correct CSS classes", () => {
      expect(wrapper.find(".card__container").exists()).toBe(true);
      expect(wrapper.find(".card__container-title").exists()).toBe(true);
      expect(wrapper.find(".card__container-price").exists()).toBe(true);
      expect(wrapper.find(".card__container-rating").exists()).toBe(true);
      expect(wrapper.find(".btns").exists()).toBe(true);
      expect(wrapper.find(".btns__button").exists()).toBe(true);
    });

    it("renders star icon in rating", () => {
      const rating = wrapper.find(".card__container-rating--rate");
      const starIcon = rating.find("i.fa-solid.fa-star");

      expect(starIcon.exists()).toBe(true);
    });
  });
});
