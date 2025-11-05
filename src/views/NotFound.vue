<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
  >
    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-4">Page Not Found</h2>
    <p class="text-secondary mb-8">
      The page you're looking for doesn't exist.
    </p>
    <router-link
      to="/"
      class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
    >
      Go Back Home
    </router-link>
  </div>
</template>
