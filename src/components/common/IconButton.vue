<script setup lang="ts">
interface Props {
  size?: "sm" | "md" | "lg";
  ariaLabel: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
});

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};
</script>

<template>
  <button
    :class="[
      'flex items-center justify-center rounded-full cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
      sizeClasses[size],
    ]"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>
