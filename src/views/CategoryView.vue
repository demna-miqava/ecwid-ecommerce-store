<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useGetCategories } from "@/features/categories/composables/useGetCategories";
import SubcategoriesSection from "@/features/categories/components/SubcategoriesSection.vue";
import CategoryProductsSection from "@/features/categories/components/CategoryProductsSection.vue";
import Breadcrumb, {
  type BreadcrumbItem,
} from "@/components/common/Breadcrumb.vue";

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

const currentCategory = computed(() =>
  categoriesData.value?.items.find((cat) => cat.id === currentCategoryId.value)
);

// Find parent category if viewing a subcategory
const parentCategory = computed(() => {
  if (!currentCategory.value?.parentId) return null;
  return categoriesData.value?.items.find(
    (cat) => cat.id === currentCategory.value!.parentId
  );
});

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [{ label: "Products", to: "/" }];

  if (parentCategory.value) {
    // Viewing a subcategory - show parent category
    items.push({
      label: parentCategory.value.name,
      to: `/category/${parentCategory.value.id}`,
    });
  }

  if (currentCategory.value) {
    // Current category (no link as it's the current page)
    items.push({
      label: currentCategory.value.name,
    });
  }

  return items;
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <Breadcrumb :items="breadcrumbItems" />

    <SubcategoriesSection :subcategories="subcategories" />

    <CategoryProductsSection :category-id="currentCategoryId" />
  </div>
</template>
