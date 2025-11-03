import { apiFetch } from "@/utils/api";
import type { Product } from "@/types/product";

interface ProductsResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: Product[];
}

export async function getProducts(): Promise<ProductsResponse> {
  return apiFetch<ProductsResponse>("/products");
}
