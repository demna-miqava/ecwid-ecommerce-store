<script setup lang="ts" generic="T">
import { computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

interface Props {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  loadingText?: string;
  emptyText?: string;
  errorText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: "Loading...",
  emptyText: "No data available",
  errorText: "Failed to load data",
});

const isEmpty = computed(() => {
  const { data } = props;
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === "object") return Object.keys(data).length === 0;
  return false;
});
</script>

<template>
  <div v-if="isLoading">
    <slot name="loading">
      <LoadingSpinner size="xl" :text="loadingText" />
    </slot>
  </div>

  <div v-else-if="isError">
    <slot name="error">
      <div class="text-center py-8">
        <div
          class="rounded-lg p-4 max-w-md mx-auto border-2 bg-bg-primary border-destructive"
        >
          <p class="font-medium text-destructive">{{ errorText }}</p>
        </div>
      </div>
    </slot>
  </div>

  <div v-else-if="isEmpty">
    <slot name="empty">
      <div class="text-center py-8">
        <p class="text-secondary">{{ emptyText }}</p>
      </div>
    </slot>
  </div>

  <slot v-else :data="data" />
</template>
