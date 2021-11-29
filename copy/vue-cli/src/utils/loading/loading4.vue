<template>
  <rise-loader :loading="loading" :color="color" :size="size"></rise-loader>
</template>

<script setup>
import RiseLoader from "vue-spinner/src/RiseLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
