<template>
  <div class="py-6 px-4  min-h-screen">
    <div class="flex flex-col justify-center items-center">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-base-content">Create Account</h1>
          <p class="text-base-content/70 mt-1">Sign up to access the system</p>
        </div>
        <formUserCreate />
      </div>
    </div>
  </div>
</template>


<script setup>
import MainMenu from "./components/menu/MainMenu.vue";
import formUserCreate from "./components/form/userCreate.vue";
</script>

