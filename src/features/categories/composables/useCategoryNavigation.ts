import { computed } from "vue";
import { useRoute } from "vue-router";
import { useGetCategories } from "./useGetCategories";

export function useCategoryNavigation() {
  const route = useRoute();
  const { data: categoriesData } = useGetCategories();

  const currentCategoryId = computed(() => {
    const { id, subCategoryId } = route.params;
    return subCategoryId ? Number(subCategoryId) : Number(id);
  });

  const currentCategory = computed(() =>
    categoriesData.value?.items.find(
      (category) => category.id === currentCategoryId.value
    )
  );

  const parentCategory = computed(() => {
    if (!currentCategory.value?.parentId) return null;
    return categoriesData.value?.items?.find(
      (category) => category.id === currentCategory.value!.parentId
    );
  });

  const subcategories = computed(
    () =>
      categoriesData.value?.items.filter(
        (category) => category.parentId === currentCategoryId.value
      ) ?? []
  );

  return {
    currentCategoryId,
    currentCategory,
    parentCategory,
    subcategories,
  };
}
