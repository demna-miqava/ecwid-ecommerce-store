import { useCart } from "@/features/cart/composables/useCart";
import type { Product } from "@/types/product";

export function useAddProductToCart() {
  const { handleAddToCart } = useCart();

  const addProductToCart = (
    product: Product,
    selectedSizeIndex?: number
  ) => {
    // Find size option if it exists
    const sizeOption = product.options?.find(
      (opt) => opt.type === "SIZE" || opt.name.toLowerCase().includes("size")
    );

    // If product has size options
    if (sizeOption && sizeOption.choices.length > 0) {
      // Use provided index or default to first choice
      const choiceIndex = selectedSizeIndex ?? 0;
      const selectedChoice = sizeOption.choices[choiceIndex];

      if (selectedChoice) {
        handleAddToCart(
          product,
          sizeOption.name,
          selectedChoice.text,
          selectedChoice.priceModifier
        );
        return;
      }
    }

    // No options or couldn't get selection - add product without options
    handleAddToCart(product);
  };

  return {
    addProductToCart,
  };
}
