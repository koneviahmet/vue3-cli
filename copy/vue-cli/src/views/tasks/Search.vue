<template>
  <div class="py-6 px-4 min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-base-content">Search Tasks</h1>
      <p class="text-base-content/70 mt-1">Find tasks by title, description, status, priority, or other criteria</p>
    </div>

    <!-- Search and filters -->
    <div class="bg-base-100 p-6 rounded-lg shadow mb-6">
      <div class="flex flex-col gap-4">
        <!-- Main search -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">Search by keywords</span>
          </label>
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Enter keywords to search in task title or description..." 
              class="input input-bordered w-full"
              @input="debouncedSearch"
            />
            <button 
              class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle" 
              @click="clearSearchQuery"
              v-if="searchQuery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Advanced filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Status Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select v-model="filters.status" class="select select-bordered w-full" @change="applyFilters">
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Priority</span>
            </label>
            <select v-model="filters.priority" class="select select-bordered w-full" @change="applyFilters">
              <option value="">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Completion Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Completion</span>
            </label>
            <select v-model="filters.completed" class="select select-bordered w-full" @change="applyFilters">
              <option value="">All tasks</option>
              <option value="true">Completed tasks</option>
              <option value="false">Incomplete tasks</option>
            </select>
          </div>
        </div>

        <!-- Date filters and tags -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Due Date Range -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Due date range</span>
            </label>
            <div class="flex gap-2">
              <div class="flex-1">
                <input 
                  v-model="filters.dueDateStart" 
                  type="date" 
                  class="input input-bordered w-full" 
                  placeholder="From"
                  @change="applyFilters"
                />
              </div>
              <div class="flex-1">
                <input 
                  v-model="filters.dueDateEnd" 
                  type="date" 
                  class="input input-bordered w-full" 
                  placeholder="To"
                  @change="applyFilters"
                />
              </div>
            </div>
          </div>

          <!-- Tags Filter -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Filter by tag</span>
            </label>
            <select v-model="filters.tag" class="select select-bordered w-full" @change="applyFilters">
              <option value="">All tags</option>
              <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
            </select>
          </div>
        </div>

        <!-- Filter buttons -->
        <div class="flex justify-end gap-2 mt-2">
          <button class="btn btn-outline" @click="resetFilters">
            Reset Filters
          </button>
          <button class="btn btn-primary" @click="applyFilters">
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="tasksLoading" class="bg-base-100 rounded-lg shadow">
      <div class="animate-pulse p-6">
        <div class="h-4 bg-base-300 rounded w-1/3 mb-6"></div>
        <div v-for="i in 5" :key="i" class="h-24 bg-base-200 rounded-lg mb-4"></div>
      </div>
    </div>

    <!-- Error alert -->
    <div v-else-if="tasksError" class="alert alert-error mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ tasksError }}</span>
    </div>

    <!-- Search results -->
    <div v-else-if="!tasksLoading" class="bg-base-100 rounded-lg shadow">
      <div v-if="filteredTasks.length === 0" class="p-8 text-center text-base-content/60">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-base-content/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-lg font-medium">No tasks found</p>
        <p class="mt-1">Try adjusting your search criteria</p>
      </div>
      
      <div v-else>
        <div class="p-6 border-b border-base-300">
          <h2 class="text-xl font-medium">Search Results</h2>
          <p class="text-base-content/70">Found {{ filteredTasks.length }} task(s) matching your criteria</p>
        </div>
        
        <div class="divide-y divide-base-300">
          <div v-for="task in filteredTasks" :key="task.id" class="p-6 hover:bg-base-200 transition-colors">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center">
                <div :class="`w-3 h-3 rounded-full mr-3 ${getStatusColor(task.status)}`"></div>
                <h3 class="font-medium text-lg">{{ task.title }}</h3>
              </div>
              <div class="flex gap-2 mt-2 sm:mt-0">
                <span :class="`badge ${getPriorityBadge(task.priority)}`">{{ task.priority }}</span>
                <span :class="`badge ${getStatusBadge(task.status)}`">{{ formatStatus(task.status) }}</span>
              </div>
            </div>
            
            <p class="mt-2 text-base-content/80">{{ truncateText(task.description, 150) }}</p>
            
            <div class="flex flex-wrap gap-1 mt-2">
              <span v-for="(tag, index) in task.tags" :key="index" 
                class="badge badge-sm" :class="getTagColor(index)">
                {{ tag }}
              </span>
            </div>
            
            <div class="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div class="text-sm text-base-content/70">
                <span>Due: </span>
                <span :class="isOverdue(task.due_date) ? 'text-error font-medium' : ''">
                  {{ formatDate(task.due_date) }}
                </span>
                <span v-if="task.checklist && task.checklist.length > 0" class="ml-4">
                  <span>Checklist: </span>
                  <span class="font-medium">{{ getCompletedItems(task) }}/{{ task.checklist.length }}</span>
                </span>
              </div>
              
              <div class="flex gap-2 mt-3 sm:mt-0">
                <router-link :to="`/tasks/detail/${task.id}`" class="btn btn-sm btn-primary">
                  View
                </router-link>
                <router-link :to="`/tasks/update/${task.id}`" class="btn btn-sm btn-secondary">
                  Edit
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useModelTasks from "../../compositions/useModelTasks";

