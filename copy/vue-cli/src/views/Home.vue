<template>
  <div class="container bg-white text- shadow-md min-h-screen rounded p-4 mt-7">
      {{userInfo}}
      <div v-can="'test'"></div>
      <span class="text-sm">   
        https://flowbite.com/docs/components/breadcrumb/ <br>
        https://vuetailwind.com/components/button
      </span>

      <br>
  </div> 

</template>


<script setup>
import { getCurrentInstance, computed, ref } from "vue";
import useUser from '../compositions/useModelUser'


const app      = getCurrentInstance();
const store    = app.appContext.config.globalProperties.$store;
const userInfo = computed(() => store.getters._getCurrentUser)

const colorArr = ["gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink"]
const sizeArr  = ["xs", "sm", "base", "lg", "xl", "2xl"]
const typeArr  = ["fill", "outline"]

</script>


