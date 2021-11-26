<template>
  <MainMenu v-can="'isAuth'"/>
  <formUserLogin />
</template>


<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue"
import formUserLogin from "../../components/content/user/form/userLogin.vue"
</script>

