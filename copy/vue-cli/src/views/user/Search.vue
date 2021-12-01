<template>
  <div class="my-24 mx-3  bg-base-100 min-h-screen shadow-sm rounded-md">
    <MainMenu v-can="'isAuth'" />
    <FormUserSearch />
  </div>
</template>

<script setup>
import MainMenu from "../../components/content/user/menu/MainMenu.vue";
import FormUserSearch from "../../components/content/user/form/userSearch.vue";
</script>

