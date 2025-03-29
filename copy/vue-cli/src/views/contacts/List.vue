<template>
  <div class="py-6 px-4 min-h-screen bg-base-200 dark:bg-neutral">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content dark:text-neutral-content">Contact Management</h1>
        <p class="text-base-content/70 dark:text-neutral-content/70 mt-1">View and manage all contacts in the system</p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/contacts/create" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Contact
        </router-link>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 dark:bg-neutral-800 p-4 rounded-lg shadow mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <input 
            type="text" 
            placeholder="Search contacts..." 
            class="input input-bordered w-full"
            @input="setFilter('all')"
          />
        </div>
        <div class="flex gap-2">
          <button 
            class="btn" 
            :class="activeFilter === 'all' ? 'btn-primary' : 'btn-outline'" 
            @click="setFilter('all')"
          >
            All
          </button>
          <button 
            class="btn" 
            :class="activeFilter === 'new' ? 'btn-secondary' : 'btn-outline'" 
            @click="setFilter('new')"
          >
            New
          </button>
          <button 
            class="btn" 
            :class="activeFilter === 'processed' ? 'btn-accent' : 'btn-outline'" 
            @click="setFilter('processed')"
          >
            Processed
          </button>
          <button 
            class="btn" 
            :class="activeFilter === 'completed' ? 'btn-success' : 'btn-outline'" 
            @click="setFilter('completed')"
          >
            Completed
          </button>
        </div>
      </div>
    </div>

    <!-- Error alert -->
    <div class="alert alert-error mb-6" v-if="contactsError">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ contactsError }}</span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="contactsLoading" class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow">
      <Skeletor :length="8" />
    </div>

    <!-- Data table -->
    <div v-else class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow">
      <div v-if="filteredContacts.length === 0" class="p-8 text-center text-base-content/60 dark:text-neutral-content/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 dark:text-neutral-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">No contacts found</p>
        <p class="mt-1">Try adjusting your filter criteria</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="table w-full">
          <thead class="bg-base-100 dark:bg-neutral-800">
            <tr>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">ID</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Contact Details</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Subject</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Status</th>
              <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200 dark:divide-neutral-700">
            <tr v-for="item in filteredContacts" :key="item.id" class="hover:bg-base-200 dark:hover:bg-neutral-700">
              <td class="py-4 px-4">{{ item.id }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-base-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <span class="text-base-content dark:text-neutral-content font-medium">{{ getContactInitials(item) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-base-content dark:text-neutral-content">{{ item.contact_name }}</div>
                    <div class="text-sm text-base-content/70 dark:text-neutral-content/70">{{ item.contact_email }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="max-w-xs truncate">{{ item.contact_subject }}</div>
              </td>
              <td class="py-4 px-4">
                <div class="badge" :class="getStatusBadgeClass(item.contact_status)">
                  {{ item.contact_status }}
                </div>
              </td>
              <td class="py-4 px-4 text-right space-x-1">
                <router-link :to="`/contacts/detail/${item.id}`" class="btn btn-sm btn-primary">
                  View
                </router-link>
                <router-link :to="`/contacts/update/${item.id}`" class="btn btn-sm btn-secondary">
                  Edit
                </router-link>
                <button @click="itemDelete(item)" class="btn btn-sm btn-error" :class="contactsLoading && 'loading btn-disabled'">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="border-t border-base-200 dark:border-neutral-700 p-4 flex items-center justify-between">
        <div class="text-sm text-base-content/70 dark:text-neutral-content/70">
          Showing <span class="font-medium">{{ filteredContacts.length }}</span> contacts out of <span class="font-medium">{{ contactsData.list.length }}</span> total
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Skeletor from "../../utils/skeletor/skeletor1.vue";

import useContacts from "../../compositions/useModelContacts";
const { contactsLoading, contactsData, contactsError, getItems, confirmDelete } = useContacts();

// Fetch data on component mount
onMounted(() => {
  getItems();
});

// Filter
const activeFilter = ref('all');

const setFilter = (filter) => {
  activeFilter.value = filter;
}

const filteredContacts = computed(() => {
  if (activeFilter.value === 'all') {
    return contactsData.list;
  }
  return contactsData.list.filter(item => item.contact_status === activeFilter.value);
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

// Get contact initials for avatar
const getContactInitials = (contact) => {
  if (!contact.contact_name) return '?';
  const nameParts = contact.contact_name.split(' ');
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};

// Format date for better display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const itemDelete = (item) => {
  confirmDelete(item);
};
</script>

