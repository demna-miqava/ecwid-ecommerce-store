<script setup lang="ts">
import { useCart } from "../composables/useCart";
import CartItem from "./CartItem.vue";

const { items } = useCart();
</script>

<template>
  <div class="lg:col-span-2 space-y-4">
    <CartItem v-for="item in items" :key="item.product.id" :item="item" />
  </div>
</template>
