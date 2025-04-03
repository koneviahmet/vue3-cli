<template>
  <div class="py-6 px-4 min-h-screen bg-base-200 dark:bg-neutral">
    
    <div class="text-2xl font-bold text-base-content dark:text-neutral-content mb-6">Contacts Dashboard</div>
    
    <div v-if="contactsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 dark:bg-neutral-700 rounded mb-4"></div>
        <div class="h-16 bg-base-300 dark:bg-neutral-700 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 dark:text-neutral-content/70 mb-2">Total Contacts</div>
        <div class="text-3xl font-bold text-primary">{{ totalContacts }}</div>
      </div>
      
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 dark:text-neutral-content/70 mb-2">New Messages</div>
        <div class="text-3xl font-bold text-secondary">{{ newContacts }}</div>
      </div>
      
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 dark:text-neutral-content/70 mb-2">Processed</div>
        <div class="text-3xl font-bold text-accent">{{ processedContacts }}</div>
      </div>
      
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 dark:text-neutral-content/70 mb-2">Completed</div>
        <div class="text-3xl font-bold text-info">{{ completedContacts }}</div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content dark:text-neutral-content mb-4">Recent Contacts</div>
        <div v-if="contactsLoading" class="animate-pulse">
          <div v-for="i in 5" :key="i" class="h-10 bg-base-300 dark:bg-neutral-700 rounded my-2"></div>
        </div>
        <div v-else>
          <div v-if="recentContacts.length === 0" class="text-center py-4 text-base-content/60 dark:text-neutral-content/60">
            No contacts found
          </div>
          <div v-else class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Subject</th>
                  <th class="text-left">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in recentContacts" :key="item.id" class="border-b border-base-300 dark:border-neutral-700">
                  <td class="py-2">{{ item.contact_name }}</td>
                  <td class="py-2 max-w-xs truncate">{{ item.contact_subject }}</td>
                  <td class="py-2">
                    <div class="badge" :class="getStatusBadgeClass(item.contact_status)">
                      {{item.contact_status}}
                    </div>
                  </td>
                  <td class="py-2 text-right">
                    <router-link :to="`/contacts/detail/${item.id}`" class="btn btn-sm btn-primary">View</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/contacts/list" class="text-primary hover:underline">View all contacts</router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-base-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content dark:text-neutral-content mb-4">Quick Actions</div>
        <div class="space-y-3">
          <router-link to="/contacts/create" class="btn btn-primary w-full flex items-center justify-between">
            <span>Create New Contact</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </router-link>
          
          <router-link to="/contacts/list" class="btn btn-secondary w-full flex items-center justify-between">
            <span>Manage Contacts</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </router-link>
          
          <router-link to="/contacts/search" class="btn btn-accent w-full flex items-center justify-between">
            <span>Search Contacts</span>
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
import { computed, ref, onMounted } from 'vue';
import Skeletor from "../../utils/skeletor/skeletor1.vue";
import useContacts from "../../compositions/useModelContacts";

const { contactsLoading, contactsData, contactsError, getItems } = useContacts();

// Fetch contact data when component mounts
onMounted(() => {
  getItems();
});

// Computed properties for dashboard stats
const totalContacts = computed(() => contactsData.list.length || 0);
const newContacts = computed(() => contactsData.list.filter(item => item.contact_status === 'new').length || 0);
const processedContacts = computed(() => contactsData.list.filter(item => item.contact_status === 'processed').length || 0);
const completedContacts = computed(() => contactsData.list.filter(item => item.contact_status === 'completed').length || 0);

// Get recent contacts (latest 5)
const recentContacts = computed(() => {
  return [...contactsData.list]
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 5);
});

// Helper function for status badge styling
const getStatusBadgeClass = (status) => {
  switch(status.toLowerCase()) {
    case 'new': return 'badge-secondary';
    case 'processed': return 'badge-accent';
    case 'completed': return 'badge-success';
    case 'cancelled': return 'badge-error';
    default: return 'badge-ghost';
  }
};
</script>


