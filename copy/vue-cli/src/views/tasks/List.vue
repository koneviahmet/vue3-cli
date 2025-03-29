<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-base-content">Task Management</h1>
        <p class="text-base-content/70 mt-1">View and manage all your tasks in one place</p>
      </div>
      <div class="mt-4 md:mt-0">
        <router-link to="/tasks/create" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Task
        </router-link>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="bg-base-100 p-4 rounded-lg shadow mb-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-grow">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search tasks by title or description" 
            class="input input-bordered w-full"
            @input="filterTasks"
          />
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <select 
            v-model="statusFilter" 
            class="select select-bordered w-full md:w-auto"
            @change="filterTasks"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
          
          <select 
            v-model="priorityFilter" 
            class="select select-bordered w-full md:w-auto"
            @change="filterTasks"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <button 
            @click="resetFilters"
            class="btn btn-outline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Error alert -->
    <div class="alert alert-error mb-6" v-if="tasksError">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ tasksError }}</span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="tasksLoading" class="bg-base-100 rounded-lg shadow overflow-hidden">
      <div class="animate-pulse">
        <div class="h-16 bg-base-300"></div>
        <div v-for="i in 5" :key="i" class="h-24 bg-base-200 border-t border-base-300"></div>
      </div>
    </div>

    <!-- Data table -->
    <div v-else class="bg-base-100 rounded-lg shadow overflow-hidden">
      <div v-if="filteredTasks.length === 0" class="p-8 text-center text-base-content/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-medium">No tasks found</p>
        <p class="mt-1">Try adjusting your search criteria</p>
      </div>
      
      <div v-else>
        <table class="table w-full">
          <thead class="bg-base-100">
            <tr>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('title')">
                  Task
                  <svg v-if="sortField === 'title'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" :class="{ 'transform rotate-180': sortDirection === 'asc' }" />
                  </svg>
                </div>
              </th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('status')">
                  Status
                  <svg v-if="sortField === 'status'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" :class="{ 'transform rotate-180': sortDirection === 'asc' }" />
                  </svg>
                </div>
              </th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider hidden md:table-cell">
                <div class="flex items-center cursor-pointer" @click="sortBy('priority')">
                  Priority
                  <svg v-if="sortField === 'priority'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" :class="{ 'transform rotate-180': sortDirection === 'asc' }" />
                  </svg>
                </div>
              </th>
              <th class="py-3 px-4 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider hidden md:table-cell">
                <div class="flex items-center cursor-pointer" @click="sortBy('due_date')">
                  Due Date
                  <svg v-if="sortField === 'due_date'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" :class="{ 'transform rotate-180': sortDirection === 'asc' }" />
                  </svg>
                </div>
              </th>
              <th class="py-3 px-4 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-base-200">
              <td class="py-4 px-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div :class="`w-3 h-3 rounded-full ${getStatusColor(task.status)}`"></div>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-base-content">{{ task.title }}</div>
                    <div class="text-sm text-base-content/70 line-clamp-1">{{ task.description }}</div>
                    <div class="mt-1 flex flex-wrap gap-1 md:hidden">
                      <span :class="`badge ${getPriorityBadge(task.priority)}`">{{ task.priority }}</span>
                      <span :class="`badge ${getStatusBadge(task.status)}`">{{ formatStatus(task.status) }}</span>
                    </div>
                    <div class="mt-1 text-xs text-base-content/70 md:hidden">
                      Due: <span :class="isOverdue(task.due_date) ? 'text-error' : ''">{{ formatDate(task.due_date) }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 hidden md:table-cell">
                <span :class="`badge ${getStatusBadge(task.status)}`">{{ formatStatus(task.status) }}</span>
              </td>
              <td class="py-4 px-4 hidden md:table-cell">
                <span :class="`badge ${getPriorityBadge(task.priority)}`">{{ task.priority }}</span>
              </td>
              <td class="py-4 px-4 hidden md:table-cell">
                <span :class="isOverdue(task.due_date) ? 'text-error' : ''">{{ formatDate(task.due_date) }}</span>
              </td>
              <td class="py-4 px-4 text-right space-x-1">
                <router-link :to="`/tasks/detail/${task.id}`" class="btn btn-sm btn-primary">
                  View
                </router-link>
                <router-link :to="`/tasks/update/${task.id}`" class="btn btn-sm btn-secondary">
                  Edit
                </router-link>
                <button @click="confirmTaskDelete(task)" class="btn btn-sm btn-error" :class="tasksLoading && 'loading btn-disabled'">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      
        <!-- Pagination -->
        <div class="border-t border-base-200 p-4 flex items-center justify-between">
          <div class="text-sm text-base-content/70">
            Showing <span class="font-medium">{{ filteredTasks.length }}</span> of <span class="font-medium">{{ tasksData.length }}</span> tasks
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import useModelTasks from "../../compositions/useModelTasks";

const { loading: tasksLoading, data: tasksData, error: tasksError, getItems: getTasks, confirmDelete } = useModelTasks();

// Fetch data
onMounted(() => {
  getTasks();
});

// Filtering
const searchQuery = ref('');
const statusFilter = ref('');
const priorityFilter = ref('');

// Sorting
const sortField = ref('due_date');
const sortDirection = ref('asc');

// Filtered tasks
const filteredTasks = ref([]);

// Watch for data changes and reapply filters
watch(tasksData, () => {
  filterTasks();
}, { deep: true });

// Filter tasks based on search and filters
const filterTasks = () => {
  if (!tasksData.value) {
    filteredTasks.value = [];
    return;
  }
  
  let result = [...tasksData.value];
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(task => 
      task.title.toLowerCase().includes(query) || 
      (task.description && task.description.toLowerCase().includes(query))
    );
  }
  
  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(task => task.status === statusFilter.value);
  }
  
  // Apply priority filter
  if (priorityFilter.value) {
    result = result.filter(task => task.priority === priorityFilter.value);
  }
  
  // Apply sorting
  result.sort((a, b) => {
    let comparison = 0;
    
    if (sortField.value === 'due_date') {
      const dateA = new Date(a.due_date || '9999-12-31');
      const dateB = new Date(b.due_date || '9999-12-31');
      comparison = dateA - dateB;
    } else if (sortField.value === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else {
      comparison = a[sortField.value]?.localeCompare(b[sortField.value]) || 0;
    }
    
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });
  
  filteredTasks.value = result;
};

// Sort by field
const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  filterTasks();
};

// Reset filters
const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  priorityFilter.value = '';
  filterTasks();
};

// Confirm task deletion
const confirmTaskDelete = (task) => {
  confirmDelete(task);
};

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-success';
    case 'in-progress': return 'bg-warning';
    case 'pending': return 'bg-error';
    default: return 'bg-info';
  }
};

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
  return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const isOverdue = (dateString) => {
  if (!dateString) return false;
  const dueDate = new Date(dateString);
  const today = new Date();
  return dueDate < today && dueDate.toDateString() !== today.toDateString();
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 