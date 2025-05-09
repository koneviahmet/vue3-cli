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
          <h1 class="text-2xl font-bold text-base-content">Create New Task</h1>
        </div>
        <p class="text-base-content/70 mt-1">Add a new task to your list</p>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isSubmitting" class="bg-base-100 p-6 rounded-lg shadow">
      <div class="flex items-center justify-center py-12">
        <div class="loading loading-spinner text-primary"></div>
        <span class="ml-3 text-lg">Creating task...</span>
      </div>
    </div>

    <!-- Error alert -->
    <div v-if="errorMessage" class="alert alert-error mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Task form -->
    <div v-if="!isSubmitting" class="bg-base-100 p-6 rounded-lg shadow">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Basic Information -->
        <div>
          <h2 class="text-lg font-medium mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Title -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Title <span class="text-error">*</span></span>
              </label>
              <input 
                v-model="task.title" 
                type="text" 
                placeholder="Enter task title" 
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.title }"
                required
              />
              <label v-if="errors.title" class="label">
                <span class="label-text-alt text-error">{{ errors.title }}</span>
              </label>
            </div>

            <!-- Due Date -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Due Date</span>
              </label>
              <input 
                v-model="task.due_date" 
                type="date" 
                class="input input-bordered w-full"
              />
            </div>

            <!-- Status -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Status <span class="text-error">*</span></span>
              </label>
              <select 
                v-model="task.status" 
                class="select select-bordered w-full"
                :class="{ 'select-error': errors.status }"
                required
              >
                <option disabled value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <label v-if="errors.status" class="label">
                <span class="label-text-alt text-error">{{ errors.status }}</span>
              </label>
            </div>

            <!-- Priority -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Priority <span class="text-error">*</span></span>
              </label>
              <select 
                v-model="task.priority" 
                class="select select-bordered w-full"
                :class="{ 'select-error': errors.priority }"
                required
              >
                <option disabled value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <label v-if="errors.priority" class="label">
                <span class="label-text-alt text-error">{{ errors.priority }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea 
            v-model="task.description" 
            class="textarea textarea-bordered w-full h-32" 
            placeholder="Describe the task in detail"
          ></textarea>
        </div>

        <!-- Tags -->
        <div>
          <label class="label">
            <span class="label-text">Tags (comma separated)</span>
          </label>
          <input 
            v-model="tagsInput" 
            type="text" 
            placeholder="frontend, bug, documentation, etc." 
            class="input input-bordered w-full"
          />
          <div class="mt-2 flex flex-wrap gap-2">
            <div 
              v-for="(tag, index) in computedTags" 
              :key="index" 
              class="badge badge-lg" 
              :class="getTagColor(index)"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <!-- Checklist -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-medium">Checklist Items</h2>
            <button 
              type="button" 
              @click="addChecklistItem" 
              class="btn btn-sm btn-primary btn-outline"
            >
              Add Item
            </button>
          </div>
          
          <div v-if="task.checklist.length === 0" class="text-center py-4 text-base-content/60 border border-dashed border-base-300 rounded-lg">
            No checklist items yet. Click "Add Item" to create one.
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="(item, index) in task.checklist" 
              :key="index"
              class="flex items-center p-3 border border-base-300 rounded-lg"
            >
              <div class="form-control">
                <label class="label cursor-pointer">
                  <input type="checkbox" v-model="item.completed" class="checkbox checkbox-primary" />
                </label>
              </div>
              <div class="flex-grow ml-2">
                <input 
                  v-model="item.text" 
                  type="text" 
                  placeholder="Checklist item" 
                  class="input input-bordered input-sm w-full"
                />
              </div>
              <button 
                type="button" 
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
        <div>
          <label class="label">
            <span class="label-text">Notes</span>
          </label>
          <textarea 
            v-model="task.notes" 
            class="textarea textarea-bordered w-full h-24" 
            placeholder="Add any additional notes about the task"
          ></textarea>
        </div>

        <!-- Submit buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            type="submit" 
            class="btn btn-primary flex-1 sm:flex-none sm:min-w-[10rem]"
            :disabled="isSubmitting"
          >
            Create Task
          </button>
          <button 
            type="button" 
            @click="resetForm" 
            class="btn btn-outline flex-1 sm:flex-none"
            :disabled="isSubmitting"
          >
            Reset Form
          </button>
          <router-link 
            to="/tasks" 
            class="btn btn-ghost flex-1 sm:flex-none"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import useModelTasks from "../../compositions/useModelTasks";
import { notyfSuccess, notyfError } from "../../utils/notyf.js";

const router = useRouter();
const { addItem } = useModelTasks();

// Form data
const task = reactive({
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  due_date: "",
  notes: "",
  completed: false,
  tags: [],
  checklist: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  assigned_to: 1 // Current user or default user
});

// Form state
const isSubmitting = ref(false);
const errorMessage = ref("");
const errors = reactive({
  title: "",
  status: "",
  priority: ""
});

// Tags input handling
const tagsInput = ref("");
const computedTags = computed(() => {
  if (!tagsInput.value) return [];
  return tagsInput.value.split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
});

// Add a checklist item
const addChecklistItem = () => {
  task.checklist.push({
    id: Date.now(), // Generate a unique ID
    text: "",
    completed: false
  });
};

// Remove a checklist item
const removeChecklistItem = (index) => {
  task.checklist.splice(index, 1);
};

// Validate the form
const validateForm = () => {
  let valid = true;
  
  // Reset errors
  errors.title = "";
  errors.status = "";
  errors.priority = "";
  errorMessage.value = "";
  
  // Validate title
  if (!task.title.trim()) {
    errors.title = "Title is required";
    valid = false;
  }
  
  // Validate status
  if (!task.status) {
    errors.status = "Status is required";
    valid = false;
  }
  
  // Validate priority
  if (!task.priority) {
    errors.priority = "Priority is required";
    valid = false;
  }
  
  return valid;
};

// Submit the form
const submitForm = async () => {
  if (!validateForm()) {
    errorMessage.value = "Please fix the errors in the form";
    return;
  }
  
  isSubmitting.value = true;
  
  // Update tags from input
  task.tags = [...computedTags.value];
  
  // Clean up empty checklist items
  task.checklist = task.checklist.filter(item => item.text.trim());
  
  try {
    await addItem({ ...task });
    notyfSuccess("Task created successfully");
    router.push("/tasks");
  } catch (error) {
    console.error("Error creating task:", error);
    errorMessage.value = typeof error === 'string' ? error : "An error occurred while creating the task";
    notyfError(errorMessage.value);
    isSubmitting.value = false;
  }
};

// Reset the form
const resetForm = () => {
  // Reset task data
  task.title = "";
  task.description = "";
  task.status = "pending";
  task.priority = "medium";
  task.due_date = "";
  task.notes = "";
  task.completed = false;
  task.checklist = [];
  
  // Reset tags
  tagsInput.value = "";
  
  // Reset errors
  errors.title = "";
  errors.status = "";
  errors.priority = "";
  errorMessage.value = "";
};

// Helper functions
const getTagColor = (index) => {
  const colors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success', 'badge-warning'];
  return colors[index % colors.length];
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 