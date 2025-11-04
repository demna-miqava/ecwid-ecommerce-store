import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ShippingSection from "./ShippingSection.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

describe("ShippingSection", () => {
  let wrapper: VueWrapper;
  let store: ReturnType<typeof useCartStore>;
  let mockProduct: Product;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCartStore();

    mockProduct = {
      id: 1,
      name: "Test Product",
      price: 29.99,
      imageUrl: "",
      hdThumbnailUrl: "",
      originalImageUrl: "",
      description: "",
    };
  });

  describe("Rendering", () => {
    it("renders order summary heading", () => {
      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("Order Summary");
    });

    it("displays subtotal label and value", () => {
      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("Subtotal");
      expect(wrapper.text()).toContain("$0.00");
    });

    it("displays shipping label and value", () => {
      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("Shipping");
      expect(wrapper.text()).toContain("$0.00");
    });

    it("displays total label and value", () => {
      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("Total");
    });

    it("renders Place order button", () => {
      wrapper = mount(ShippingSection);

      const button = wrapper.find("button");
      expect(button.text()).toBe("Place order");
    });
  });

  describe("Price Calculations", () => {
    it("displays correct subtotal from cart", () => {
      store.addToCart(mockProduct);

      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain(`$${mockProduct.price.toFixed(2)}`);
    });

    it("displays shipping as free ($0.00)", () => {
      wrapper = mount(ShippingSection);

      const shippingText = wrapper.text();
      expect(shippingText).toMatch(/Shipping.*\$0\.00/s);
    });

    it("calculates total as subtotal + shipping", () => {
      const productWithDifferentPrice = { ...mockProduct, price: 50.0 };
      store.addToCart(productWithDifferentPrice);

      wrapper = mount(ShippingSection);

      // Total should be 50.00 + 0.00 = 50.00
      expect(wrapper.text()).toContain("$50.00");
    });

    it("formats prices with two decimal places", () => {
      const productWithDecimalPrice = { ...mockProduct, price: 19.5 };
      store.addToCart(productWithDecimalPrice);

      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("$19.50");
    });

    it("updates when cart total changes", async () => {
      wrapper = mount(ShippingSection);

      expect(wrapper.text()).toContain("$0.00");

      const expensiveProduct = { ...mockProduct, price: 100.0 };
      store.addToCart(expensiveProduct);

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toContain("$100.00");
    });
  });

  describe("User Interactions", () => {
    it("emits placeOrder event when button is clicked", async () => {
      wrapper = mount(ShippingSection);

      const button = wrapper.find("button");
      await button.trigger("click");

      expect(wrapper.emitted("placeOrder")).toBeTruthy();
      expect(wrapper.emitted("placeOrder")).toHaveLength(1);
    });

    it("can emit placeOrder multiple times", async () => {
      wrapper = mount(ShippingSection);

      const button = wrapper.find("button");
      await button.trigger("click");
      await button.trigger("click");
      await button.trigger("click");

      expect(wrapper.emitted("placeOrder")).toHaveLength(3);
    });
  });

  describe("Responsive Behavior", () => {
    it("maintains layout on small screens", () => {
      wrapper = mount(ShippingSection);

      const container = wrapper.find(".lg\\:col-span-1");
      expect(container.exists()).toBe(true);
    });
  });
});
