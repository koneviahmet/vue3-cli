<template>
  <div class="py-6 px-4 min-h-screen">
    
    <div class="text-2xl font-bold text-base-content mb-6">User Dashboard</div>
    
    <div v-if="usersLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 p-4 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-16 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Total Users</div>
        <div class="text-3xl font-bold text-primary">{{ usersData.length }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Admin Users</div>
        <div class="text-3xl font-bold text-secondary">{{ adminUsers }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Regular Users</div>
        <div class="text-3xl font-bold text-accent">{{ regularUsers }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">New This Month</div>
        <div class="text-3xl font-bold text-info">{{ newUsers }}</div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Recent Users</div>
        <div v-if="usersLoading" class="animate-pulse">
          <div v-for="i in 5" :key="i" class="h-10 bg-base-300 rounded my-2"></div>
        </div>
        <div v-else>
          <div v-if="recentUsers.length === 0" class="text-center py-4 text-base-content/60">
            No users found
          </div>
          <div v-else class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in recentUsers" :key="user.id" class="border-b border-base-300">
                  <td class="py-2">{{ user.name }} {{ user?.userName }}</td>
                  <td class="py-2">{{ user.email }}</td>
                  <td class="py-2 text-right">
                    <router-link :to="`/users/detail/${user.id}`" class="btn btn-sm btn-primary">View</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/users/list" class="text-primary hover:underline">View all users</router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Quick Actions</div>
        <div class="space-y-3">
          <router-link to="/users/signIn" class="btn btn-primary w-full flex items-center justify-between">
            <span>Create New User</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </router-link>
          
          <router-link to="/users/list" class="btn btn-secondary w-full flex items-center justify-between">
            <span>Manage Users</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </router-link>
          
          <router-link to="/users/search" class="btn btn-accent w-full flex items-center justify-between">
            <span>Search Users</span>
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
import { ref, computed, onMounted } from 'vue';
import useUsers from "../../compositions/useModelUsers";

const { loading: usersLoading, data: usersData, error: usersError, getItems: getUsers } = useUsers();

onMounted(() => {
  getUsers();
});

// Calculate stats from user data
const adminUsers = computed(() => {
  if (!usersData.value) return 0;
  return usersData.value.filter(user => user.role === 1).length;
});

const regularUsers = computed(() => {
  if (!usersData.value) return 0;
  return usersData.value.filter(user => user.role === 2).length;
});

const newUsers = computed(() => {
  if (!usersData.value) return 0;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return usersData.value.filter(user => {
    const createdDate = new Date(user.created_at || user.createdAt);
    return createdDate >= monthStart;
  }).length;
});

const recentUsers = computed(() => {
  if (!usersData.value) return [];
  return [...usersData.value]
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

