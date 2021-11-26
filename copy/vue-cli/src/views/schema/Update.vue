<template>
  <MainMenu v-can="'isAuth'"/>
    <div class="container bg-white shadow-md min-h-screen rounded p-4">
      <formUpdate />
    </div>
</template>


<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue"
import formUpdate from "../../components/content/schema/form/update.vue"
</script>

