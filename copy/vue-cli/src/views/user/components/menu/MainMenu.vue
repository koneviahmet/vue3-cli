<template>
  <div class="p-3">
    <ul class="flex">
      <li class="mr-2" v-for="url in urlArr" :key="url.id">
        <router-link
          class="inline-block border rounded py-1 px-3"
          :class="route.fullPath == url.to && 'bg-blue-500 text-white'"
          :to="url.to"
          >{{ url.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const urlArr = ref([
  {
    id: 1,
    to: "/user",
    title: "User Home Page",
  },
  {
    id: 2,
    to: "/user/signIn",
    title: "User Create",
  },
  {
    id: 3,
    to: "/user/update/1",
    title: "User Update",
  },
  {
    id: 4,
    to: "/user/list",
    title: "User List",
  },
  {
    id: 5,
    to: "/user/detail/1",
    title: "User Detail",
  },
  {
    id: 6,
    to: "/user/login",
    title: "User Login",
  },
  {
    id: 7,
    to: "/user/search",
    title: "User Search",
  },
]);
</script>

