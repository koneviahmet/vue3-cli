<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content">Schema Management</h1>
        <p class="text-base-content/70 mt-1">View and manage all schemas in the system</p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/schema/create" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Schema
        </router-link>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="bg-base-100 p-4 rounded-lg shadow mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input 
            type="text" 
            placeholder="Search schemas" 
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex gap-2">
          <button 
            class="btn btn-outline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Error alert -->
    <div class="alert alert-error mb-6" v-if="schemaError">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ schemaError }}</span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="schemaLoading" class="bg-base-100 rounded-lg shadow">
      <Skeletor :length="8" />
    </div>

    <!-- Data table -->
    <div v-else class="bg-base-100 rounded-lg shadow">
      <div v-if="schemaData.length === 0" class="p-8 text-center text-base-content/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">No schemas found</p>
        <p class="mt-1">Try adjusting your search criteria</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="table w-full">
          <thead class="bg-base-100">
            <tr>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">ID</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Schema Details</th>
              <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr v-for="item in schemaData" :key="item.id" class="hover:bg-base-200">
              <td class="py-4 px-4">{{ item.id }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-base-200 rounded-full flex items-center justify-center">
                    <span class="text-base-content font-medium">{{ getItemInitials(item) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-base-content">Schema #{{ item.id }}</div>
                    <div class="text-sm text-base-content/70">Added: {{ formatDate(item.created_at || item.createdAt) }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-right space-x-1">
                <router-link :to="`/schema/detail/${item.id}`" class="btn btn-sm btn-primary">
                  View
                </router-link>
                <router-link :to="`/schema/update/${item.id}`" class="btn btn-sm btn-secondary">
                  Edit
                </router-link>
                <button @click="itemDelete(item)" class="btn btn-sm btn-error" :class="schemaLoading && 'loading btn-disabled'">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="border-t border-base-200 p-4 flex items-center justify-between">
        <div class="text-sm text-base-content/70">
          Showing <span class="font-medium">{{ schemaData.length }}</span> schemas
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted } from "vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Skeletor from "../../utils/skeletor/skeletor1.vue";
import useSchema from "../../compositions/useModelSchema";
import Alert from "../../utils/alert.js";

const { loading: schemaLoading, data: schemaData, error: schemaError, getItems: getSchemas, confirmDelete: deleteSchema  } = useSchema();
onMounted(() => getSchemas());

const itemDelete = (item) => {
  deleteSchema(item)
  .then(() => notyfSuccess("Schema deleted successfully"))
  .catch(err => notyfSuccess("hata" + err))
};

// Helper functions
const getItemInitials = (item) => {
  return 'S' + item.id;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
</script>

