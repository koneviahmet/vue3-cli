<template>
  <MainMenu v-can="'isAuth'" />
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    <formCreate />
  </div>
</template>


<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue";
import formCreate from "../../components/content/schema/form/create.vue";
</script>

