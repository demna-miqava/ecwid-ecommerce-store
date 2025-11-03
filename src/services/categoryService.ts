import type { Category } from "@/types/category";
import { apiFetch } from "@/utils/api";

export interface CategoriesResponse {
  items: Category[];
}

export async function getCategories(): Promise<CategoriesResponse> {
  return apiFetch<CategoriesResponse>(`/categories`);
}
