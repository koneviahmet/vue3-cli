<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="flex flex-col">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-base-content">Create Schema</h1>
        <p class="text-base-content/70 mt-1">Add a new schema item to your collection</p>
      </div>
      <div class="rounded-lg">
        <formCreate />
      </div>
    </div>
  </div>
</template>


<script setup>
import formCreate from "./components/form/create.vue";
</script>

