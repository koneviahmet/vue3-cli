<template>
  <div class="my-24 mx-3 bg-base-100 min-h-screen shadow-sm rounded-md">
    <MainMenu v-can="'isAuth'" />
    <formUpdate />
  </div>
</template>


<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue";
import formUpdate from "../../components/content/schema/form/update.vue";
</script>

