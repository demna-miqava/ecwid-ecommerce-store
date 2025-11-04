<script setup lang="ts">
import type { ProductOption } from "@/types/product";

interface Props {
  option: ProductOption;
  modelValue?: number;
}

withDefaults(defineProps<Props>(), {
  modelValue: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

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
        class="min-w-12 px-4 py-3 border rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer"
        :class="
          (modelValue ?? option.defaultChoice) === index
            ? 'border-primary bg-primary text-white'
            : 'border-black/20 hover:border-black/40 hover:bg-bg-primary'
        "
      >
        <div class="flex flex-col items-center">
          <span>{{ choice.text }}</span>
          <span
            v-if="choice.priceModifier !== 0"
            class="text-xs mt-0.5"
            :class="
              (modelValue ?? option.defaultChoice) === index
                ? 'text-white/80'
                : 'text-secondary'
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
