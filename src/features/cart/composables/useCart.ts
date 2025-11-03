import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

export function useCart() {
  const cartStore = useCartStore();
  const { items, totalItems, totalPrice } = storeToRefs(cartStore);

  const handleAddToCart = (product: Product) => {
    cartStore.addToCart(product);
  };

  const handleRemove = (productId: number) => {
    cartStore.removeFromCart(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    cartStore.updateQuantity(productId, newQuantity);
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
