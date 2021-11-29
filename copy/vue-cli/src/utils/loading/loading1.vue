<template>
  <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
</template>

<script setup>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
