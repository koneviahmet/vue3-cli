<template>
  <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
</template>

<script setup>
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
