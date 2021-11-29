<template>
  <moon-loader :loading="loading" :color="color" :size="size"></moon-loader>
</template>

<script setup>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
