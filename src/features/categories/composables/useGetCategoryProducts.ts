import { useQuery } from "@tanstack/vue-query";
import { getProductsByCategory } from "@/services/productService";
import type { MaybeRef } from "vue";
import { unref } from "vue";
import { STALE_TIME_FIVE_MINUTES } from "@/consts";
import { QKEY_CATEGORY_PRODUCTS } from "@/consts/queryKeys";

export function useGetCategoryProducts(categoryId: MaybeRef<number>) {
  return useQuery({
    queryKey: [QKEY_CATEGORY_PRODUCTS, categoryId],
    queryFn: () => getProductsByCategory(unref(categoryId)),
    enabled: () => !!unref(categoryId),
    staleTime: STALE_TIME_FIVE_MINUTES,
  });
}
