import { useQuery } from "@tanstack/vue-query";
import { getCategories } from "@/services/categoryService";
import { QKEY_CATEGORIES } from "@/consts/queryKeys";
import { STALE_TIME_FIVE_MINUTES } from "@/consts";

export function useGetCategories() {
  return useQuery({
    queryKey: [QKEY_CATEGORIES],
    queryFn: getCategories,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });
}
