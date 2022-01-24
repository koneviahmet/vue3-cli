<template>
  <div class="my-24 mx-3  bg-base-100 min-h-screen shadow-sm rounded-md">
    <MainMenu v-can="'isAuth'" />
    schema Home Page
  </div>
</template>

<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
</script>


