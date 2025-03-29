<template>
  <div class="py-6 px-4 min-h-screen bg-base-200 dark:bg-neutral">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content dark:text-neutral-content">Search Contacts</h1>
        <p class="text-base-content/70 dark:text-neutral-content/70 mt-1">Find specific contacts in the system</p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/contacts/list" class="btn btn-outline btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to List
        </router-link>
      </div>
    </div>
    
    <div class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow">
      <div class="p-6">
        <formSearch />
      </div>
    </div>
  </div>
</template>

<script setup>
import formSearch from "./components/form/search.vue";
</script>

