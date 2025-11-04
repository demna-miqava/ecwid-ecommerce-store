<script setup lang="ts">
import type { Product } from "@/types/product";
import { useAddProductToCart } from "../composables/useAddProductToCart";
import BuyNow from "./BuyNow.vue";

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const { addProductToCart } = useAddProductToCart();

const handleBuyNow = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  addProductToCart(props.product);
};
</script>
<template>
  <router-link
    :to="{ name: 'product-details', params: { id: product.id } }"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  >
    <div class="bg-gray-200 overflow-hidden">
      <img
        v-if="product.originalImageUrl"
        :src="product.originalImageUrl"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
    </div>
    <div class="p-4 flex flex-col grow">
      <h3 class="font-semibold text-md mb-2 text-center min-h-12">
        {{ product.name }}
      </h3>
      <div class="flex justify-between items-center mt-auto">
        <p class="font-bold text-lg text-primary">
          ${{ product.price.toFixed(2) }}
        </p>

        <BuyNow @click="handleBuyNow" />
      </div>
    </div>
  </router-link>
</template>
