<script setup lang="ts">
import ProductsGrid from "@/features/product/components/ProductsGrid.vue";
import { useGetCategoryProducts } from "../composables/useGetCategoryProducts";

interface Props {
  categoryId: number;
}

const props = defineProps<Props>();

const {
  data: productsData,
  isLoading,
  isError,
} = useGetCategoryProducts(props.categoryId);
</script>

<template>
  <ProductsGrid
    :products="productsData?.items"
    :isLoading="isLoading"
    :isError="isError"
    title="Products"
    emptyText="No products found in this category"
    errorText="Failed to load category products. Please try again."
  />
</template>
