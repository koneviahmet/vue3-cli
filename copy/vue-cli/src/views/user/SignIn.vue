<template>
  <MainMenu v-can="'isAuth'" />
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    <formUserCreate />
  </div>
</template>


<script setup>
import MainMenu from "../../components/content/user/menu/MainMenu.vue";
import formUserCreate from "../../components/content/user/form/userCreate.vue";
</script>

