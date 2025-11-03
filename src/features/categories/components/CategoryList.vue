<script setup lang="ts">
import { computed } from "vue";
import FetchWrapper from "@/components/common/FetchWrapper.vue";
import { useGetCategories } from "../composables/useGetCategories";
import CategoryItem from "./CategoryItem.vue";
import CategoryItemSkeleton from "./CategoryItemSkeleton.vue";
import { nestCategories } from "@/utils/categoryUtils";

const { data: categoriesData, isLoading, isError } = useGetCategories();

const nestedCategories = computed(() => {
  if (!categoriesData.value) return [];
  return nestCategories(categoriesData.value.items);
});
</script>

<template>
  <FetchWrapper
    :data="nestedCategories"
    :is-loading="isLoading"
    :is-error="isError"
    empty-text="No categories found"
    error-text="Failed to load categories"
  >
    <template #loading>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <CategoryItemSkeleton v-for="i in 4" :key="i" />
      </div>
    </template>

    <template #default="{ data }">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <CategoryItem
          v-for="category in data"
          :key="category.id"
          :category="category"
        />
      </div>
    </template>
  </FetchWrapper>
</template>
