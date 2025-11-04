import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

export function useCart() {
  const cartStore = useCartStore();
  const { items, totalItems, totalPrice } = storeToRefs(cartStore);

  const handleAddToCart = (
    product: Product,
    selectedOptionName?: string,
    selectedOptionValue?: string,
    priceModifier?: number
  ) => {
    cartStore.addToCart(
      product,
      selectedOptionName,
      selectedOptionValue,
      priceModifier
    );
  };

  const handleRemove = (itemId: string) => {
    cartStore.removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    cartStore.updateQuantity(itemId, newQuantity);
  };

  const handleClearCart = () => {
    cartStore.clearCart();
  };

  return {
    items,
    totalItems,
    totalPrice,
    handleAddToCart,
    handleRemove,
    handleQuantityChange,
    handleClearCart,
  };
}
