<template>
  <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
