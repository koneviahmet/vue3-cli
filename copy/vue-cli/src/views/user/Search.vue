<template>
  <MainMenu v-can="'isAuth'" />
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    <FormUserSearch />
  </div>
</template>

<script setup>
import MainMenu from "../../components/content/user/menu/MainMenu.vue";
import FormUserSearch from "../../components/content/user/form/userSearch.vue";
</script>

