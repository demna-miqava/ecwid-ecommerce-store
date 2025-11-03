import { useQuery } from "@tanstack/vue-query";
import { getProducts } from "@/services/productService";
import { STALE_TIME_FIVE_MINUTES } from "@/consts";
import { QKEY_PRODUCTS } from "@/consts/queryKeys";

export function useGetProducts() {
  return useQuery({
    queryKey: [QKEY_PRODUCTS],
    queryFn: getProducts,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });
}
