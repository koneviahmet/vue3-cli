<template>
  <div class="my-24 mx-3 bg-base-100 min-h-screen shadow-sm rounded-md">
  <MainMenu v-can="'isAuth'" />

    User home page
  </div>
</template>

<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
</script>


<style scoped>
input {
  border: solid 1px #ccc;
  margin: 10px 0;
  padding: 5px;
}
</style>

