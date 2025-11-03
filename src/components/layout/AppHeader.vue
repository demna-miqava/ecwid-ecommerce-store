<script setup lang="ts">
import { useCart } from "@/features/cart/composables/useCart";

const { totalItems } = useCart();
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="text-2xl font-bold hover:text-gray-700">
          LightSpeed Assignment
        </router-link>
        <router-link to="/cart" class="relative">
          <i class="pi pi-shopping-bag text-[24px] text-gray-500"></i>
          <span
            class="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ totalItems }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>
