<template> 
  <div>
    <form class="w-full max-w-3xl mx-auto">
      <div class="alert alert-error shadow-lg my-4" v-if="contactsError">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mr-3 stroke-current">    
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
          </svg> 
          <span>{{contactsError}}</span>
        </div>
      </div>

      <div class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-medium text-base-content dark:text-neutral-content mb-6">Search Options</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name Search -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-base-content dark:text-neutral-content">Name</span>
            </label> 
            <input 
              type="text" 
              placeholder="Search by name" 
              v-model="contact_name" 
              class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
            >
          </div>

          <!-- Email Search -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-base-content dark:text-neutral-content">Email</span>
            </label> 
            <input 
              type="text"
              placeholder="Search by email" 
              v-model="contact_email" 
              class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
            >
          </div>
        </div>

        <!-- Subject Search -->
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text font-medium text-base-content dark:text-neutral-content">Subject</span>
          </label> 
          <input 
            type="text"
            placeholder="Search by subject" 
            v-model="contact_subject" 
            class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
          >
        </div>

        <!-- Status Selection -->
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text font-medium text-base-content dark:text-neutral-content">Status</span>
          </label> 
          <select 
            v-model="contact_status" 
            class="select select-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="processed">Processed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-base-content dark:text-neutral-content">From Date</span>
            </label> 
            <input 
              type="date" 
              v-model="from_date" 
              class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
            >
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-base-content dark:text-neutral-content">To Date</span>
            </label> 
            <input 
              type="date"
              v-model="to_date" 
              class="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content"
            >
          </div>
        </div>

        <!-- Submit and Reset buttons -->
        <div class="flex justify-end gap-2 mt-8">
          <button 
            type="button" 
            @click="resetForm" 
            class="btn btn-outline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          <button 
            type="button" 
            @click="search" 
            class="btn btn-primary gap-2" 
            :class="contactsLoading && 'loading btn-disabled'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!contactsLoading">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="hasSearched" class="mt-8 bg-base-100 dark:bg-neutral-800 rounded-lg shadow">
        <div class="p-4 border-b border-base-200 dark:border-neutral-700">
          <h2 class="text-xl font-medium text-base-content dark:text-neutral-content">Search Results</h2>
        </div>
        
        <div v-if="contactsLoading" class="p-8 text-center">
          <div class="loading loading-spinner loading-lg text-primary mx-auto"></div>
          <p class="mt-4 text-base-content/70 dark:text-neutral-content/70">Searching contacts...</p>
        </div>
        
        <div v-else-if="contactsData.list.length === 0" class="p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 dark:text-neutral-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg font-medium text-base-content dark:text-neutral-content">No results found</p>
          <p class="mt-1 text-base-content/70 dark:text-neutral-content/70">Try adjusting your search criteria</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="table w-full">
            <thead class="bg-base-100 dark:bg-neutral-800">
              <tr>
                <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">ID</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Name</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Subject</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Status</th>
                <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 dark:text-neutral-content/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-base-200 dark:divide-neutral-700">
              <tr v-for="item in contactsData.list" :key="item.id" class="hover:bg-base-200 dark:hover:bg-neutral-700">
                <td class="py-4 px-4">{{ item.id }}</td>
                <td class="py-4 px-4">
                  <div class="font-medium text-base-content dark:text-neutral-content">{{ item.contact_name }}</div>
                  <div class="text-sm text-base-content/70 dark:text-neutral-content/70">{{ item.contact_email }}</div>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>    
  </div>   
</template>

<script setup>
import { ref } from 'vue';
import useContacts from '../../../../compositions/useModelContacts';

const { contactsLoading, contactsData, contactsError, searchItems } = useContacts();

const contact_name = ref('');
const contact_email = ref('');
const contact_subject = ref('');
const contact_status = ref('');
const from_date = ref('');
const to_date = ref('');

const hasSearched = ref(false);

const search = () => {
  const searchParams = {};
  
  if (contact_name.value) searchParams.contact_name_like = contact_name.value;
  if (contact_email.value) searchParams.contact_email_like = contact_email.value;
  if (contact_subject.value) searchParams.contact_subject_like = contact_subject.value;
  if (contact_status.value) searchParams.contact_status = contact_status.value;
  
  // Add date range logic if needed
  if (from_date.value || to_date.value) {
    // Implementation would depend on how your API handles date filtering
  }
  
  searchItems(searchParams);
  hasSearched.value = true;
};

const resetForm = () => {
  contact_name.value = '';
  contact_email.value = '';
  contact_subject.value = '';
  contact_status.value = '';
  from_date.value = '';
  to_date.value = '';
  
  // Reset search results
  if (hasSearched.value) {
    searchItems({});
  }
};

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