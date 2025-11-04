<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

defineProps<Props>();
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center space-x-1 text-sm">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <router-link
          v-if="item.to"
          :to="item.to"
          class="text-secondary hover:text-primary transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-primary font-medium">
          {{ item.label }}
        </span>
        <i
          v-if="index < items.length - 1"
          class="pi pi-chevron-right text-secondary/50 text-xs mx-2"
        ></i>
      </li>
    </ol>
  </nav>
</template>
