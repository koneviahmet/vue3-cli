<template>
  <div class="py-6 px-4 min-h-screen bg-base-200 dark:bg-neutral">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content dark:text-neutral-content">Edit Contact</h1>
        <p class="text-base-content/70 dark:text-neutral-content/70 mt-1">Update the details of an existing contact</p>
      </div>
      <div class="mt-4 md:mt-0 flex space-x-2">
        <router-link :to="`/contacts/detail/${$route.params.id}`" class="btn btn-outline btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
          View Details
        </router-link>
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
        <formUpdate />
      </div>
    </div>
  </div>
</template>


<script setup>
import formUpdate from "./components/form/update.vue";
import { useRoute } from "vue-router";
const $route = useRoute();
</script>

