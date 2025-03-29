<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center"
        :style="{ backgroundColor: event.color + '20' }">
        <h3 class="text-lg font-medium text-gray-800">Event Details</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-semibold text-gray-800">{{ event.title }}</h2>
            <span 
              class="text-xs px-2 py-1 rounded-full" 
              :style="{ backgroundColor: event.color + '20', color: event.color }"
            >
              {{ event.type === 'task' ? 'Task' : 'Kanban Task' }}
            </span>
          </div>
          
          <div class="flex items-center text-sm text-gray-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(event.start) }}
          </div>
          
          <div v-if="event.description" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p class="text-sm text-gray-600">{{ event.description }}</p>
          </div>
          
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Priority</h4>
            <div class="flex items-center">
              <span 
                class="inline-block w-3 h-3 rounded-full mr-2"
                :style="{ backgroundColor: event.color }"
              ></span>
              <span class="text-sm capitalize">{{ event.priority }}</span>
            </div>
          </div>
          
          <div v-if="event.tags && event.tags.length" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Tags</h4>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="tag in event.tags" 
                :key="tag"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div v-if="event.type === 'task' && event.originalData" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Status</h4>
            <span 
              class="text-xs px-2 py-1 rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': event.originalData.status === 'pending',
                'bg-green-100 text-green-800': event.originalData.status === 'completed',
                'bg-blue-100 text-blue-800': event.originalData.status === 'in-progress'
              }"
            >
              {{ event.originalData.status || 'Pending' }}
            </span>
          </div>
          
          <div v-if="event.type === 'kanban' && event.originalData" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Board Status</h4>
            <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {{ getColumnName(event.originalData.columnId) }}
            </span>
          </div>
        </div>
        
        <div class="flex justify-end pt-4 border-t border-gray-100">
          <button
            @click="$emit('edit', event)"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

defineEmits(['close', 'edit']);

const formatDate = (date) => {
  const eventDate = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return eventDate.toLocaleDateString(undefined, options);
};

const getColumnName = (columnId) => {
  const columns = {
    1: 'To Do',
    2: 'In Progress',
    3: 'Done'
  };
  
  return columns[columnId] || 'Unknown';
};
</script> 