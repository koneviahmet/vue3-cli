<template>
  <div  v-for="i in length" :key="i">
    <Skeletor v-if="loading"/>
  </div>
</template>

<script setup>
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import { defineProps } from "vue";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
const props = defineProps({
  loading: { type: Boolean, default: false },
  length: { type: Number, default: 2 },
});
</script>
