<script setup lang="ts">
import { useCategoryNavigation } from "@/features/categories/composables/useCategoryNavigation";
import { useCategoryBreadcrumbs } from "@/features/categories/composables/useCategoryBreadcrumbs";
import SubcategoriesSection from "@/features/categories/components/SubcategoriesSection.vue";
import CategoryProductsSection from "@/features/categories/components/CategoryProductsSection.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";

const { currentCategoryId, currentCategory, parentCategory, subcategories } =
  useCategoryNavigation();

const { breadcrumbItems } = useCategoryBreadcrumbs(
  currentCategory,
  parentCategory
);
</script>

<template>
  <Breadcrumb :items="breadcrumbItems" />

  <SubcategoriesSection :subcategories="subcategories" />

  <CategoryProductsSection
    :category-id="currentCategoryId"
    :category-name="currentCategory?.name"
  />
</template>
