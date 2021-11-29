<template>
  <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
</template>

<script setup>
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
