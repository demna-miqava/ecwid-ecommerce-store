<script setup lang="ts">
import { useCart } from "../composables/useCart";
import { computed } from "vue";
import { formatPrice } from "@/utils/priceUtils";

const { totalPrice } = useCart();
const shipping = 0;

const total = computed(() => totalPrice.value + shipping);

const emit = defineEmits(["placeOrder"]);
</script>

<template>
  <div class="lg:col-span-1">
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 class="text-xl font-semibold mb-4 text-primary">Order Summary</h2>

      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-secondary">
          <span>Subtotal</span>
          <span>${{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="flex justify-between text-secondary">
          <span>Shipping</span>
          <span>${{ formatPrice(shipping) }}</span>
        </div>
        <div
          class="border-t pt-3 flex justify-between font-bold text-lg text-primary"
        >
          <span>Total</span>
          <span>${{ formatPrice(total) }}</span>
        </div>
      </div>

      <button
        @click="emit('placeOrder')"
        class="w-full bg-primary text-button py-3 rounded-lg font-medium hover:opacity-90 transition-all"
      >
        Place order
      </button>
    </div>
  </div>
</template>
