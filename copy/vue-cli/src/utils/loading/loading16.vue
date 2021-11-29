<template>
  <scale-loader
    :loading="loading"
    :color="color"
    :height="height"
    :width="width"
  ></scale-loader>
</template>

<script setup>
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
  height: { type: String, default: "15px" },
  width: { type: String, default: "15px" },
});
</script>
