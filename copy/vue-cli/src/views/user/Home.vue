<template>
  <MainMenu v-can="'isAuth'"/>

  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    Bu kısımda user ana sayfa olacak
  </div>

</template>

<script setup>
import MainMenu from "../../components/content/user/menu/MainMenu.vue"



</script>


<style scoped>
input{border: solid 1px #ccc; margin: 10px 0; padding: 5px;}
</style>

