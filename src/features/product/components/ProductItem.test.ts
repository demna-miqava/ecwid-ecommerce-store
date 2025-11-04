import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ProductItem from "./ProductItem.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { mockProduct } from "@/__mocks__/testData";

// Mock the composable
const mockAddProductToCart = vi.fn();
vi.mock("../composables/useAddProductToCart", () => ({
  useAddProductToCart: () => ({
    addProductToCart: mockAddProductToCart,
  }),
}));

describe("ProductItem", () => {
  let wrapper: VueWrapper;
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Create a mock router
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: "/product/:id",
          name: "product-details",
          component: { template: "<div>Product Details</div>" },
        },
      ],
    });
  });

  describe("Rendering", () => {
    it("renders product with basic information", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      expect(wrapper.text()).toContain(mockProduct.name);
      expect(wrapper.text()).toContain(mockProduct.price);
    });

    it("renders product image with correct src", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("src")).toBe(mockProduct.originalImageUrl);
      expect(img.attributes("alt")).toBe(mockProduct.name);
    });

    it("renders Buy Now button", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const button = wrapper.find("button");
      expect(button.text()).toBe("Buy Now");
    });
  });

  describe("Navigation", () => {
    it("Product item wrapped in a router-link with correct route", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const link = wrapper.find("a");
      expect(link.exists()).toBe(true);
      expect(link.attributes("href")).toBe("/product/1");
    });

    it("navigates to product details on click", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const link = wrapper.find("a");
      await link.trigger("click");

      // Wait for navigation
      await router.isReady();
      expect(router.currentRoute.value.name).toBe("product-details");
      expect(router.currentRoute.value.params.id).toBe("1");
    });
  });

  describe("User Interactions", () => {
    it("calls addProductToCart when Buy Now button is clicked", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const button = wrapper.find("button");
      await button.trigger("click");

      expect(mockAddProductToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("does not navigate to product details when Buy Now button is clicked", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const initialPath = router.currentRoute.value.path;
      const button = wrapper.find("button");
      await button.trigger("click");

      // Should not navigate
      expect(router.currentRoute.value.path).toBe(initialPath);
    });
  });

  describe("Accessibility", () => {
    it("has image alt text matching product name", async () => {
      wrapper = mount(ProductItem, {
        props: {
          product: mockProduct,
        },
        global: {
          plugins: [router],
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("alt")).toBe("Test Product");
    });
  });
});
