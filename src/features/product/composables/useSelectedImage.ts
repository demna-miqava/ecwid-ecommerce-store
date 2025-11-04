import { ref, computed, type Ref } from "vue";
import type { Product } from "@/types/product";

export function useSelectedImage(product: Ref<Product | undefined>) {
  const selectedImageIndex = ref(0);

  const allImages = computed<string[]>(() => {
    if (!product.value) return [];

    const images: string[] = [];

    // Add main product image first
    images.push(product.value.originalImageUrl);

    // Add gallery images
    if (product.value.galleryImages) {
      product.value.galleryImages.forEach((img) => {
        images.push(img.originalImageUrl);
      });
    }

    return images;
  });

  const selectedImage = computed<string | null>(() => {
    const images = allImages.value;
    if (images.length === 0) return null;

    const index = selectedImageIndex.value;
    if (index >= 0 && index < images.length) {
      return images[index] || null;
    }
    return images[0] || null;
  });

  const selectImage = (index: number) => {
    selectedImageIndex.value = index;
  };

  return {
    selectedImageIndex,
    selectedImage,
    allImages,
    selectImage,
  };
}
