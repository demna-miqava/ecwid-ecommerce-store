<script setup lang="ts">
import ProductsGrid from "@/features/product/components/ProductsGrid.vue";
import { useGetCategoryProducts } from "../composables/useGetCategoryProducts";
import { computed } from "vue";

interface Props {
  categoryId: number;
  categoryName?: string;
}

const props = defineProps<Props>();

const {
  data: productsData,
  isLoading,
  isError,
} = useGetCategoryProducts(props.categoryId);

const title = computed(() => {
  return props.categoryName ? `${props.categoryName} Products` : "Products";
});
</script>

<template>
  <ProductsGrid
    :products="productsData?.items"
    :isLoading="isLoading"
    :isError="isError"
    :title="title"
    emptyText="No products found in this category"
    errorText="Failed to load category products. Please try again."
  />
</template>
