<template>
  <skew-loader :loading="loading" :color="color" :size="size"></skew-loader>
</template>

<script setup>
import SkewLoader from "vue-spinner/src/SkewLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
