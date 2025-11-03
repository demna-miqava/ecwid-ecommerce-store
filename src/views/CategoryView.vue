<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useGetCategories } from "@/features/categories/composables/useGetCategories";
import SubcategoriesSection from "@/features/categories/components/SubcategoriesSection.vue";
import CategoryProductsSection from "@/features/categories/components/CategoryProductsSection.vue";

const route = useRoute();

// Determine which category to display (subcategory takes precedence)
const currentCategoryId = computed(() => {
  const subCategoryId = route.params.subCategoryId;
  return subCategoryId ? Number(subCategoryId) : Number(route.params.id);
});

const { data: categoriesData } = useGetCategories();

// Get subcategories of the current category
const subcategories = computed(
  () =>
    categoriesData.value?.items.filter(
      (cat) => cat.parentId === currentCategoryId.value
    ) ?? []
);
</script>

<template>
  <SubcategoriesSection :subcategories="subcategories" />

  <CategoryProductsSection :category-id="currentCategoryId" />
</template>
