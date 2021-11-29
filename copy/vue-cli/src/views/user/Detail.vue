<template>
  <MainMenu v-can="'isAuth'" />
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    loading: {{ usersLoading }} <br />
    usersData: {{ usersData }} <br />
    usersError: {{ usersError }} <br />
  </div>
</template>

<script setup>
import MainMenu from "../../components/content/user/menu/MainMenu.vue";
import { useRoute } from "vue-router";
const route = useRoute();

import useUser from "../../compositions/useModelUser";
const { usersLoading, usersData, usersError, getUser } = useUser();
getUser({ id: route.params.id });
</script>

