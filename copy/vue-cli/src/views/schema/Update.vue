<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="flex flex-col">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-base-content">Update Schema</h1>
        <p class="text-base-content/70 mt-1">Edit an existing schema item</p>
      </div>
      <div class="rounded-lg">
        <formUpdate />
      </div>
    </div>
  </div>
</template>


<script setup>
import formUpdate from "./components/form/update.vue";
</script>

