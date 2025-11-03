<script setup lang="ts">
import { useCart } from "@/features/cart/composables/useCart";
import CartSection from "@/features/cart/components/CartSection.vue";

const { items } = useCart();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div
      v-if="items.length === 0"
      class="text-center py-16 flex flex-col items-center gap-4"
    >
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <router-link
        to="/"
        class="px-6 py-3 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-300 transition-colors"
      >
        View the store
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <CartSection />
    </div>
  </div>
</template>
