<template>
  <BeakerIcon v-if="loading" class="h-5 w-5 text-blue-500 animate-pulse" />
</template>

<script setup>
import { BeakerIcon, AdjustmentsIcon } from "@heroicons/vue/solid";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
});
</script>
