<template>
  <dot-loader :loading="loading" :color="color" :size="size"></dot-loader>
</template>

<script setup>
import DotLoader from "vue-spinner/src/DotLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
