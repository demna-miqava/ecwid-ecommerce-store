<script setup lang="ts">
import { ref } from "vue";
import type { ProductOption } from "@/types/product";

interface Props {
  option: ProductOption;
}

const props = defineProps<Props>();

const selectedChoice = ref(props.option.defaultChoice);

const selectChoice = (index: number) => {
  selectedChoice.value = index;
};
</script>

<template>
  <div class="space-y-3">
    <p class="font-semibold text-lg">{{ option.name }}</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="(choice, index) in option.choices"
        :key="index"
        @click="selectChoice(index)"
        class="min-w-[50px] px-4 py-3 border rounded-lg font-medium transition-all duration-300 ease-in-out"
        :class="
          selectedChoice === index
            ? 'border-black bg-black text-white'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        "
      >
        <div class="flex flex-col items-center">
          <span>{{ choice.text }}</span>
          <span
            v-if="choice.priceModifier !== 0"
            class="text-xs mt-0.5"
            :class="
              selectedChoice === index ? 'text-gray-200' : 'text-gray-500'
            "
          >
            {{ choice.priceModifier > 0 ? "+" : "" }}${{
              choice.priceModifier.toFixed(2)
            }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>
