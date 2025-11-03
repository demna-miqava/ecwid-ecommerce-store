<script setup lang="ts">
import { useCart } from "@/features/cart/composables/useCart";
import CartSection from "@/features/cart/components/CartSection.vue";
import ShippingSection from "@/features/cart/components/ShippingSection.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const { items, handleClearCart } = useCart();
const route = useRouter();
const showCongrats = ref(false);

const handlePlaceOrder = () => {
  handleClearCart();
  showCongrats.value = true;
};

const handleCloseModal = () => {
  showCongrats.value = false;
  route.replace("/");
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div
      v-if="items.length === 0 && !showCongrats"
      class="text-center py-16 flex flex-col items-center gap-4"
    >
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <router-link
        to="/"
        class="px-6 py-3 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-300 transition-colors"
      >
        View the store
      </router-link>
    </div>

    <div v-if="items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <CartSection />
      <ShippingSection @placeOrder="handlePlaceOrder" />
    </div>

    <Transition name="modal">
      <div
        v-if="showCongrats"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click="handleCloseModal"
      >
        <div
          class="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          @click.stop
        >
          <div class="mb-6 animate-bounce">
            <i class="pi pi-sparkles text-4xl text-purple-400"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-900 mb-3">
            Congratulations!
          </h3>
          <p class="text-gray-600 text-lg mb-8">
            Thank you for your purchase! Your order has been placed
            successfully.
          </p>
          <button
            @click="handleCloseModal"
            class="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}

.modal-enter-to .bg-white,
.modal-leave-from .bg-white {
  transform: scale(1);
  opacity: 1;
}
</style>
