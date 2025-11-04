<script setup lang="ts">
import type { CartItem } from "@/types/cart";
import { useCart } from "../composables/useCart";
import IconButton from "@/components/common/IconButton.vue";

interface Props {
  item: CartItem;
}

defineProps<Props>();
const { handleQuantityChange, handleRemove } = useCart();
</script>

<template>
  <div
    class="bg-gray-50 rounded-2xl p-4 sm:p-6 flex items-center gap-4 sm:gap-6 hover:bg-gray-100 transition-colors"
  >
    <div class="shrink-0">
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden border border-gray-200"
      >
        <img
          v-if="item.product.originalImageUrl"
          :src="item.product.originalImageUrl"
          :alt="item.product.name"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="grow min-w-0">
      <h3
        class="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2 line-clamp-2"
      >
        {{ item.product.name }}
      </h3>
      <p class="font-bold text-base sm:text-lg text-gray-900">
        ${{ item.product.price.toFixed(2) }}
      </p>
    </div>

    <!-- Actions: Delete + Quantity (column on small, row on large) -->
    <div
      class="ml-auto flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-4 shrink-0"
    >
      <IconButton
        @click="handleRemove(item.product.id)"
        size="sm"
        ariaLabel="Remove item from cart"
        class="text-gray-400 hover:text-gray-600 hover:bg-gray-200"
      >
        <i class="pi pi-trash text-[20px]"></i>
      </IconButton>

      <div
        class="flex items-center bg-gray-800 rounded-full h-8 sm:h-10 px-1 sm:px-2"
      >
        <IconButton
          @click="handleQuantityChange(item.product.id, item.quantity - 1)"
          size="sm"
          ariaLabel="Decrease quantity"
          class="text-white hover:bg-gray-700"
        >
          <i class="pi pi-minus text-[10px] sm:text-[12px]"></i>
        </IconButton>
        <span
          class="w-8 sm:w-12 text-center font-semibold text-white text-base sm:text-lg"
          >{{ item.quantity }}
        </span>
        <IconButton
          @click="handleQuantityChange(item.product.id, item.quantity + 1)"
          size="sm"
          ariaLabel="Increase quantity"
          class="text-white hover:bg-gray-700"
        >
          <i class="pi pi-plus text-[10px] sm:text-[12px]"></i>
        </IconButton>
      </div>
    </div>
  </div>
</template>
