import type { Category } from "@/types/category";

export interface NestedCategory {
  id: number;
  name: string;
  subcategories: NestedCategory[];
}

export function nestCategories(categories: Category[]): NestedCategory[] {
  const categoryMap = new Map<number, NestedCategory>();
  const rootCategories: NestedCategory[] = [];

  categories.forEach((category) => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      subcategories: [],
    });
  });

  categories.forEach((category) => {
    const nestedCategory = categoryMap.get(category.id)!;

    if (category.parentId) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.subcategories.push(nestedCategory);
      }
    } else {
      rootCategories.push(nestedCategory);
    }
  });

  return rootCategories;
}
