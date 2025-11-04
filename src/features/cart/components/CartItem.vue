<script setup lang="ts">
import type { CartItem } from "@/types/cart";
import { getCartItemPrice } from "@/utils/cartUtils";
import { useCart } from "../composables/useCart";
import IconButton from "@/components/common/IconButton.vue";
import { computed } from "vue";

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();
const { handleQuantityChange, handleRemove } = useCart();

const itemPrice = computed(() => getCartItemPrice(props.item));
</script>

<template>
  <div
    class="bg-bg-primary rounded-2xl p-4 sm:p-6 flex items-center gap-4 sm:gap-6 hover:opacity-90 transition-all border border-black/10"
  >
    <div class="shrink-0">
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden border border-gray-200"
      >
        <img
          v-if="item.imageUrl"
          :src="item.imageUrl"
          :alt="item.title"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="grow min-w-0">
      <h3
        class="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 text-primary"
      >
        {{ item.title }}
      </h3>
      <p
        v-if="item.selectedOption"
        class="text-xs sm:text-sm mb-1 text-secondary"
      >
        {{ item.selectedOption.name }}: {{ item.selectedOption.value }}
      </p>
      <p class="font-bold text-base sm:text-lg text-primary">
        ${{ itemPrice.toFixed(2) }}
      </p>
    </div>

    <!-- Actions: Delete + Quantity -->
    <div
      class="ml-auto flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-4 shrink-0"
    >
      <IconButton
        @click="handleRemove(item.id)"
        size="sm"
        ariaLabel="Remove item from cart"
        class="text-destructive hover:opacity-70"
      >
        <i class="pi pi-trash text-[1.2rem]"></i>
      </IconButton>

      <div
        class="flex items-center bg-primary rounded-full h-8 sm:h-10 px-1 sm:px-2"
      >
        <IconButton
          @click="handleQuantityChange(item.id, item.quantity - 1)"
          size="sm"
          ariaLabel="Decrease quantity"
          class="text-white hover:opacity-70"
        >
          <i class="pi pi-minus text-[0.8rem]"></i>
        </IconButton>
        <span
          class="w-8 sm:w-12 text-center font-semibold text-white text-base sm:text-lg"
          >{{ item.quantity }}
        </span>
        <IconButton
          @click="handleQuantityChange(item.id, item.quantity + 1)"
          size="sm"
          ariaLabel="Increase quantity"
          class="text-white hover:opacity-70"
        >
          <i class="pi pi-plus text-[0.8rem]"></i>
        </IconButton>
      </div>
    </div>
  </div>
</template>
