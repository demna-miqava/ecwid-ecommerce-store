import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAddProductToCart } from "./useAddProductToCart";
import type { Product } from "@/types/product";
import { setActivePinia, createPinia } from "pinia";
import { mockProduct } from "@/__mocks__/testData";

// Mock useCart
const mockHandleAddToCart = vi.fn();
vi.mock("@/features/cart/composables/useCart", () => ({
  useCart: () => ({
    handleAddToCart: mockHandleAddToCart,
  }),
}));

describe("useAddProductToCart tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("Add product to cart", () => {
    it("adds product without options", () => {
      const { addProductToCart } = useAddProductToCart();

      addProductToCart(mockProduct);

      expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it("adds product with size option using default index", () => {
      const productWithSizes: Product = {
        ...mockProduct,
        options: [
          {
            name: "Size",
            type: "SIZE",
            defaultChoice: 0,
            choices: [
              { text: "S", priceModifier: 0 },
              { text: "M", priceModifier: 5.0 },
            ],
          },
        ],
      };

      const { addProductToCart } = useAddProductToCart();
      addProductToCart(productWithSizes);

      expect(mockHandleAddToCart).toHaveBeenCalledWith(
        productWithSizes,
        "Size",
        "S",
        0
      );
    });

    it("adds product with specified size index", () => {
      const productWithSizes: Product = {
        ...mockProduct,
        options: [
          {
            name: "Size",
            type: "SIZE",
            defaultChoice: 0,
            choices: [
              { text: "S", priceModifier: 0 },
              { text: "M", priceModifier: 5.0 },
              { text: "L", priceModifier: 10.0 },
            ],
          },
        ],
      };

      const { addProductToCart } = useAddProductToCart();
      addProductToCart(productWithSizes, 2); // Select "L"

      expect(mockHandleAddToCart).toHaveBeenCalledWith(
        productWithSizes,
        "Size",
        "L",
        10.0
      );
    });

    it("finds size option by type=SIZE", () => {
      const productWithSizes: Product = {
        ...mockProduct,
        options: [
          {
            name: "Size",
            type: "SIZE",
            defaultChoice: 0,
            choices: [{ text: "M", priceModifier: 5.0 }],
          },
        ],
      };

      const { addProductToCart } = useAddProductToCart();
      addProductToCart(productWithSizes);

      expect(mockHandleAddToCart).toHaveBeenCalledWith(
        productWithSizes,
        "Size",
        "M",
        5.0
      );
    });

    it("adds product without options when size option has no choices", () => {
      const productWithEmptyOptions: Product = {
        ...mockProduct,
        options: [
          {
            name: "Size",
            type: "SIZE",
            defaultChoice: 0,
            choices: [],
          },
        ],
      };

      const { addProductToCart } = useAddProductToCart();
      addProductToCart(productWithEmptyOptions);

      expect(mockHandleAddToCart).toHaveBeenCalledWith(productWithEmptyOptions);
    });
  });

  describe("Integration", () => {
    it("can be called with same product but different sizes", () => {
      const productWithSizes: Product = {
        ...mockProduct,
        options: [
          {
            name: "Size",
            type: "SIZE",
            defaultChoice: 0,
            choices: [
              { text: "S", priceModifier: 0 },
              { text: "M", priceModifier: 5.0 },
              { text: "L", priceModifier: 10.0 },
            ],
          },
        ],
      };

      const { addProductToCart } = useAddProductToCart();

      addProductToCart(productWithSizes, 0);
      addProductToCart(productWithSizes, 1);
      addProductToCart(productWithSizes, 2);

      expect(mockHandleAddToCart).toHaveBeenCalledTimes(3);
      expect(mockHandleAddToCart).toHaveBeenNthCalledWith(
        1,
        productWithSizes,
        "Size",
        "S",
        0
      );
      expect(mockHandleAddToCart).toHaveBeenNthCalledWith(
        2,
        productWithSizes,
        "Size",
        "M",
        5.0
      );
      expect(mockHandleAddToCart).toHaveBeenNthCalledWith(
        3,
        productWithSizes,
        "Size",
        "L",
        10.0
      );
    });
  });
});
