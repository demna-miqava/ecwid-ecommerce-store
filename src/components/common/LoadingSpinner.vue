<script setup lang="ts">
interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "border-blue-700",
});

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};
</script>

<template>
  <div class="text-center py-8">
    <div
      :class="[
        'inline-block animate-spin rounded-full border-b-2',
        sizeClasses[size],
        color,
      ]"
      role="status"
      aria-label="Loading"
    />
    <p v-if="text" class="text-gray-500 mt-2 animate-pulse">{{ text }}</p>
  </div>
</template>
