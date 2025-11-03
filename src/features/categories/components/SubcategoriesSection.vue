<script setup lang="ts">
import type { Category } from "@/types/category";
import CategoryItem from "./CategoryItem.vue";

interface Props {
  subcategories: Category[];
}

defineProps<Props>();
</script>

<template>
  <section v-if="subcategories.length > 0" class="mb-12">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <CategoryItem
        v-for="subcategory in subcategories"
        :key="subcategory.id"
        :category="subcategory"
      />
    </div>
  </section>
</template>
