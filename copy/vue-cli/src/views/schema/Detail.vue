<template>
  <div class="my-24 mx-3  bg-base-100 min-h-screen shadow-sm rounded-md">
    <MainMenu v-can="'isAuth'" />
    loading: {{ schemaLoading }} <br />
    <hr class="my-2">
    select data: {{ selectData }} <br /> 
    <hr class="my-2">
    all data from store: {{ schemaData }} <br />
    <hr class="my-2">
    usersError: {{ schemaError }} <br />
  </div>
</template>

<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
import { useRoute } from "vue-router";
import {ref} from "vue"
const route = useRoute();
const selectData = ref(null);

import useSchema from "../../compositions/useModelSchema";
const { schemaLoading, schemaData, schemaError, getSchema } = useSchema();
getSchema({ id: route.params.id })
.then(response => {
  selectData.value = response;
})
.catch(error => console.log(error));
</script>

