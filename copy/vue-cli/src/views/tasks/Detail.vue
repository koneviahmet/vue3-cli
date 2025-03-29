<template>
  <div class="py-6 px-4 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <div class="flex items-center">
          <router-link to="/tasks" class="text-primary mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <h1 class="text-2xl font-bold text-base-content">Task Details</h1>
        </div>
        <p v-if="task" class="text-base-content/70 mt-1">Viewing details for task #{{ taskId }}</p>
      </div>
      <div class="mt-4 md:mt-0 flex flex-wrap gap-2" v-if="task">
        <router-link :to="`/tasks/update/${taskId}`" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Task
        </router-link>
        <button @click="confirmTaskDelete(task)" class="btn btn-error" v-if="task && !tasksLoading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Delete Task
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="tasksLoading || isUpdating" class="bg-base-100 p-6 rounded-lg shadow">
      <div class="animate-pulse">
        <div class="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-base-300 rounded w-1/2 mb-6"></div>
        <div class="space-y-3">
          <div class="h-4 bg-base-300 rounded"></div>
          <div class="h-4 bg-base-300 rounded w-5/6"></div>
          <div class="h-4 bg-base-300 rounded w-4/6"></div>
        </div>
        <div class="h-32 bg-base-300 rounded mt-6"></div>
        <div class="h-24 bg-base-300 rounded mt-6"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="tasksError || updateError" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ tasksError || updateError }}</span>
    </div>

    <!-- Task not found -->
    <div v-else-if="!task" class="bg-base-100 p-8 rounded-lg shadow text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-lg font-medium">Task not found</p>
      <p class="mt-1 text-base-content/70">The task you are looking for does not exist or has been deleted.</p>
      <router-link to="/tasks" class="btn btn-primary mt-4">Go to Tasks Dashboard</router-link>
    </div>

    <!-- Task details -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column - Main task details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title and status -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-xl font-bold">{{ task.title }}</h2>
            <div class="flex gap-2 mt-3 sm:mt-0">
              <span :class="`badge ${getStatusBadge(task.status)}`">{{ formatStatus(task.status) }}</span>
              <span :class="`badge ${getPriorityBadge(task.priority)}`">{{ task.priority }}</span>
            </div>
          </div>
          <p class="mt-4 text-base-content/80 whitespace-pre-line">{{ task.description }}</p>
          
          <div class="flex flex-wrap gap-1 mt-4">
            <span v-for="(tag, index) in task.tags" :key="index" 
              class="badge badge-sm" :class="getTagColor(index)">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Checklist -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Task Checklist</h3>
            <div class="flex gap-2" v-if="isChecklistEdited">
              <button @click="saveChecklist" class="btn btn-primary btn-sm" :disabled="isUpdating">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Save Changes
              </button>
              <button @click="resetChecklist" class="btn btn-ghost btn-sm">
                Cancel
              </button>
            </div>
            <button v-else @click="addChecklistItem" class="btn btn-sm btn-primary btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Item
            </button>
          </div>
          <div v-if="!editedChecklist || editedChecklist.length === 0" 
            class="text-center py-6 text-base-content/60">
            No checklist items
          </div>
          <div v-else class="space-y-3">
            <div v-for="(item, index) in editedChecklist" :key="item.id"
              class="flex items-start p-3 border border-base-300 rounded-lg"
              :class="{'bg-base-200/50': item.completed}">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input type="checkbox" v-model="item.completed" class="checkbox checkbox-primary" @change="saveChecklistOnCheckboxChange(item)" />
                </label>
              </div>
              <div class="ml-2 flex-1">
                <input 
                  v-model="item.text" 
                  type="text" 
                  class="input input-bordered input-sm w-full bg-transparent" 
                  :class="{'line-through opacity-70': item.completed}"
                  @input="onChecklistChange"
                />
              </div>
              <button 
                @click="removeChecklistItem(index)" 
                class="btn btn-sm btn-ghost text-error ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Notes</h3>
          <div v-if="!task.notes" class="text-center py-6 text-base-content/60">
            No notes for this task
          </div>
          <p v-else class="whitespace-pre-line text-base-content/80">{{ task.notes }}</p>
        </div>
      </div>
      
      <!-- Right column - Task metadata -->
      <div class="space-y-6">
        <!-- Task metadata -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Task Information</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-base-content/70">Due Date</p>
              <p class="font-medium" :class="isOverdue(task.due_date) ? 'text-error' : ''">
                {{ formatDate(task.due_date) }}
                <span v-if="isOverdue(task.due_date)" class="text-sm ml-2 text-error">(Overdue)</span>
              </p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Created</p>
              <p class="font-medium">{{ formatDateTime(task.created_at) }}</p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Last Updated</p>
              <p class="font-medium">{{ formatDateTime(task.updated_at) }}</p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Status</p>
              <p class="font-medium">{{ formatStatus(task.status) }}</p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Priority</p>
              <p class="font-medium capitalize">{{ task.priority }}</p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Assigned To</p>
              <p class="font-medium">{{ getAssignedUserName(task.assigned_to) }}</p>
            </div>
            
            <div>
              <p class="text-sm text-base-content/70">Completion</p>
              <div class="flex items-center mt-1">
                <progress class="progress progress-primary w-full" 
                  :value="getCompletionPercentage(task)" max="100"></progress>
                <span class="ml-2 text-sm font-medium">{{ getCompletionPercentage(task) }}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quick actions -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              @click="completeTask" 
              class="btn btn-success w-full flex items-center justify-center gap-2"
              :disabled="isUpdating || (task && task.status === 'completed')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ (task && task.status === 'completed') ? 'Task Completed' : 'Complete Task' }}
            </button>
            <router-link :to="`/tasks/update/${taskId}`" class="btn btn-primary w-full">Edit Task</router-link>
            <router-link to="/tasks/list" class="btn btn-secondary w-full">View All Tasks</router-link>
            <router-link to="/tasks/create" class="btn btn-accent w-full">Create New Task</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useModelTasks from "../../compositions/useModelTasks";
