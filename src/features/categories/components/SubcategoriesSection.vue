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
    <div class="grid-responsive">
      <CategoryItem
        v-for="subcategory in subcategories"
        :key="subcategory.id"
        :category="subcategory"
      />
    </div>
  </section>
</template>
