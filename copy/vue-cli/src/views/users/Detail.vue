<template>
  <div class="py-6 px-4 bg-base-200 dark:bg-neutral min-h-screen">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content dark:text-neutral-content">User Details</h1>
        <p class="text-base-content/70 dark:text-neutral-content/70 mt-1">View detailed information about the user</p>
      </div>
      <div class="mt-4 md:mt-0 flex space-x-2">
        <router-link :to="`/users/update/${route.params.id}`" class="btn btn-secondary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit User
        </router-link>
        <router-link to="/users/list" class="btn btn-outline btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to List
        </router-link>
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
    <div v-if="usersLoading" class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6">
      <div class="animate-pulse">
        <div class="h-32 bg-base-300 dark:bg-neutral-700 rounded-full w-32 mx-auto mb-6"></div>
        <div class="h-8 bg-base-300 dark:bg-neutral-700 rounded w-1/3 mx-auto mb-4"></div>
        <div class="h-4 bg-base-300 dark:bg-neutral-700 rounded mb-6 w-1/4 mx-auto"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div v-for="i in 4" :key="i" class="space-y-3">
            <div class="h-4 bg-base-300 dark:bg-neutral-700 rounded w-1/4"></div>
            <div class="h-8 bg-base-300 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- User details card -->
    <div v-else-if="usersData" class="card bg-base-100 dark:bg-neutral-800 shadow-xl overflow-hidden">
      <!-- Header with user avatar and basic info -->
      <div class="bg-gradient-to-r from-primary to-primary-focus p-8 text-center">
        <div class="avatar placeholder online">
          <div class="w-32 h-32 bg-base-100 rounded-full mx-auto mb-4 shadow-md flex items-center justify-center">
            <span class="text-4xl font-bold text-primary">{{ getUserInitials() }}</span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-primary-content mt-4">{{ usersData.name }} {{ usersData.userName }}</h2>
        <p class="text-primary-content opacity-80 mt-1">{{ usersData.email }}</p>
        <div class="mt-3">
          <span class="badge badge-lg badge-accent gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {{ usersData.role === 1 ? 'Administrator' : 'Regular User' }}
          </span>
        </div>
      </div>
      
      <!-- User details -->
      <div class="card-body p-6 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content">
        <div class="stats stats-vertical md:stats-horizontal shadow w-full bg-base-200 dark:bg-neutral-700">
          <div class="stat">
            <div class="stat-title">User ID</div>
            <div class="stat-value text-lg">{{ usersData.id }}</div>
          </div>
          
          <div class="stat">
            <div class="stat-title">Created At</div>
            <div class="stat-value text-lg">{{ formatDate(usersData.created_at || usersData.createdAt) }}</div>
          </div>
          
          <div class="stat">
            <div class="stat-title">Updated At</div>
            <div class="stat-value text-lg">{{ formatDate(usersData.updated_at || usersData.updatedAt) }}</div>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
              <h3 class="text-sm font-medium opacity-70">Full Name</h3>
              <p class="text-lg font-medium">{{ usersData.name }} - {{ usersData.userName }}</p>
            </div>
            
            <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
              <h3 class="text-sm font-medium opacity-70">Email</h3>
              <p class="text-lg font-medium overflow-hidden text-ellipsis">
                <a href="#" class="link link-primary">{{ usersData.email }}</a>
              </p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
              <h3 class="text-sm font-medium opacity-70">Role</h3>
              <div class="flex items-center space-x-2">
                <span class="badge badge-accent">
                  {{ usersData.role === 1 ? 'Administrator' : 'Regular User' }}
                </span>
                <p class="text-lg font-medium">{{ usersData.role === 1 ? 'Full system access' : 'Limited access' }}</p>
              </div>
            </div>
            
            <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
              <h3 class="text-sm font-medium opacity-70">Account Status</h3>
              <div class="flex items-center mt-1">
                <span class="inline-flex h-3 w-3 rounded-full bg-success mr-2"></span>
                <p class="text-lg font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="card-actions justify-end mt-8">
          <router-link :to="`/users/update/${usersData.id}`" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit User
          </router-link>
          <button @click="confirmDelete" class="btn btn-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete User
          </button>
        </div>
      </div>
    </div>
    
    <!-- No data found -->
    <div v-else class="card bg-base-100 dark:bg-neutral-800 shadow-xl p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-error mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium text-base-content dark:text-neutral-content mb-1">User not found</h3>
      <p class="text-base-content/70 dark:text-neutral-content/70 mb-4">The user you're looking for doesn't exist or has been deleted</p>
      <router-link to="/users/list" class="btn btn-primary mx-auto">
        Go to User List
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Alert from "../../utils/alert.js";

const route = useRoute();
const router = useRouter();

import useUsers from "../../compositions/useModelUsers";
const { loading: usersLoading, data: usersData, error: usersError, getItem: getUser, deleteItem: deleteUser } = useUsers();

// Fetch user data when component is mounted
getUser({ id: route.params.id });

// Format date to a readable format
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

// Get user initials for avatar
const getUserInitials = () => {
  if (!usersData.value || !usersData.value.name) return '?';
  return (usersData.value.name.charAt(0) + (usersData.value.userName ? usersData.value.userName.charAt(0) : '')).toUpperCase();
};

// Confirm user deletion
const confirmDelete = () => {
  Alert.showPrompt("Are you sure you want to delete this user? This action cannot be undone.").then((res) => {
    if (!res.isConfirmed) {
      notyfError("Deletion cancelled");
      return;
    }
    
    deleteUser({ id: usersData.value.id }).then(() => {
      notyfSuccess("User deleted successfully");
      router.push('/users/list');
    });
  });
};
</script>

