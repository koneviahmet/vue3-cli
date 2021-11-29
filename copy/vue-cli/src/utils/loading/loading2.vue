<template>
  <grid-loader :loading="loading" :color="color" :size="size"></grid-loader>
</template>

<script setup>
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
