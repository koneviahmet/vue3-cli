<template>
  <div class="task-detail p-4">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-2xl font-bold">{{ task.title }}</h2>
        <div class="badge badge-lg mt-2" :class="priorityClass(task.priority)">
          {{ task.priority }}
        </div>
      </div>
      
      <div class="flex gap-2">
        <button @click="$emit('edit')" class="btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button @click="$emit('delete')" class="btn btn-sm btn-error text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-gray-700 whitespace-pre-line">{{ task.description || 'No description provided' }}</p>
        </div>
        
        <div class="mb-6" v-if="task.tags && task.tags.length > 0">
          <h3 class="text-lg font-semibold mb-2">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <div v-for="(tag, index) in task.tags" :key="index" class="badge badge-primary">{{ tag }}</div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Due Date</h3>
          <div :class="dueDateClass(task.dueDate)">
            {{ task.dueDate ? formatDate(task.dueDate) : 'No due date set' }}
            <span v-if="isOverdue(task.dueDate)" class="text-error ml-2">(Overdue)</span>
          </div>
        </div>
      </div>
      
      <div>
        <div class="mb-6" v-if="task.checklist && task.checklist.length > 0">
          <h3 class="text-lg font-semibold mb-2">Checklist ({{ completedItems }}/{{ task.checklist.length }})</h3>
          <progress 
            class="progress progress-primary w-full mb-3" 
            :value="completedItems" 
            :max="task.checklist.length"
          ></progress>
          
          <div class="space-y-2">
            <div 
              v-for="(item, index) in task.checklist" 
              :key="item.id"
              class="flex items-center gap-2 p-2 bg-base-200 rounded"
            >
              <input 
                type="checkbox" 
                class="checkbox checkbox-sm" 
                v-model="item.completed"
                @change="updateChecklistItem(index)"
              />
              <span :class="{'line-through opacity-70': item.completed}">{{ item.text }}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Assigned To</h3>
          <div>{{ assignedusername }}</div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Activity</h3>
          <div class="bg-base-200 p-3 rounded-lg space-y-2">
            <div class="text-sm">
              <span class="font-medium">Created:</span> {{ formatDateTime(task.created_at) }}
            </div>
            <div class="text-sm">
              <span class="font-medium">Last updated:</span> {{ formatDateTime(task.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  users: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['edit', 'delete', 'update']);

const priorityClass = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'badge-error';
    case 'medium':
      return 'badge-warning';
    case 'low':
      return 'badge-info';
    default:
      return 'badge-ghost';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'Not set';
  
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const dueDateClass = (dateString) => {
  if (!dateString) return 'text-gray-500';
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'text-error font-bold';
  if (diffDays === 0) return 'text-warning font-bold';
  if (diffDays <= 2) return 'text-warning';
  return 'text-gray-700';
};

const isOverdue = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
};

const completedItems = computed(() => {
  if (!props.task.checklist) return 0;
  return props.task.checklist.filter(item => item.completed).length;
});

const assignedusername = computed(() => {
  if (!props.task.assignedTo) return 'Unassigned';

  const user = props.users.find(u => u.id === props.task.assignedTo);
  return user ? `${user.name} - ${user?.username}` : `User #${props.task.assignedTo}`;
});

const updateChecklistItem = (index) => {
  emit('update', {
    ...props.task,
    updated_at: new Date().toISOString()
  });
};
</script> 