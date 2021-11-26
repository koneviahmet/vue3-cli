<template>
  <MainMenu v-can="'isAuth'"/>
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    
    <FormSearch />
  </div>

</template>

<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue"
import FormSearch from "../../components/content/schema/form/search.vue"
</script>

