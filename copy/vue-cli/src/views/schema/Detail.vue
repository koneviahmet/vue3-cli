<template>
  <MainMenu v-can="'isAuth'" />
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    loading: {{ schemaLoading }} <br />
    usersData: {{ schemaData }} <br />
    usersError: {{ schemaError }} <br />
  </div>
</template>

<script setup>
import MainMenu from "../../components/content/schema/menu/MainMenu.vue";
import { useRoute } from "vue-router";
const route = useRoute();

import useSchema from "../../compositions/useModelSchema";
const { schemaLoading, schemaData, schemaError, getSchema } = useSchema();
getSchema({ id: route.params.id });
</script>

