<template>
  <div class="py-6 px-4  min-h-screen">
    <div class="flex flex-col">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-base-content">Update Profile</h1>
        <p class="text-base-content/70 mt-1">Update your account information</p>
      </div>
      <div class=" rounded-lg">
        <formUserUpdate />
      </div>
    </div>
  </div>
</template>


<script setup>
import formUserUpdate from "./components/form/userUpdate.vue";
</script>

