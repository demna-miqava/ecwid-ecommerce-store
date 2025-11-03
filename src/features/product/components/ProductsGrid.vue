<script setup lang="ts">
import type { Product } from "@/types/product";
import FetchWrapper from "@/components/common/FetchWrapper.vue";
import ProductItem from "./ProductItem.vue";
import ProductItemSkeleton from "./ProductItemSkeleton.vue";

interface Props {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  title?: string;
  emptyText?: string;
  errorText?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Products",
  emptyText: "No products available",
  errorText: "Failed to load products. Please try again.",
});
</script>

<template>
  <section class="mt-12">
    <h2 v-if="title" class="text-center text-3xl text-gray-700 font-semibold mb-12">
      {{ title }}
    </h2>

    <FetchWrapper
      :data="products"
      :isLoading="isLoading"
      :isError="isError"
      :emptyText="emptyText"
      :errorText="errorText"
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
