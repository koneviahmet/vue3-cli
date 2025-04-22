<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="text-2xl font-bold text-base-content mb-6">Schema Dashboard</div>
    
    <div v-if="schemaLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 p-4 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-16 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Total Schemas</div>
        <div class="text-3xl font-bold text-primary">{{ schemaCount }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Active Schemas</div>
        <div class="text-3xl font-bold text-secondary">{{ schemaCount }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Archived Schemas</div>
        <div class="text-3xl font-bold text-accent">0</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">New This Month</div>
        <div class="text-3xl font-bold text-info">{{ newSchemas }}</div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Recent Schemas</div>
        <div v-if="schemaLoading" class="animate-pulse">
          <div v-for="i in 5" :key="i" class="h-10 bg-base-300 rounded my-2"></div>
        </div>
        <div v-else>
          <div v-if="!schemaData || schemaData.length === 0" class="text-center py-4 text-base-content/60">
            No schemas found
          </div>
          <div v-else class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in recentSchemas" :key="item.id" class="border-b border-base-300">
                  <td class="py-2">{{ item.id }}</td>
                  <td class="py-2 text-right">
                    <router-link :to="`/schema/${item.id}`" class="btn btn-sm btn-primary">View</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/schema/list" class="text-primary hover:underline">View all schemas</router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Quick Actions</div>
        <div class="space-y-3">
          <router-link to="/schema/create" class="btn btn-primary w-full flex items-center justify-between">
            <span>Create New Schema</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </router-link>
          
          <router-link to="/schema/list" class="btn btn-secondary w-full flex items-center justify-between">
            <span>Manage Schemas</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </router-link>
          
          <router-link to="/schema/search" class="btn btn-accent w-full flex items-center justify-between">
            <span>Search Schemas</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import useSchema from "../../compositions/useModelSchema";

const { loading: schemaLoading, data: schemaData, error: schemaError, getItems: getSchemas } = useSchema();

onMounted(() => {
  getSchemas();
});

// Calculate stats from schema data
const schemaCount = computed(() => {
  if (!schemaData.value) return 0;
  return schemaData.value.length;
});

const newSchemas = computed(() => {
  if (!schemaData.value) return 0;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return schemaData.value.filter(item => {
    const createdDate = new Date(item.created_at || item.createdAt);
    return createdDate >= monthStart;
  }).length;
});

const recentSchemas = computed(() => {
  if (!schemaData.value) return [];
  return [...schemaData.value]
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt);
      const dateB = new Date(b.created_at || b.createdAt);
      return dateB - dateA;
    })
    .slice(0, 5);
});
</script>

<style scoped>
input {
  border: solid 1px #ccc;
  margin: 10px 0;
  padding: 5px;
}
</style>


