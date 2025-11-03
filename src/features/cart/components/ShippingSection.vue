<script setup lang="ts">
import { useCart } from "../composables/useCart";
import { computed } from "vue";

const { totalPrice } = useCart();
const shipping = 0;

const total = computed(() => totalPrice.value + shipping);

const emit = defineEmits(["placeOrder"]);
</script>

<template>
  <div class="lg:col-span-1">
    <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
      </div>

      <button
        @click="emit('placeOrder')"
        class="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Place order
      </button>
    </div>
  </div>
</template>
