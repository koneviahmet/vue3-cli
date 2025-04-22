<template>
    <div>
      <!-- Search and filters -->
      <div class="bg-base-100 p-4 rounded-lg shadow mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-grow">
            <input 
              type="text" 
              placeholder="Search schemas" 
              class="input input-bordered w-full"
              v-model="searchTerm"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="flex gap-2">
            <button 
              @click="handleSearch" 
              class="btn btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
              Search
            </button>
            <button 
                @click="clearSearch" 
                class="btn btn-outline"
                :disabled="!searchTerm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
  
      <!-- Error alert -->
      <div class="alert alert-error mb-6" v-if="error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>
  
      <!-- Loading skeleton -->
      <div v-if="loading" class="bg-base-100 rounded-lg shadow">
        <Skeletor :length="8" />
      </div>
  
      <!-- Data table -->
      <div v-else class="bg-base-100 rounded-lg shadow">
        <div v-if="data.length === 0" class="p-8 text-center text-base-content/60">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg font-medium">No schemas found</p>
          <p class="mt-1">Try adjusting your search criteria</p>
        </div>
        
        <div v-else>
          <!-- Bulk actions -->
          <div class="p-4 flex items-center justify-between border-b border-base-200" v-if="selectedItems.length > 0">
            <div class="text-sm">
              <span class="font-medium">{{ selectedItems.length }}</span> items selected
            </div>
            <button 
              @click="bulkDelete" 
              class="btn btn-sm btn-error"
              :class="loading && 'loading btn-disabled'"
            >
              Bulk Delete
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead class="bg-base-100">
                <tr>
                  <th class="py-3 px-4 text-left">
                    <label class="cursor-pointer">
                      <input type="checkbox" class="checkbox checkbox-sm" 
                        :checked="isAllSelected" 
                        @change="toggleSelectAll" 
                      />
                    </label>
                  </th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">ID</th>
                  <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>


              <tbody class="divide-y divide-base-200">
                <tr v-for="item in data" :key="item.id" class="hover:bg-base-200">
                  <td class="py-4 px-4">
                    <label class="cursor-pointer">
                      <input type="checkbox" class="checkbox checkbox-sm" 
                        :checked="isItemSelected(item)" 
                        @change="toggleSelectItem(item)" 
                      />
                    </label>
                  </td>
                  <td class="py-4 px-4">{{ item.id }}</td>
      
                  <td class="py-4 px-4 text-right space-x-1">
                    <router-link :to="`/schema/${item.id}`" class="btn btn-sm btn-primary">
                      View
                    </router-link>
                    <router-link :to="`/schema/${item.id}/edit`" class="btn btn-sm btn-secondary">
                      Edit
                    </router-link>
                      <button @click="itemDelete(item)" class="btn btn-sm btn-error" :class="loading && 'loading btn-disabled'">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="border-t border-base-200 p-4 flex items-center justify-between">
          <div class="text-sm text-base-content/70">
            Showing <span class="font-medium">{{ data.length }}</span> of <span class="font-medium">{{ totalItems }}</span> schemas
          </div>
          
          <!-- Pagination controls -->
          <div class="join">
            <button 
              class="join-item btn btn-sm" 
              :class="currentPage <= 1 ? 'btn-disabled' : ''"
              @click="changePage(currentPage - 1)"
              :disabled="currentPage <= 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="join-item btn btn-sm">{{ currentPage }} / {{ totalPages }}</span>
            <button 
              class="join-item btn btn-sm" 
              :class="currentPage >= totalPages ? 'btn-disabled' : ''"
              @click="changePage(currentPage + 1)"
              :disabled="currentPage >= totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
  
          <!-- Items per page selector -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-base-content/70">Items per page</span>
            <select v-model="perPage" class="select select-bordered select-sm" @change="handlePerPageChange">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import Skeletor from '../../../../utils/skeletor/skeletor1.vue'
  const props = defineProps(['data', 'loading', 'error', 'totalItems', 'currentPage', 'totalPages', 'perPage'])
  const emit = defineEmits(['itemDelete', 'handleSearch', 'clearSearch', 'handlePerPageChange', 'changePage', 'bulkDelete'])
  
  const searchTerm = ref('')
  const perPage = ref(props.perPage)
  const selectedItems = ref([])

  // Computed properties for selection
  const isAllSelected = computed(() => {
    return props.data.length > 0 && selectedItems.value.length === props.data.length
  })

  // Check if an item is selected
  const isItemSelected = (item) => {
    return selectedItems.value.some(selectedItem => selectedItem.id === item.id)
  }

  // Toggle select all items
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedItems.value = []
    } else {
      selectedItems.value = [...props.data]
    }
  }

  // Toggle select individual item
  const toggleSelectItem = (item) => {
    if (isItemSelected(item)) {
      selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id)
    } else {
      selectedItems.value.push(item)
    }
  }

  // Bulk delete selected items
  const bulkDelete = () => {
    emit('bulkDelete', selectedItems.value)
    selectedItems.value = []
  }

  const clearSearch = () => {
    searchTerm.value = ''
    emit('clearSearch')
  }

  const handlePerPageChange = () => {
    emit('handlePerPageChange', perPage.value)
  }
  
  const changePage = (newPage) => {
    emit('changePage', newPage)
  }

  const itemDelete = (item) => {
    emit('itemDelete', item)
  }

  const handleSearch = () => {
    emit('handleSearch', searchTerm.value)
  }
  </script>
  
  