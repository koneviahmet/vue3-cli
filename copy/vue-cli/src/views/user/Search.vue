<template>
  <div class="py-6 px-4  min-h-screen">
    <div class="flex flex-col">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-base-content">Search Users</h1>
        <p class="text-base-content/70 mt-1">Find users in the system</p>
      </div>
      <div class=" rounded-lg  p-6">
        <FormUserSearch />
      </div>
    </div>
  </div>
</template>

<script setup>
import FormUserSearch from "./components/form/userSearch.vue";
</script>

