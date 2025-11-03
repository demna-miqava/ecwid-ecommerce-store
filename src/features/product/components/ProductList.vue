<script setup lang="ts">
import { useGetProducts } from "../composables/useGetProducts";
import ProductsGrid from "./ProductsGrid.vue";

const { data, isLoading, isError } = useGetProducts();
</script>

<template>
  <ProductsGrid
    :products="data?.items"
    :isLoading="isLoading"
    :isError="isError"
    title="Featured Products"
  />
</template>
