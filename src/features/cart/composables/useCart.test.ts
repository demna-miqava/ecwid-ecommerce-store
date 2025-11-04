import { describe, it, expect, beforeEach } from "vitest";
import { useCart } from "./useCart";
import { setActivePinia, createPinia } from "pinia";
import { mockProduct } from "@/__mocks__/testData";

describe("useCart", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Initial State", () => {
    it("returns empty items array", () => {
      const { items } = useCart();

      expect(items.value).toEqual([]);
    });

    it("returns zero total items", () => {
      const { totalItems } = useCart();

      expect(totalItems.value).toBe(0);
    });

    it("returns zero total price", () => {
      const { totalPrice } = useCart();

      expect(totalPrice.value).toBe(0);
    });
  });

  describe("Add to cart actions", () => {
    it("adds product to cart", () => {
      const { handleAddToCart, items } = useCart();

      handleAddToCart(mockProduct);

      expect(items.value).toHaveLength(1);
      expect(items.value[0]!.title).toBe("Test Product");
      expect(items.value[0]!.basePrice).toBe(29.99);
    });

    it("adds product with options", () => {
      const { handleAddToCart, items } = useCart();

      handleAddToCart(mockProduct, "Size", "M", 5.0);

      expect(items.value).toHaveLength(1);
      expect(items.value[0]!.selectedOption).toEqual({
        name: "Size",
        value: "M",
        priceModifier: 5.0,
      });
    });

    it("increments quantity for existing item", () => {
      const { handleAddToCart, items } = useCart();

      handleAddToCart(mockProduct);
      handleAddToCart(mockProduct);

      expect(items.value).toHaveLength(1);
      expect(items.value[0]!.quantity).toBe(2);
    });

    it("creates separate items for different options", () => {
      const { handleAddToCart, items } = useCart();

      handleAddToCart(mockProduct, "Size", "S", 0);
      handleAddToCart(mockProduct, "Size", "M", 5.0);

      expect(items.value).toHaveLength(2);
    });

    it("updates totalItems correctly", () => {
      const { handleAddToCart, totalItems } = useCart();

      handleAddToCart(mockProduct);
      expect(totalItems.value).toBe(1);

      handleAddToCart(mockProduct);
      expect(totalItems.value).toBe(2);
    });

    it("updates totalPrice correctly", () => {
      const { handleAddToCart, totalPrice } = useCart();

      handleAddToCart(mockProduct);
      expect(totalPrice.value).toBe(29.99);
    });

    it("handles undefined optional parameters", () => {
      const { handleAddToCart, items } = useCart();

      handleAddToCart(mockProduct, undefined, undefined, undefined);

      expect(items.value).toHaveLength(1);
      expect(items.value[0]!.selectedOption).toBeUndefined();
    });
  });

  describe("Remove from cart actions", () => {
    it("removes item from cart", () => {
      const { handleAddToCart, handleRemoveItemFromCart, items } = useCart();

      handleAddToCart(mockProduct);
      const itemId = items.value[0]!.id;

      handleRemoveItemFromCart(itemId);

      expect(items.value).toHaveLength(0);
    });

    it("does not affect other items", () => {
      const { handleAddToCart, handleRemoveItemFromCart, items } = useCart();

      handleAddToCart(mockProduct, "Size", "S", 0);
      handleAddToCart(mockProduct, "Size", "M", 5.0);

      const firstItemId = items.value[0]!.id;

      handleRemoveItemFromCart(firstItemId);

      expect(items.value).toHaveLength(1);
      expect(items.value[0]!.selectedOption?.value).toBe("M");
    });

    it("updates totalItems after removal", () => {
      const { handleAddToCart, handleRemoveItemFromCart, items, totalItems } =
        useCart();

      handleAddToCart(mockProduct);
      handleAddToCart(mockProduct);

      expect(totalItems.value).toBe(2);

      handleRemoveItemFromCart(items.value[0]!.id);

      expect(totalItems.value).toBe(0);
    });

    it("updates totalPrice after removal", () => {
      const { handleAddToCart, handleRemoveItemFromCart, items, totalPrice } =
        useCart();

      handleAddToCart(mockProduct);
      const initialPrice = totalPrice.value;

      handleRemoveItemFromCart(items.value[0]!.id);

      expect(totalPrice.value).toBe(0);
      expect(totalPrice.value).not.toBe(initialPrice);
    });
  });

  describe("Quantity Change actions", () => {
    it("updates item quantity", () => {
      const { handleAddToCart, handleQuantityChange, items } = useCart();

      handleAddToCart(mockProduct);
      const itemId = items.value[0]!.id;

      handleQuantityChange(itemId, 5);

      expect(items.value[0]!.quantity).toBe(5);
    });

    it("removes item when quantity is 0", () => {
      const { handleAddToCart, handleQuantityChange, items } = useCart();

      handleAddToCart(mockProduct);
      const itemId = items.value[0]!.id;

      handleQuantityChange(itemId, 0);

      expect(items.value).toHaveLength(0);
    });

    it("updates totalItems correctly", () => {
      const { handleAddToCart, handleQuantityChange, items, totalItems } =
        useCart();

      handleAddToCart(mockProduct);
      const itemId = items.value[0]!.id;

      handleQuantityChange(itemId, 10);

      expect(totalItems.value).toBe(10);
    });

    it("updates totalPrice correctly", () => {
      const { handleAddToCart, handleQuantityChange, items, totalPrice } =
        useCart();

      handleAddToCart(mockProduct); // 29.99 * 1
      const itemId = items.value[0]!.id;

      handleQuantityChange(itemId, 3); // 29.99 * 3

      expect(totalPrice.value).toBeCloseTo(89.97, 2);
    });
  });

  describe("Clear cart action", () => {
    it("removes all items from cart", () => {
      const { handleAddToCart, handleClearCart, items } = useCart();

      handleAddToCart(mockProduct);
      handleAddToCart(mockProduct, "Size", "M", 5.0);
      handleAddToCart({ ...mockProduct, id: 2, name: "Product 2" });

      expect(items.value).toHaveLength(3);

      handleClearCart();

      expect(items.value).toHaveLength(0);
    });

    it("resets totalItems to 0", () => {
      const { handleAddToCart, handleClearCart, totalItems } = useCart();

      handleAddToCart(mockProduct);
      handleAddToCart(mockProduct);

      handleClearCart();

      expect(totalItems.value).toBe(0);
    });

    it("resets totalPrice to 0", () => {
      const { handleAddToCart, handleClearCart, totalPrice } = useCart();

      handleAddToCart(mockProduct);

      handleClearCart();

      expect(totalPrice.value).toBe(0);
    });

    it("does nothing when cart is already empty", () => {
      const { handleClearCart, items } = useCart();

      handleClearCart();

      expect(items.value).toEqual([]);
    });
  });

  describe("Integration Scenarios", () => {
    it("handles complete shopping flow", () => {
      const {
        handleAddToCart,
        handleQuantityChange,
        handleRemoveItemFromCart,
        items,
        totalItems,
        totalPrice,
      } = useCart();

      // Add items
      handleAddToCart(mockProduct);
      handleAddToCart(mockProduct, "Size", "M", 5.0);

      expect(items.value).toHaveLength(2);
      expect(totalItems.value).toBe(2);

      // Update quantity
      handleQuantityChange(items.value[0]!.id, 3);

      expect(totalItems.value).toBe(4); // 3 + 1

      // Remove one item
      handleRemoveItemFromCart(items.value[1]!.id);

      expect(items.value).toHaveLength(1);
      expect(totalItems.value).toBe(3);
    });
  });
});
