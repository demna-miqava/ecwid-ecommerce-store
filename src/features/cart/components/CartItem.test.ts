import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import CartItem from "./CartItem.vue";
import type { CartItem as CartItemType } from "@/types/cart";
import { createPinia, setActivePinia } from "pinia";

// Mock handlers
const mockHandleQuantityChange = vi.fn();
const mockHandleRemove = vi.fn();

// Mock the useCart composable
vi.mock("../composables/useCart", () => ({
  useCart: () => ({
    handleQuantityChange: mockHandleQuantityChange,
    handleRemove: mockHandleRemove,
  }),
}));

// Mock the cart utils
vi.mock("@/utils/cartUtils", () => ({
  getCartItemPrice: (item: CartItemType) =>
    item.basePrice + (item.selectedOption?.priceModifier ?? 0),
}));

describe("CartItem", () => {
  let wrapper: VueWrapper;
  let mockCartItem: CartItemType;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    mockCartItem = {
      id: "test-1",
      productId: 1,
      imageUrl: "https://example.com/image.jpg",
      title: "Test Product",
      basePrice: 29.99,
      quantity: 2,
    };
  });

  describe("Rendering", () => {
    it("renders cart item with basic information", () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      expect(wrapper.text()).toContain(mockCartItem.title);
      expect(wrapper.text()).toContain(mockCartItem.basePrice);
      expect(wrapper.text()).toContain(mockCartItem.quantity);
    });

    it("renders product image with correct src and alt", () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("src")).toBe(mockCartItem.imageUrl);
      expect(img.attributes("alt")).toBe(mockCartItem.title);
    });

    it("renders selected option when present", () => {
      const itemWithOption: CartItemType = {
        ...mockCartItem,
        selectedOption: {
          name: "Size",
          value: "M",
          priceModifier: 5.0,
        },
      };

      wrapper = mount(CartItem, {
        props: {
          item: itemWithOption,
        },
      });

      expect(wrapper.text()).toContain("Size: M");
    });

    it("calculates and displays correct price with modifier", () => {
      const itemWithOption: CartItemType = {
        ...mockCartItem,
        basePrice: 20.0,
        selectedOption: {
          name: "Size",
          value: "L",
          priceModifier: 10.0,
        },
      };

      wrapper = mount(CartItem, {
        props: {
          item: itemWithOption,
        },
      });

      // Base price 20 + modifier 10 = 30
      expect(wrapper.text()).toContain("$30.00");
    });
  });

  describe("User Interactions", () => {
    it("calls handleRemove when delete button is clicked", async () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      const deleteButton = wrapper.find('[aria-label="Remove item from cart"]');
      await deleteButton.trigger("click");

      expect(mockHandleRemove).toHaveBeenCalledWith(mockCartItem.id);
    });

    it("calls handleQuantityChange with incremented quantity when plus button is clicked", async () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      const plusButton = wrapper.find('[aria-label="Increase quantity"]');
      await plusButton.trigger("click");

      expect(mockHandleQuantityChange).toHaveBeenCalledWith(
        mockCartItem.id,
        mockCartItem.quantity + 1
      );
    });

    it("calls handleQuantityChange with decremented quantity when minus button is clicked", async () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      const minusButton = wrapper.find('[aria-label="Decrease quantity"]');
      await minusButton.trigger("click");

      expect(mockHandleQuantityChange).toHaveBeenCalledWith(
        mockCartItem.id,
        mockCartItem.quantity - 1
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels on interactive elements", () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      expect(
        wrapper.find('[aria-label="Remove item from cart"]').exists()
      ).toBe(true);
      expect(wrapper.find('[aria-label="Decrease quantity"]').exists()).toBe(
        true
      );
      expect(wrapper.find('[aria-label="Increase quantity"]').exists()).toBe(
        true
      );
    });

    it("has accessible image alt text", () => {
      wrapper = mount(CartItem, {
        props: {
          item: mockCartItem,
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("alt")).toBe(mockCartItem.title);
    });
  });
});
