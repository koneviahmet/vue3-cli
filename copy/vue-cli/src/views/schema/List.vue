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

    <div>
      <List 
        :data="schemaData"
        :loading="schemaLoading"
        :error="schemaError"
        :totalItems="totalItems"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :perPage="perPage"
        @itemDelete="itemDelete" 
        @handleSearch="handleSearch" 
        @clearSearch="clearSearch" 
        @handlePerPageChange="handlePerPageChange"
        @changePage="changePage" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Skeletor from "../../utils/skeletor/skeletor1.vue";
import useSchema from "../../compositions/useModelSchema";
import Alert from "../../utils/alert.js";
import List from "./components/other/List.vue";
const { loading: schemaLoading, data: schemaData, error: schemaError, getItems: getSchemas, confirmDelete: deleteSchema } = useSchema();

// Pagination and search state
const currentPage = ref(1);
const perPage = ref(10);
const totalItems = ref(0);
const searchTerm = ref('');

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / perPage.value) || 1;
});


// Fetch schemas with pagination and search
const fetchDatas = async () => {
  let filter = '';
  
  // Add search filter if searchTerm is provided
  if (searchTerm.value.trim()) {
    filter = `id ~ "${searchTerm.value.trim()}"`;
  }
  
  try {
    const response = await getSchemas({
      page: currentPage.value,
      perPage: perPage.value,
      filter: filter || undefined
    });
    
    // Update total items from response
    totalItems.value = response?.totalItems || response?.length || 0;
    
    // If the response doesn't include pagination info
    if (!response?.totalItems) {
      schemaData.value = response;
    }
  } catch (error) {
    console.error("Error fetching schemas:", error);
  }
};

// Initialize data on mount
onMounted(() => {
  fetchDatas();
});

// Handle search button click
const handleSearch = (search) => {
  currentPage.value = 1; // Reset to first page when searching
  searchTerm.value = search;
  fetchDatas();
};

// Clear search and reset
const clearSearch = () => {
  searchTerm.value = '';
  currentPage.value = 1;
  fetchDatas();
};

// Change page
const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  currentPage.value = newPage;
  fetchDatas();
};


// Handle per page change
const handlePerPageChange = (pPage) => {
  perPage.value = pPage;
  currentPage.value = 1; // Reset to first page when changing items per page
  fetchDatas();
};

// Delete item
const itemDelete = (item) => {
  
  deleteSchema(item)
  .then(() => {
    notyfSuccess("Schema deleted successfully");
    // Refresh the current page after deletion
    fetchDatas();
  })
  .catch(err => notyfError("Error: " + err));
};




</script>

