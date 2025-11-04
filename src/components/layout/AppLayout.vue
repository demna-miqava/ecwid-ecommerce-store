<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <AppHeader />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot></slot>
    </main>
  </div>
</template>
