import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";
import { getCartItemPrice } from "@/utils/cartUtils";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const itemPrice = getCartItemPrice(item);
      return sum + itemPrice * item.quantity;
    }, 0);
  });

  function addToCart(
    product: Product,
    selectedOptionName?: string,
    selectedOptionValue?: string,
    priceModifier?: number
  ) {
    const itemId = selectedOptionValue
      ? `${product.id}-${selectedOptionValue}`
      : `${product.id}`;

    const existingItem = items.value.find((item) => item.id === itemId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        imageUrl: product.imageUrl || product.hdThumbnailUrl,
        title: product.name,
        basePrice: product.price,
        selectedOption:
          selectedOptionName && selectedOptionValue
            ? {
                name: selectedOptionName,
                value: selectedOptionValue,
                priceModifier: priceModifier ?? 0,
              }
            : undefined,
        quantity: 1,
      };

      items.value.push(newItem);
    }
  }

  function removeFromCart(itemId: string) {
    const index = items.value.findIndex((item) => item.id === itemId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = items.value.find((item) => item.id === itemId);
    if (!item) return;

    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      item.quantity = quantity;
    }
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
