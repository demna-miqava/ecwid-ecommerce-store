import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  });

  function addToCart(product: Product) {
    const existingItem = items.value.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        product,
        quantity: 1,
      });
    }
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(
      (item) => item.product.id === productId
    );
    if (index > -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((item) => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
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
