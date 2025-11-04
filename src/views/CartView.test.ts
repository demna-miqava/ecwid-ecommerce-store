import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import CartView from "./CartView.vue";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { mockProduct } from "@/__mocks__/testData";

describe("CartView", () => {
  let wrapper: VueWrapper;
  let router: ReturnType<typeof createRouter>;
  let store: ReturnType<typeof useCartStore>;

  beforeEach(async () => {
    setActivePinia(createPinia());
    store = useCartStore();

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/cart", component: CartView },
      ],
    });

    await router.push("/cart");
    await router.isReady();
  });

  describe("Empty Cart", () => {
    it("displays empty cart message when cart is empty", () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      expect(wrapper.text()).toContain("Your cart is empty");
    });

    it("displays link to view the store", () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      const link = wrapper.find('a[href="/"]');
      expect(link.exists()).toBe(true);
      expect(link.text()).toContain("View the store");
    });
  });

  describe("Cart with Items", () => {
    beforeEach(() => {
      store.addToCart(mockProduct);
    });

    it("displays ShippingSection component", () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      expect(wrapper.text()).not.toContain("Your cart is empty");
      expect(wrapper.text()).toContain("Order Summary");
    });
  });

  describe("Place Order Modal", () => {
    beforeEach(() => {
      store.addToCart(mockProduct);
    });

    it("does not show modal initially", () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      expect(wrapper.text()).not.toContain("Congratulations!");
    });

    it("displays modal when place order button is clicked", async () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      // Find the place order button by its text
      const placeOrderButton = wrapper
        .findAll("button")
        .find((btn) => btn.text().includes("Place order"));

      expect(placeOrderButton).toBeDefined();
      await placeOrderButton!.trigger("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toContain("Congratulations!");
      expect(wrapper.text()).toContain(
        "Thank you for your purchase! Your order has been placed successfully."
      );
    });

    it("modal contains Continue Shopping button", async () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      const placeOrderButton = wrapper
        .findAll("button")
        .find((btn) => btn.text().includes("Place order"));
      await placeOrderButton!.trigger("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toContain("Continue Shopping");
    });

    it("clears cart when order is placed", async () => {
      wrapper = mount(CartView, {
        global: { plugins: [router] },
      });

      expect(store.items.length).toBe(1);

      const placeOrderButton = wrapper
        .findAll("button")
        .find((btn) => btn.text().includes("Place order"));
      await placeOrderButton!.trigger("click");

      expect(store.items.length).toBe(0);
    });
  });
});
