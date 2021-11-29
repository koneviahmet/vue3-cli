<template>
  <sync-loader :loading="loading" :color="color" :size="size"></sync-loader>
</template>

<script setup>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import { defineProps } from "vue";
const props = defineProps({
  loading: { type: Boolean, default: false },
  color: { type: String, default: "#5dc596" },
  size: { type: String, default: "15px" },
});
</script>