const route = useRoute();
const router = useRouter();
const { loading: tasksLoading, data: tasksData, error: tasksError, getItems: getTasks } = useModelTasks();

// Search and filters
const searchQuery = ref("");
const filters = reactive({
  status: "",
  priority: "",
  completed: "",
  dueDateStart: "",
  dueDateEnd: "",
  tag: ""
});

// Results
const filteredTasks = ref([]);

// Fetch all tasks on mount
onMounted(() => {
  getTasks().then(() => {
    // Apply any initial filters from URL params
    applyFiltersFromUrl();
    applyFilters();
  });
});

// Watch for tasks data changes to apply filters
watch(tasksData, () => {
  applyFilters();
}, { deep: true });

// Available tags for the filter dropdown
const availableTags = computed(() => {
  if (!tasksData.value) return [];
  
  const allTags = tasksData.value.flatMap(task => task.tags || []);
  return [...new Set(allTags)].sort();
});

// Debounced search to avoid too many filter operations
let debounceTimeout;
const debouncedSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
};

// Apply filters from URL params
const applyFiltersFromUrl = () => {
  const query = route.query;
  
  if (query.search) searchQuery.value = query.search;
  if (query.status) filters.status = query.status;
  if (query.priority) filters.priority = query.priority;
  if (query.completed) filters.completed = query.completed;
  if (query.dueDateStart) filters.dueDateStart = query.dueDateStart;
  if (query.dueDateEnd) filters.dueDateEnd = query.dueDateEnd;
  if (query.tag) filters.tag = query.tag;
};

// Apply all filters and update URL
const applyFilters = () => {
  if (!tasksData.value) {
    filteredTasks.value = [];
    return;
  }
  
  let result = [...tasksData.value];
  
  // Apply text search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(task => 
      (task.title && task.title.toLowerCase().includes(query)) || 
      (task.description && task.description.toLowerCase().includes(query)) ||
      (task.notes && task.notes.toLowerCase().includes(query))
    );
  }
  
  // Apply status filter
  if (filters.status) {
    result = result.filter(task => task.status === filters.status);
  }
  
  // Apply priority filter
  if (filters.priority) {
    result = result.filter(task => task.priority === filters.priority);
  }
  
  // Apply completion filter
  if (filters.completed !== "") {
    const isCompleted = filters.completed === "true";
    result = result.filter(task => task.completed === isCompleted);
  }
  
  // Apply due date start filter
  if (filters.dueDateStart) {
    const startDate = new Date(filters.dueDateStart);
    startDate.setHours(0, 0, 0, 0);
    result = result.filter(task => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return taskDate >= startDate;
    });
  }
  
  // Apply due date end filter
  if (filters.dueDateEnd) {
    const endDate = new Date(filters.dueDateEnd);
    endDate.setHours(23, 59, 59, 999);
    result = result.filter(task => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return taskDate <= endDate;
    });
  }
  
  // Apply tag filter
  if (filters.tag) {
    result = result.filter(task => 
      task.tags && task.tags.includes(filters.tag)
    );
  }
  
  // Sort by due date (closest first)
  result.sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateA - dateB;
  });
  
  filteredTasks.value = result;
  
  // Update URL with search params
  updateUrlWithFilters();
};

// Update URL with current filters
const updateUrlWithFilters = () => {
  const query = {};
  
  if (searchQuery.value) query.search = searchQuery.value;
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.completed !== "") query.completed = filters.completed;
  if (filters.dueDateStart) query.dueDateStart = filters.dueDateStart;
  if (filters.dueDateEnd) query.dueDateEnd = filters.dueDateEnd;
  if (filters.tag) query.tag = filters.tag;
  
  router.replace({ query });
};

// Reset all filters
const resetFilters = () => {
  searchQuery.value = "";
  filters.status = "";
  filters.priority = "";
  filters.completed = "";
  filters.dueDateStart = "";
  filters.dueDateEnd = "";
  filters.tag = "";
  
  applyFilters();
};

// Clear search query
const clearSearchQuery = () => {
  searchQuery.value = "";
  applyFilters();
};

// Helper Functions
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
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString();
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

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const getCompletedItems = (task) => {
  if (!task.checklist || task.checklist.length === 0) return 0;
  return task.checklist.filter(item => item.completed).length;
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style> 