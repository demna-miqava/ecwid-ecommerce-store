<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import FetchWrapper from "@/components/common/FetchWrapper.vue";
import ProductGallery from "@/features/product/components/ProductGallery.vue";
import ProductSizes from "@/features/product/components/ProductSizes.vue";
import ProductDetailsSkeleton from "@/features/product/components/ProductDetailsSkeleton.vue";
import { useGetProductById } from "@/features/product/composables/useGetProductById";
import { useSelectedImage } from "@/features/product/composables/useSelectedImage";
import { useAddProductToCart } from "@/features/product/composables/useAddProductToCart";
import BuyNow from "@/features/product/components/BuyNow.vue";

const route = useRoute();

const productId = computed(() => Number(route.params.id));

const { data: product, isLoading, isError } = useGetProductById(productId);
const { addProductToCart } = useAddProductToCart();

const { selectedImage, allImages, selectedImageIndex, selectImage } =
  useSelectedImage(product);

const sizeOptions = computed(() => {
  if (!product.value?.options) return [];
  return product.value.options.filter(
    (opt) => opt.type === "SIZE" || opt.name.toLowerCase().includes("size")
  );
});

const selectedSizeIndex = ref<number>(0);

const handleAddToCartClick = () => {
  if (!product.value) return;
  addProductToCart(product.value, selectedSizeIndex.value);
};
</script>

<template>
  <div class="container mx-auto py-8">
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
        <div v-if="data">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductGallery
              :selected-image="selectedImage"
              :all-images="allImages"
              :selected-index="selectedImageIndex"
              @select-image="selectImage"
            />

            <!-- Product Details -->
            <div class="space-y-6">
              <h1 class="text-2xl font-bold text-primary">{{ data.name }}</h1>

              <div class="text-xl font-bold text-primary">
                ${{ data.price.toFixed(2) }}
              </div>

              <div
                v-if="data.description"
                class="text-secondary"
                v-html="data.description"
              ></div>

              <ProductSizes
                v-if="sizeOptions.length > 0 && sizeOptions[0]"
                v-model="selectedSizeIndex"
                :option="sizeOptions[0]"
              />

              <BuyNow @click="handleAddToCartClick" />
            </div>
          </div>
        </div>
      </template>
    </FetchWrapper>
  </div>
</template>
