import { computed, type ComputedRef } from "vue";
import type { BreadcrumbItem } from "@/components/common/Breadcrumb.vue";
import type { Category } from "@/types/category";

export function useCategoryBreadcrumbs(
  currentCategory: ComputedRef<Category | undefined>,
  parentCategory: ComputedRef<Category | null | undefined>
) {
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

  return {
    breadcrumbItems,
  };
}
