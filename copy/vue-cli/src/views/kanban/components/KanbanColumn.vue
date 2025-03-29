<template>
  <div class="kanban-column bg-base-200 rounded-lg w-80 flex flex-col max-h-full">
    <div class="column-header p-3 flex justify-between items-center border-b border-base-300">
      <h3 class="text-lg font-bold">{{ column.title }}</h3>
      <div class="flex gap-2">
        <button @click="$emit('edit-column', column)" class="btn btn-ghost btn-sm btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="$emit('delete-column', column)" class="btn btn-ghost btn-sm btn-square text-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button @click="$emit('add-task', column.id)" class="btn btn-ghost btn-sm btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
    
    <div 
      class="column-content flex-1 overflow-y-auto p-2 space-y-2"
      @dragover.prevent
      @drop="onDrop"
    >
      <div v-if="tasks.length === 0" class="text-center p-4 text-gray-500 italic">
        No tasks yet
      </div>
      
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="task-card bg-base-100 p-3 rounded-lg shadow-sm cursor-pointer border border-base-300 hover:shadow-md transition-shadow"
        draggable="true"
        @dragstart="onDragStart($event, task)"
        @click="$emit('view-task', task)"
      >
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-medium">{{ task.title }}</h4>
          <div class="badge" :class="priorityClass(task.priority)">{{ task.priority }}</div>
        </div>
        
        <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ task.description }}</p>
        
        <div class="flex justify-between items-center mt-2">
          <div class="flex gap-1">
            <span v-for="(tag, index) in task.tags" :key="index" class="badge badge-sm">{{ tag }}</span>
          </div>
          
          <div v-if="task.dueDate" class="text-xs" :class="dueDateClass(task.dueDate)">
            {{ formatDate(task.dueDate) }}
          </div>
        </div>
        
        <div v-if="task.checklist && task.checklist.length > 0" class="mt-2 pt-2 border-t border-base-300">
          <div class="text-xs text-gray-600">
            {{ completedItems(task.checklist) }}/{{ task.checklist.length }} completed
          </div>
          <progress 
            class="progress progress-primary w-full mt-1" 
            :value="completedItems(task.checklist)" 
            :max="task.checklist.length"
          ></progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['add-task', 'edit-column', 'view-task', 'move-task', 'delete-column']);

const onDragStart = (event, task) => {
  event.dataTransfer.setData('task', JSON.stringify(task));
};

const onDrop = (event) => {
  const taskData = event.dataTransfer.getData('task');
  if (taskData) {
    const task = JSON.parse(taskData);
    if (task.columnId !== props.column.id) {
      emit('move-task', task.id, props.column.id);
    }
  }
};

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
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const dueDateClass = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'text-error';
  if (diffDays === 0) return 'text-warning';
  if (diffDays <= 2) return 'text-warning';
  return 'text-gray-500';
};

const completedItems = (checklist) => {
  if (!checklist) return 0;
  return checklist.filter(item => item.completed).length;
};
</script>

<style scoped>
.kanban-column {
  min-height: calc(100vh - 200px);
}

.column-content {
  max-height: calc(100vh - 250px);
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style> 