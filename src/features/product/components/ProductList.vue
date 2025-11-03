<script setup lang="ts">
import { useGetProducts } from "../composables/useGetProducts";
import FetchWrapper from "@/components/common/FetchWrapper.vue";
import ProductItem from "./ProductItem.vue";
import ProductItemSkeleton from "./ProductItemSkeleton.vue";

const { data, isLoading, isError } = useGetProducts();
</script>

<template>
  <section>
    <h2 class="text-center text-3xl text-gray-700 font-semibold mb-12">
      Featured Products
    </h2>

    <FetchWrapper
      :data="data?.items"
      :isLoading="isLoading"
      :isError="isError"
      loadingText="Loading products..."
      emptyText="No products available"
      errorText="Failed to load products. Please try again."
    >
      <template #loading>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductItemSkeleton v-for="i in 8" :key="i" />
        </div>
      </template>

      <template #default="{ data }">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductItem
            v-for="product in data"
            :key="product.id"
            :product="product"
          />
        </div>
      </template>
    </FetchWrapper>
  </section>
</template>