import { notyfSuccess, notyfError } from "../../utils/notyf.js";

const route = useRoute();
const router = useRouter();
const taskId = parseInt(route.params.id);

const { loading: tasksLoading, error: tasksError, getItem, updateItem, confirmDelete } = useModelTasks();
const task = ref(null);
const editedChecklist = ref([]);
const isChecklistEdited = ref(false);
const isUpdating = ref(false);
const updateError = ref(null);

onMounted(async () => {
  if (taskId) {
    try {
      task.value = await getItem({ id: taskId });
      // Create a deep copy of the checklist array
      editedChecklist.value = task.value.checklist ? JSON.parse(JSON.stringify(task.value.checklist)) : [];
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  }
});

// Confirm task deletion and redirect after success
const confirmTaskDelete = (taskObj) => {
  confirmDelete(taskObj).then(() => {
    notyfSuccess("Task deleted successfully");
    router.push('/tasks');
  });
};

// Checklist functions
const onChecklistChange = () => {
  isChecklistEdited.value = true;
};

const saveChecklistOnCheckboxChange = async (changedItem) => {
  try {
    isUpdating.value = true;
    updateError.value = null;
    
    // Update the task with the current checklist state
    const updatedTask = {
      ...task.value,
      checklist: [...editedChecklist.value],
      updated_at: new Date().toISOString()
    };
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    notyfSuccess("Checklist item updated");
  } catch (error) {
    console.error("Error updating checklist:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while updating the checklist";
    notyfError(updateError.value);
    
    // Revert the checkbox if save failed
    changedItem.completed = !changedItem.completed;
  } finally {
    isUpdating.value = false;
  }
};

const addChecklistItem = () => {
  editedChecklist.value.push({
    id: Date.now(), // Generate a unique ID
    text: "",
    completed: false
  });
  isChecklistEdited.value = true;
};

const removeChecklistItem = (index) => {
  editedChecklist.value.splice(index, 1);
  isChecklistEdited.value = true;
};

const saveChecklist = async () => {
  try {
    isUpdating.value = true;
    updateError.value = null;
    
    // Clean up empty checklist items
    const cleanedChecklist = editedChecklist.value.filter(item => item.text.trim());
    
    // Update the task with the new checklist
    const updatedTask = {
      ...task.value,
      checklist: cleanedChecklist,
      updated_at: new Date().toISOString()
    };
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    isChecklistEdited.value = false;
    notyfSuccess("Checklist updated successfully");
  } catch (error) {
    console.error("Error updating checklist:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while updating the checklist";
    notyfError(updateError.value);
  } finally {
    isUpdating.value = false;
  }
};

const resetChecklist = () => {
  // Reset to original checklist
  editedChecklist.value = task.value.checklist ? JSON.parse(JSON.stringify(task.value.checklist)) : [];
  isChecklistEdited.value = false;
};

// Complete task function
const completeTask = async () => {
  try {
    isUpdating.value = true;
    updateError.value = null;
    
    // Update the task with completed status
    const updatedTask = {
      ...task.value,
      status: 'completed',
      completed: true,
      updated_at: new Date().toISOString()
    };
    
    // Also mark all checklist items as completed
    if (updatedTask.checklist && updatedTask.checklist.length > 0) {
      updatedTask.checklist = updatedTask.checklist.map(item => ({
        ...item,
        completed: true
      }));
      // Update the edited checklist as well
      editedChecklist.value = JSON.parse(JSON.stringify(updatedTask.checklist));
    }
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    notyfSuccess("Task marked as completed!");
  } catch (error) {
    console.error("Error completing task:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while completing the task";
    notyfError(updateError.value);
  } finally {
    isUpdating.value = false;
  }
};

// Helper functions
const getStatusBadge = (status) => {
  switch (status) {
    case 'completed': return 'badge-success';
    case 'in-progress': return 'badge-warning';
    case 'pending': return 'badge-error';
    default: return 'badge-info';
  }
};

const getPriorityBadge = (priority) => {
  switch (priority) {
    case 'high': return 'badge-error';
    case 'medium': return 'badge-warning';
    case 'low': return 'badge-info';
    default: return 'badge-ghost';
  }
};

const formatStatus = (status) => {
  if (!status) return 'Unknown';
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatDateTime = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const isOverdue = (dateString) => {
  if (!dateString) return false;
  const dueDate = new Date(dateString);
  const today = new Date();
  return dueDate < today && dueDate.toDateString() !== today.toDateString();
};

const getTagColor = (index) => {
  const colors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success', 'badge-warning'];
  return colors[index % colors.length];
};

const getAssignedUserName = (userId) => {
  if (!userId) return 'Unassigned';
  // In a real application, you would fetch the user's name from the store or API
  // For now, we'll return a placeholder
  return `User #${userId}`;
};

const getCompletionPercentage = (task) => {
  if (!task.checklist || task.checklist.length === 0) {
    return task.completed ? 100 : 0;
  }
  
  const completedItems = task.checklist.filter(item => item.completed).length;
  return Math.round((completedItems / task.checklist.length) * 100);
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 