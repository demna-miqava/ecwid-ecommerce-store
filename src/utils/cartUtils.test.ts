import { describe, it, expect } from "vitest";
import { getCartItemPrice } from "./cartUtils";
import { mockCartItem } from "@/__mocks__/testData";

describe("cartUtils", () => {
  describe("getCartItemPrice", () => {
    it("returns base price when no option is selected", () => {
      expect(getCartItemPrice(mockCartItem)).toBe(29.99);
    });

    it("adds price modifier to base price when option is selected", () => {
      const itemWithOption = {
        ...mockCartItem,
        id: "1-M",
        selectedOption: {
          name: "Size",
          value: "M",
          priceModifier: 5.0,
        },
      };

      expect(getCartItemPrice(itemWithOption)).toBe(
        itemWithOption.basePrice + (itemWithOption?.selectedOption?.priceModifier || 0)
      );
    });

    it("handles zero price modifier", () => {
      const itemWithZeroModifier = {
        ...mockCartItem,
        id: "1-S",
        selectedOption: {
          name: "Size",
          value: "S",
          priceModifier: 0,
        },
      };

      expect(getCartItemPrice(itemWithZeroModifier)).toBe(29.99);
    });
  });
});
