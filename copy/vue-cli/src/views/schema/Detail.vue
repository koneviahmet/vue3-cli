<template>
  <div class="my-24 mx-3  bg-base-100 min-h-screen shadow-sm rounded-md">
    <MainMenu v-can="'isAuth'" />
    loading: {{ schemaLoading }} <br />
    usersData: {{ schemaData }} <br />
    usersError: {{ schemaError }} <br />
  </div>
</template>

<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
import { useRoute } from "vue-router";
const route = useRoute();

import useSchema from "../../compositions/useModelSchema";
const { schemaLoading, schemaData, schemaError, getSchema } = useSchema();
getSchema({ id: route.params.id });
</script>

