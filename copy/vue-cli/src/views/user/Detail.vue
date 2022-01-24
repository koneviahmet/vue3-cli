<template>
  <div class="my-24 mx-3  bg-base-100 min-h-screen shadow-sm rounded-md">
  <MainMenu v-can="'isAuth'" />
    loading: {{ usersLoading }} <br />
    usersData: {{ usersData }} <br />
    usersError: {{ usersError }} <br />
  </div> 
</template>

<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
import { useRoute } from "vue-router";
const route = useRoute();

import useUser from "../../compositions/useModelUser";
const { usersLoading, usersData, usersError, getUser } = useUser();
getUser({ id: route.params.id });
</script>

