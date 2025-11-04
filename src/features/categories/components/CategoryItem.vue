<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "@/types/category";

interface Props {
  category: Category;
}

const props = defineProps<Props>();

const categoryRoute = computed(() => {
  // If category has a parentId, it's a subcategory
  if (props.category.parentId) {
    return `/category/${props.category.parentId}/${props.category.id}`;
  }

  // Otherwise it's a top-level category
  return `/category/${props.category.id}`;
});
</script>

<template>
  <router-link
    :to="categoryRoute"
    class="bg-linear-to-br from-blue-50 to-indigo-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:from-blue-100 hover:to-indigo-300 transition-all flex items-center justify-center p-8 min-h-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  >
    <h3 class="font-semibold text-xl text-center text-primary">
      {{ category.name }}
    </h3>
  </router-link>
</template>
