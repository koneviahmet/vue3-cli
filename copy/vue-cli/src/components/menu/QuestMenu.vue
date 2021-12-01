<template>
  <div class="bg-base-200">
    <ul class="menu py-3  min-w-full w-64 rounded-md">
      <li class="menu-title">
        <span> Quest Menu </span>
      </li>
      <li v-for="(url, i) in urlArr" :key="i">
        <router-link
            class="inline-block py-1 px-3"
            :class="
              route.fullPath == url.to &&
              'bg-base-200'
            "
            :to="url.to"
            >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 mr-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          {{ url.title }}
        </router-link>
      </li>


    </ul>
  </div>
</template>


<script setup>
import { ref } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const urlArr = ref([
  {
    to: "/",
    title: "Home Page",
  },
  {
    to: "/user/login",
    title: "Log In",
  },
  {
    to: "/user/signIn",
    title: "Sign Up",
  },
  {
    to: "/tos",
    title: "Terms of Service",
  },
  {
    to: "/privacy",
    title: "Privacy Policy",
  },
]);
</script>