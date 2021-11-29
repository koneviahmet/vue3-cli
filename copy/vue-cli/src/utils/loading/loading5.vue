<template>
  <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
</template>

<script setup>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
