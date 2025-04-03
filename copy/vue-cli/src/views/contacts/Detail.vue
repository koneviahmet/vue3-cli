<template>
  <div class="py-6 px-4 bg-base-200 dark:bg-neutral min-h-screen">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content dark:text-neutral-content">Contact Details</h1>
        <p class="text-base-content/70 dark:text-neutral-content/70 mt-1">View detailed information about the contact</p>
      </div>
      <div class="mt-4 md:mt-0 flex space-x-2">
        <router-link :to="`/contacts/update/${route.params.id}`" class="btn btn-secondary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Contact
        </router-link>
        <router-link to="/contacts/list" class="btn btn-outline btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to List
        </router-link>
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
    <div v-if="contactsLoading" class="bg-base-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6">
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

    <!-- Contact details card -->
    <div v-else-if="selectData" class="card bg-base-100 dark:bg-neutral-800 shadow-xl overflow-hidden">
      <!-- Header with contact avatar and basic info -->
      <div class="bg-gradient-to-r from-primary to-primary-focus p-8 text-center">
        <div class="avatar placeholder">
          <div class="w-32 h-32 bg-base-100 rounded-full mx-auto mb-4 shadow-md flex items-center justify-center">
            <span class="text-4xl font-bold text-primary">{{ getContactInitials() }}</span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-primary-content mt-4">{{ selectData.contact_name }}</h2>
        <p class="text-primary-content opacity-80 mt-1">{{ selectData.contact_email }}</p>
        <div class="mt-3">
          <span class="badge badge-lg gap-2" :class="getStatusBadgeClass(selectData.contact_status)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {{ selectData.contact_status }}
          </span>
        </div>
      </div>
      
      <!-- Contact details -->
      <div class="card-body p-6 bg-base-100 dark:bg-neutral-800 text-base-content dark:text-neutral-content">
        <div class="stats stats-vertical md:stats-horizontal shadow w-full bg-base-200 dark:bg-neutral-700">
          <div class="stat">
            <div class="stat-title">Contact ID</div>
            <div class="stat-value text-lg">{{ selectData.id }}</div>
          </div>
          
          <div class="stat">
            <div class="stat-title">Created At</div>
            <div class="stat-value text-lg">{{ formatDate(selectData.created) }}</div>
          </div>
          
          <div class="stat" v-if="selectData.updated">
            <div class="stat-title">Updated At</div>
            <div class="stat-value text-lg">{{ formatDate(selectData.updated) }}</div>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="grid grid-cols-1 gap-6">
          <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
            <h3 class="text-sm font-medium opacity-70">Subject</h3>
            <p class="text-lg font-medium">{{ selectData.contact_subject }}</p>
          </div>
          
          <div class="card bg-base-200 dark:bg-neutral-700 shadow-sm p-4">
            <h3 class="text-sm font-medium opacity-70">Message</h3>
            <p class="text-lg whitespace-pre-wrap mt-2">{{ selectData.contact_message }}</p>
          </div>
          
          <!-- Action buttons for status change -->
          <div class="flex flex-wrap gap-2 mt-2">
            <button 
              class="btn btn-outline btn-accent" 
              v-if="selectData.contact_status === 'new'"
              @click="updateStatus('processed')"
              :disabled="contactsLoading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mark as Processed
            </button>
            
            <button 
              class="btn btn-outline btn-success" 
              v-if="selectData.contact_status === 'processed'"
              @click="updateStatus('completed')"
              :disabled="contactsLoading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark as Completed
            </button>
            
            <button 
              class="btn btn-outline btn-error" 
              v-if="selectData.contact_status === 'new' || selectData.contact_status === 'processed'"
              @click="updateStatus('cancelled')"
              :disabled="contactsLoading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Contact Request
            </button>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="card-actions justify-end mt-8">
          <router-link :to="`/contacts/update/${selectData.id}`" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Contact
          </router-link>
          <button @click="confirmDeleteContact" class="btn btn-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Contact
          </button>
        </div>
      </div>
    </div>
    
    <!-- No data found -->
    <div v-else class="card bg-base-100 dark:bg-neutral-800 shadow-xl p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-error mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium text-base-content dark:text-neutral-content mb-1">Contact not found</h3>
      <p class="text-base-content/70 dark:text-neutral-content/70 mb-4">The contact you're looking for doesn't exist or has been deleted</p>
      <router-link to="/contacts/list" class="btn btn-primary mx-auto">
        Go to Contact List
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Alert from "../../utils/alert.js";

const route = useRoute();
const router = useRouter();
const selectData = ref(null);

import useContacts from "../../compositions/useModelContacts";
const { contactsLoading, contactsData, contactsError, getItem, updateItem, confirmDelete } = useContacts();

// Fetch contact details when component mounts
onMounted(() => {
  loadContactDetails();
});

const loadContactDetails = async () => {
  try {
    const response = await getItem({ id: route.params.id });
    selectData.value = response;
  } catch (error) {
    console.error(error);
  }
};

// Get contact initials for avatar
const getContactInitials = () => {
  if (!selectData.value || !selectData.value.contact_name) return '?';
  const nameParts = selectData.value.contact_name.split(' ');
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};

// Status badge styling
const getStatusBadgeClass = (status) => {
  switch(status.toLowerCase()) {
    case 'new': return 'badge-secondary';
    case 'processed': return 'badge-accent';
    case 'completed': return 'badge-success';
    case 'cancelled': return 'badge-error';
    default: return 'badge-ghost';
  }
};

// Format date for better display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Update contact status
const updateStatus = async (newStatus) => {
  if (!selectData.value) return;
  
  try {
    const updatedContact = {
      ...selectData.value,
      contact_status: newStatus,
      updated: new Date().toISOString()
    };
    
    await updateItem(updatedContact);
    selectData.value = updatedContact;
    notyfSuccess(`Contact marked as ${newStatus}!`);
  } catch (error) {
    notyfError("Failed to update contact status");
    console.error(error);
  }
};

// Delete contact
const confirmDeleteContact = () => {
  if (!selectData.value) return;
  
  Alert.showPrompt("Are you sure you want to delete this contact? This action cannot be undone.").then((res) => {
    if (!res.isConfirmed) {
      notyfError("Deletion cancelled");
      return;
    }
    
    confirmDelete(selectData.value).then(() => {
      notyfSuccess("Contact deleted successfully");
      router.push('/contacts/list');
    });
  });
};
</script>

