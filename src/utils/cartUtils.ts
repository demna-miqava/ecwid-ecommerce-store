import type { CartItem } from "@/types/cart";

// Helper to calculate item price including modifier
export function getCartItemPrice(item: CartItem): number {
  return item.basePrice + (item.selectedOption?.priceModifier ?? 0);
}
