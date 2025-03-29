<template>
  <div class="view-selector flex border border-gray-200 rounded-md overflow-hidden">
    <button
      v-for="view in availableViews"
      :key="view.value"
      @click="selectView(view.value)"
      :class="[
        'px-3 py-2 text-sm focus:outline-none',
        modelValue === view.value
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      ]"
    >
      {{ view.label }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'month'
  }
});

const emit = defineEmits(['update:modelValue']);

const availableViews = [
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
  { value: 'day', label: 'Day' },
  { value: 'agenda', label: 'Agenda' }
];

const selectView = (view) => {
  emit('update:modelValue', view);
};
</script> 