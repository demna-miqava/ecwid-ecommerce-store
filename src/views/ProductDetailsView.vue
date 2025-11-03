<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import FetchWrapper from "@/components/common/FetchWrapper.vue";
import ProductGallery from "@/features/product/components/ProductGallery.vue";
import ProductSizes from "@/features/product/components/ProductSizes.vue";
import ProductDetailsSkeleton from "@/features/product/components/ProductDetailsSkeleton.vue";
import { useGetProductById } from "@/features/product/composables/useGetProductById";
import { useSelectedImage } from "@/features/product/composables/useSelectedImage";
import { useCart } from "@/features/cart/composables/useCart";

const route = useRoute();

const productId = computed(() => Number(route.params.id));

const { data: product, isLoading, isError } = useGetProductById(productId);
const { handleAddToCart } = useCart();

const { selectedImage, allImages, selectedImageIndex, selectImage } =
  useSelectedImage(product);

const sizeOptions = computed(() => {
  if (!product.value?.options) return [];
  return product.value.options.filter(
    (opt) => opt.type === "SIZE" || opt.name.toLowerCase().includes("size")
  );
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <FetchWrapper
      :data="product"
      :is-loading="isLoading"
      :is-error="isError"
      loading-text="Loading product..."
      empty-text="Product not found"
      error-text="Failed to load product"
    >
      <template #loading>
        <ProductDetailsSkeleton />
      </template>

      <template #default="{ data }">
        <div v-if="data" class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductGallery
              :selected-image="selectedImage"
              :all-images="allImages"
              :selected-index="selectedImageIndex"
              @select-image="selectImage"
            />

            <!-- Product Details -->
            <div class="space-y-6">
              <h1 class="text-2xl font-bold text-gray-800">{{ data.name }}</h1>

              <div class="text-xl font-bold text-gray-700">
                ${{ data.price.toFixed(2) }}
              </div>

              <div
                v-if="data.description"
                class="text-gray-600"
                v-html="data.description"
              ></div>

              <ProductSizes
                v-for="option in sizeOptions"
                :key="option.name"
                :option="option"
              />

              <button
                @click="() => handleAddToCart(data)"
                class="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </template>
    </FetchWrapper>
  </div>
</template>
