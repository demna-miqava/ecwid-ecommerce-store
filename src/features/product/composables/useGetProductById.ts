import { useQuery } from "@tanstack/vue-query";
import { getProductById } from "@/services/productService";
import type { MaybeRef } from "vue";
import { unref } from "vue";
import { QKEY_SINGLE_PRODUCT } from "@/consts/queryKeys";
import { STALE_TIME_FIVE_MINUTES } from "@/consts";

export function useGetProductById(productId: MaybeRef<number>) {
  return useQuery({
    queryKey: [QKEY_SINGLE_PRODUCT, productId],
    queryFn: () => getProductById(unref(productId)),
    staleTime: STALE_TIME_FIVE_MINUTES,
  });
}
