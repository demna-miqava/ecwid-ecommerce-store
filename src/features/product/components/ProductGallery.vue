<script setup lang="ts">
interface Props {
  selectedImage: string | null;
  allImages: string[];
  selectedIndex: number;
}

defineProps<Props>();

const emit = defineEmits<{
  selectImage: [index: number];
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="bg-gray-100 rounded-lg overflow-hidden">
      <img
        v-if="selectedImage"
        :src="selectedImage"
        :alt="'Product image'"
        class="w-full h-full object-cover"
      />
    </div>

    <div v-if="allImages.length > 1" class="grid grid-cols-4 gap-2">
      <button
        v-for="(image, index) in allImages"
        :key="index"
        @click="emit('selectImage', index)"
        class="bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"
        :class="
          selectedIndex === index
            ? 'border-primary'
            : 'border-transparent hover:border-black/30'
        "
      >
        <img
          :src="image"
          :alt="`Product thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>
