<template>
  <ring-loader :loading="loading" :color="color" :size="size"></ring-loader>
</template>

<script setup>
import RingLoader from "vue-spinner/src/RingLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
