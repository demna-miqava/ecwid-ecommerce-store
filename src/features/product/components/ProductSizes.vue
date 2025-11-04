<script setup lang="ts">
import type { ProductOption } from "@/types/product";
import { formatPrice } from "@/utils/priceUtils";
import { computed } from "vue";

interface Props {
  option: ProductOption;
  modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const selectedIndex = computed(
  () => props.modelValue ?? props.option.defaultChoice
);

const getButtonClasses = (index: number) => {
  const isSelected = selectedIndex.value === index;
  return [
    "min-w-12 px-4 py-3 border rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer",
    isSelected
      ? "border-primary bg-primary text-white"
      : "border-black/20 hover:border-black/40 hover:bg-bg-primary",
  ];
};

const getPriceModifierClasses = (index: number) => {
  const isSelected = selectedIndex.value === index;
  return ["text-xs mt-0.5", isSelected ? "text-white/80" : "text-secondary"];
};

const selectChoice = (index: number) => {
  emit("update:modelValue", index);
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
        :class="getButtonClasses(index)"
      >
        <div class="flex flex-col items-center">
          <span>{{ choice.text }}</span>
          <span
            v-if="choice.priceModifier !== 0"
            :class="getPriceModifierClasses(index)"
          >
            {{ choice.priceModifier > 0 ? "+" : "" }}${{
              formatPrice(choice.priceModifier)
            }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>
