<template>
  <div class="py-6 px-4  min-h-screen">
    <div class="flex flex-col justify-center items-center">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-base-content">Welcome Back</h1>
          <p class="text-base-content/70 mt-1">Log in to your account</p>
        </div>
        <formUserLogin />
      </div>
    </div>
  </div>
</template>


<script setup>
import formUserLogin from "./components/form/userLogin.vue";
</script>

