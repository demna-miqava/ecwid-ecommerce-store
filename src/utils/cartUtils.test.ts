import { describe, it, expect } from "vitest";
import { getCartItemPrice } from "./cartUtils";
import type { CartItem } from "@/types/cart";

describe("cartUtils", () => {
  describe("getCartItemPrice", () => {
    it("returns base price when no option is selected", () => {
      const item: CartItem = {
        id: "1",
        productId: 1,
        imageUrl: "https://example.com/image.jpg",
        title: "Test Product",
        basePrice: 29.99,
        quantity: 1,
      };

      expect(getCartItemPrice(item)).toBe(29.99);
    });

    it("adds price modifier to base price when option is selected", () => {
      const item: CartItem = {
        id: "1-M",
        productId: 1,
        imageUrl: "https://example.com/image.jpg",
        title: "Test Product",
        basePrice: 29.99,
        selectedOption: {
          name: "Size",
          value: "M",
          priceModifier: 5.0,
        },
        quantity: 1,
      };

      expect(getCartItemPrice(item)).toBe(
        item.basePrice + (item?.selectedOption?.priceModifier || 0)
      );
    });

    it("handles zero price modifier", () => {
      const item: CartItem = {
        id: "1-S",
        productId: 1,
        imageUrl: "https://example.com/image.jpg",
        title: "Test Product",
        basePrice: 29.99,
        selectedOption: {
          name: "Size",
          value: "S",
          priceModifier: 0,
        },
        quantity: 1,
      };

      expect(getCartItemPrice(item)).toBe(29.99);
    });
  });
});
