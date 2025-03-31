<template>
  <div class="p-4 min-h-screen bg-base-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <div>
        <div class="flex items-center">
          <router-link to="/tasks" class="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <h1 class="text-2xl font-bold">{{ task?.title || 'Task Details' }}</h1>
        </div>
        <p v-if="task" class="text-sm opacity-70">Task #{{ taskId }}</p>
      </div>
      <div class="mt-2 md:mt-0 flex gap-2" v-if="task">
        <router-link :to="`/tasks/update/${taskId}`" class="btn btn-sm btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </router-link>
        <button @click="confirmTaskDelete(task)" class="btn btn-sm btn-error" v-if="task && !tasksLoading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="tasksLoading || isUpdating" class="bg-base-100 p-3 rounded-lg shadow-sm">
      <div class="animate-pulse">
        <div class="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
        <div class="space-y-2">
          <div class="h-3 bg-base-300 rounded"></div>
          <div class="h-3 bg-base-300 rounded w-5/6"></div>
          <div class="h-3 bg-base-300 rounded w-4/6"></div>
        </div>
        <div class="h-24 bg-base-300 rounded mt-4"></div>
        <div class="h-16 bg-base-300 rounded mt-4"></div>
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
    <div v-else-if="!task" class="bg-base-100 p-6 rounded-lg shadow-sm text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto opacity-40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="font-medium">Task not found</p>
      <router-link to="/tasks" class="btn btn-primary btn-sm mt-3">Go to Tasks</router-link>
    </div>

    <!-- Task details -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- Main task details (3 columns) -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Title, status and tags in one card -->
        <div class="bg-base-100 p-4 rounded-lg shadow-sm">
          <div class="flex flex-wrap justify-between items-center gap-2 mb-3">
            <div class="flex gap-2">
              <span :class="`badge ${getStatusBadge(task.status)}`">{{ formatStatus(task.status) }}</span>
              <span :class="`badge ${getPriorityBadge(task.priority)}`">{{ task.priority }}</span>
            </div>
            <div class="flex items-center">
              <p class="text-sm mr-3">Due: <span :class="isOverdue(task.due_date) ? 'text-error font-medium' : ''">{{ formatDate(task.due_date) }}</span></p>
              <div class="radial-progress text-xs" :style="`--value:${getCompletionPercentage(task)}; --size: 2rem;`" :class="getCompletionPercentage(task) === 100 ? 'text-success' : 'text-primary'">{{ getCompletionPercentage(task) }}%</div>
            </div>
          </div>
          
          <!-- Description with edit mode toggle -->
          <div class="mb-3">
            <div class="flex justify-between items-center mb-1">
              <h3 class="text-sm font-medium">Description</h3>
              <button @click="toggleDescriptionEdit" class="btn btn-xs btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                {{ isEditingDescription ? 'Cancel' : 'Edit' }}
              </button>
            </div>
            <p v-if="!isEditingDescription" class="text-sm whitespace-pre-line opacity-80">{{ task.description || 'No description' }}</p>
            <div v-else class="flex flex-col gap-2">
              <textarea 
                v-model="quickEditDescription" 
                class="textarea textarea-bordered textarea-sm w-full" 
                rows="3"
                placeholder="Enter description"
                :disabled="isUpdating"
                @keydown.esc="toggleDescriptionEdit"
              ></textarea>
              <div class="flex justify-end gap-2">
                <button @click="toggleDescriptionEdit" class="btn btn-xs btn-ghost">Cancel</button>
                <button @click="saveQuickEditDescription" class="btn btn-xs btn-primary" :disabled="isUpdating">Save</button>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-1 mt-2" v-if="task.tags && task.tags.length > 0">
            <span v-for="(tag, index) in task.tags" :key="index" 
              class="badge badge-sm" :class="getTagColor(index)">{{ tag }}</span>
          </div>
        </div>

        <!-- Checklist -->
        <div class="bg-base-100 p-4 rounded-lg shadow-sm">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-medium">Checklist</h3>
            <div class="flex gap-2" v-if="isChecklistEdited">
              <button @click="saveChecklist" class="btn btn-xs btn-primary" :disabled="isUpdating">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Save
              </button>
              <button @click="resetChecklist" class="btn btn-xs btn-ghost">Cancel</button>
            </div>
            <button v-else @click="addChecklistItem" class="btn btn-xs btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div v-if="!editedChecklist || editedChecklist.length === 0" class="text-center py-3 opacity-60 text-sm">
            No checklist items
          </div>
          <div v-else class="space-y-2">
            <div v-for="(item, index) in editedChecklist" :key="item.id"
              class="flex items-center p-2 border border-base-200 rounded"
              :class="{'bg-base-200/30': item.completed}">
              <input type="checkbox" v-model="item.completed" class="checkbox checkbox-xs checkbox-primary mr-2" @change="saveChecklistOnCheckboxChange(item)" />
              <div class="flex-1">
                <input 
                  v-model="item.text" 
                  type="text" 
                  class="input input-xs w-full bg-transparent checklist-item-input" 
                  :class="{'line-through opacity-50': item.completed}"
                  @input="onChecklistChange"
                  @keydown="handleChecklistKeydown($event, index)"
                />
              </div>
              <button @click="removeChecklistItem(index)" class="btn btn-xs btn-ghost text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="bg-base-100 p-4 rounded-lg shadow-sm">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">Notes</h3>
            <button @click="toggleNotesEdit" class="btn btn-xs btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {{ isEditingNotes ? 'Cancel' : 'Edit' }}
            </button>
          </div>
          
          <div v-if="!isEditingNotes">
            <div v-if="!task.notes" class="text-center py-3 opacity-60 text-sm">
              No notes
            </div>
            <p v-else class="whitespace-pre-line text-sm opacity-80">{{ task.notes }}</p>
          </div>
          
          <div v-else class="flex flex-col gap-2">
            <textarea 
              v-model="quickEditNotes" 
              class="textarea textarea-bordered textarea-sm w-full" 
              rows="4"
              placeholder="Enter notes"
              :disabled="isUpdating"
              @keydown.esc="toggleNotesEdit"
            ></textarea>
            <div class="flex justify-end gap-2">
              <button @click="toggleNotesEdit" class="btn btn-xs btn-ghost">Cancel</button>
              <button @click="saveQuickEditNotes" class="btn btn-xs btn-primary" :disabled="isUpdating">Save</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Task actions (1 column) -->
      <div>
        <!-- Quick actions card -->
        <div class="bg-base-100 p-4 rounded-lg shadow-sm mb-4">
          <h3 class="font-medium mb-3">Change Status</h3>
          <select 
            v-model="selectedStatus" 
            class="select select-bordered select-sm w-full mb-3"
            :disabled="isUpdating"
            @change="changeTaskStatus"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <div class="flex flex-col gap-2">
            <router-link :to="`/tasks/update/${taskId}`" class="btn btn-sm btn-outline btn-primary w-full">Full Edit</router-link>
            <router-link to="/tasks/list" class="btn btn-sm btn-outline btn-secondary w-full">All Tasks</router-link>
            <router-link to="/tasks/create" class="btn btn-sm btn-outline btn-accent w-full">New Task</router-link>
          </div>
        </div>
        
        <!-- Task info card -->
        <div class="bg-base-100 p-4 rounded-lg shadow-sm">
          <h3 class="font-medium mb-3">Info</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="opacity-70">Created:</span>
              <span>{{ formatDate(task.created_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="opacity-70">Updated:</span>
              <span>{{ formatDate(task.updated_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="opacity-70">Assigned to:</span>
              <span>{{ getAssignedUserName(task.assigned_to) }}</span>
            </div>
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
const selectedStatus = ref('');
const quickEditDescription = ref('');
const quickEditNotes = ref('');
const isEditingDescription = ref(false);
const isEditingNotes = ref(false);

// Toggle edit modes
const toggleDescriptionEdit = () => {
  if (isEditingDescription.value) {
    // Cancel edit
    quickEditDescription.value = task.value.description || '';
  } else {
    // Start edit
    quickEditDescription.value = task.value.description || '';
  }
  isEditingDescription.value = !isEditingDescription.value;
};

const toggleNotesEdit = () => {
  if (isEditingNotes.value) {
    // Cancel edit
    quickEditNotes.value = task.value.notes || '';
  } else {
    // Start edit
    quickEditNotes.value = task.value.notes || '';
  }
  isEditingNotes.value = !isEditingNotes.value;
};

onMounted(async () => {
  if (taskId) {
    try {
      task.value = await getItem({ id: taskId });
      // Create a deep copy of the checklist array
      editedChecklist.value = task.value.checklist ? JSON.parse(JSON.stringify(task.value.checklist)) : [];
      // Set the selected status to the current task status
      selectedStatus.value = task.value.status;
      // Initialize quick edit values
      quickEditDescription.value = task.value.description || '';
      quickEditNotes.value = task.value.notes || '';
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

// Quick edit functions
const saveQuickEditDescription = async () => {
  if (!task.value || quickEditDescription.value === task.value.description) {
    isEditingDescription.value = false;
    return;
  }

  try {
    isUpdating.value = true;
    updateError.value = null;
    
    const updatedTask = {
      ...task.value,
      description: quickEditDescription.value,
      updated_at: new Date().toISOString()
    };
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    notyfSuccess("Description updated");
    isEditingDescription.value = false;
  } catch (error) {
    console.error("Error updating description:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while updating the description";
    notyfError(updateError.value);
    // Reset to original value
    quickEditDescription.value = task.value.description || '';
  } finally {
    isUpdating.value = false;
  }
};

const saveQuickEditNotes = async () => {
  if (!task.value || quickEditNotes.value === task.value.notes) {
    isEditingNotes.value = false;
    return;
  }

  try {
    isUpdating.value = true;
    updateError.value = null;
    
    const updatedTask = {
      ...task.value,
      notes: quickEditNotes.value,
      updated_at: new Date().toISOString()
    };
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    notyfSuccess("Notes updated");
    isEditingNotes.value = false;
  } catch (error) {
    console.error("Error updating notes:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while updating the notes";
    notyfError(updateError.value);
    // Reset to original value
    quickEditNotes.value = task.value.notes || '';
  } finally {
    isUpdating.value = false;
  }
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
  
  // Focus on the newly added item after rendering
  setTimeout(() => {
    const inputs = document.querySelectorAll('.checklist-item-input');
    if (inputs && inputs.length > 0) {
      inputs[inputs.length - 1].focus();
    }
  }, 10);
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

// Change task status
const changeTaskStatus = async () => {
  if (selectedStatus.value === task.value.status) {
    return; // No change needed
  }
  
  try {
    isUpdating.value = true;
    updateError.value = null;
    
    const updatedTask = {
      ...task.value,
      status: selectedStatus.value,
      // If status is completed, also set the completed flag
      completed: selectedStatus.value === 'completed',
      updated_at: new Date().toISOString()
    };
    
    // If status is completed, also mark all checklist items as completed
    if (selectedStatus.value === 'completed' && updatedTask.checklist && updatedTask.checklist.length > 0) {
      updatedTask.checklist = updatedTask.checklist.map(item => ({
        ...item,
        completed: true
      }));
      // Update the edited checklist as well
      editedChecklist.value = JSON.parse(JSON.stringify(updatedTask.checklist));
    }
    
    await updateItem(updatedTask);
    task.value = updatedTask;
    notyfSuccess(`Task status changed to "${formatStatus(selectedStatus.value)}"`);
  } catch (error) {
    console.error("Error updating task status:", error);
    updateError.value = typeof error === 'string' ? error : "An error occurred while updating the task status";
    notyfError(updateError.value);
    // Reset to the original status
    selectedStatus.value = task.value.status;
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

const handleChecklistKeydown = async (event, index) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    
    // Save current changes first
    await saveChecklist();
    
    // Add a new item and focus it
    addChecklistItem();
  }
};
</script>

<style scoped>
.checklist-item-input {
  border: none;
  padding: 0;
  height: auto;
  min-height: unset;
}
.checklist-item-input:focus {
  outline: none;
  box-shadow: none;
}
</style> 