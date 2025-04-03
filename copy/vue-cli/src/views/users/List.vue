<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content">User Management</h1>
        <p class="text-base-content/70 mt-1">View and manage all users in the system</p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/users/signIn" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New User
        </router-link>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="bg-base-100 p-4 rounded-lg shadow mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by name or email" 
            class="input input-bordered w-full"
            @input="applyFilters"
          />
        </div>
        <div class="flex gap-2">
          <select 
            v-model="roleFilter" 
            class="select select-bordered" 
            @change="applyFilters"
          >
            <option value="">All Roles</option>
            <option value="1">Admin</option>
            <option value="2">Regular User</option>
          </select>
          <button 
            class="btn btn-outline" 
            @click="resetFilters"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Error alert -->
    <div class="alert alert-error mb-6" v-if="usersError">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ usersError }}</span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="usersLoading" class="bg-base-100 rounded-lg shadow">
      <Skeletor :length="8" />
    </div>

    <!-- Data table -->
    <div v-else class="bg-base-100 rounded-lg shadow">
      <div v-if="filteredUsers.length === 0" class="p-8 text-center text-base-content/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">No users found</p>
        <p class="mt-1">Try adjusting your search or filter criteria</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="table w-full">
          <thead class="bg-base-100">
            <tr>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">ID</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">User Details</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Email</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Role</th>
              <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-base-200">
              <td class="py-4 px-4">{{ user.id }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-base-200 rounded-full flex items-center justify-center">
                    <span class="text-base-content font-medium">{{ getUserInitials(user) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-base-content">{{ user.name }} - {{ user.userName }}</div>
                    <div class="text-sm text-base-content/70">Added: {{ formatDate(user.created_at || user.createdAt) }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-base-content/70">{{ user.email }}</td>
              <td class="py-4 px-4">
                <span :class="`px-2 py-1 text-xs rounded-full ${user.role === 1 ? 'bg-primary text-primary-content' : 'bg-secondary text-secondary-content'}`">
                  {{ user.role === 1 ? 'Admin' : 'User' }}
                </span>
              </td>
              <td class="py-4 px-4 text-right space-x-1">
                <router-link :to="`/users/detail/${user.id}`" class="btn btn-sm btn-primary">
                  View
                </router-link>
                <router-link :to="`/users/update/${user.id}`" class="btn btn-sm btn-secondary">
                  Edit
                </router-link>
                <button @click="userDelete(user.id)" class="btn btn-sm btn-error" :class="usersLoading && 'loading btn-disabled'">
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
          Showing <span class="font-medium">{{ filteredUsers.length }}</span> users out of <span class="font-medium">{{ usersData.length }}</span> total
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Skeletor from "../../utils/skeletor/skeletor1.vue";
import useUsers from "../../compositions/useModelUsers";
import Alert from "../../utils/alert.js";

const { loading: usersLoading, data: usersData, error: usersError, getItems: getUsers, deleteItem: deleteUser } = useUsers();

onMounted(() => getUsers());

// Filters
const searchQuery = ref("");
const roleFilter = ref("");

const resetFilters = () => {
  searchQuery.value = "";
  roleFilter.value = "";
  applyFilters();
};

const applyFilters = () => {
  // This function is triggered by input events
  // Actual filtering is done in the computed property
};

const filteredUsers = computed(() => {
  if (!usersData.value) return [];
  
  return usersData.value.filter(user => {
    // Apply search query filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      const nameMatch = (user.name + " " + user.userName).toLowerCase().includes(query);
      const emailMatch = user.email.toLowerCase().includes(query);
      if (!nameMatch && !emailMatch) return false;
    }
    
    // Apply role filter
    if (roleFilter.value && user.role !== parseInt(roleFilter.value)) {
      return false;
    }
    
    return true;
  });
});

const userDelete = (id) => {
  Alert.showPrompt("Are you sure you want to delete this user?").then((res) => {
    if (!res.isConfirmed) {
      notyfError("Deletion cancelled");
      return;
    }
    
    deleteUser({ id }).then(() => {
      notyfSuccess("User deleted successfully");
    });
  });
};

// Helper functions
const getUserInitials = (user) => {
  if (!user.name) return '?';
  return (user.name.charAt(0) + (user.userName ? user.userName.charAt(0) : '')).toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
</script>

