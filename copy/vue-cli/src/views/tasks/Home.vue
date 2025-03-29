<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="text-2xl font-bold text-base-content mb-6">Tasks Dashboard</div>
    
    <!-- Stats Cards -->
    <div v-if="tasksLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 p-4 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-16 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Total Tasks</div>
        <div class="text-3xl font-bold text-primary">{{ tasksCount }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Completed</div>
        <div class="text-3xl font-bold text-success">{{ completedTasksCount }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">In Progress</div>
        <div class="text-3xl font-bold text-warning">{{ inProgressTasksCount }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Pending</div>
        <div class="text-3xl font-bold text-error">{{ pendingTasksCount }}</div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Tasks -->
      <div class="lg:col-span-2">
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-xl font-medium text-base-content mb-4">Recent Tasks</div>
          <div v-if="tasksLoading" class="animate-pulse">
            <div v-for="i in 5" :key="i" class="h-20 bg-base-300 rounded my-2"></div>
          </div>
          <div v-else>
            <div v-if="!tasksData || tasksData.length === 0" class="text-center py-4 text-base-content/60">
              No tasks found
            </div>
            <div v-else class="space-y-3">
              <div v-for="task in recentTasks" :key="task.id" 
                class="border border-base-300 rounded-lg p-4 hover:bg-base-200 transition-colors">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div :class="`w-3 h-3 rounded-full mr-3 ${getStatusColor(task.status)}`"></div>
                    <h3 class="font-medium">{{ task.title }}</h3>
                  </div>
                  <div :class="`badge ${getPriorityBadge(task.priority)}`">
                    {{ task.priority }}
                  </div>
                </div>
                <p class="text-sm text-base-content/70 mt-2 line-clamp-1">{{ task.description }}</p>
                <div class="flex justify-between items-center mt-3 text-sm">
                  <div>
                    <span class="text-base-content/60">Due: </span>
                    <span class="font-medium" :class="isOverdue(task.due_date) ? 'text-error' : ''">
                      {{ formatDate(task.due_date) }}
                    </span>
                  </div>
                  <router-link :to="`/tasks/detail/${task.id}`" class="btn btn-sm btn-primary">View</router-link>
                </div>
              </div>
            </div>
            <div class="mt-4 text-right">
              <router-link to="/tasks/list" class="text-primary hover:underline">View all tasks</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions & Task Tags -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-xl font-medium text-base-content mb-4">Quick Actions</div>
          <div class="space-y-3">
            <router-link to="/tasks/create" class="btn btn-primary w-full flex items-center justify-between">
              <span>Add New Task</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </router-link>
            
            <router-link to="/tasks/list" class="btn btn-secondary w-full flex items-center justify-between">
              <span>Manage Tasks</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </router-link>
            
            <router-link to="/tasks/search" class="btn btn-accent w-full flex items-center justify-between">
              <span>Search Tasks</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
        
        <!-- Task Tags -->
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-xl font-medium text-base-content mb-4">Task Tags</div>
          <div class="flex flex-wrap gap-2">
            <div v-for="(tag, index) in uniqueTags" :key="index" 
              class="badge badge-lg" :class="getTagColor(index)">
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import useModelTasks from "../../compositions/useModelTasks";

const { loading: tasksLoading, data: tasksData, error: tasksError, getItems: getTasks } = useModelTasks();

onMounted(() => {
  getTasks();
});

// Task statistics
const tasksCount = computed(() => {
  if (!tasksData.value) return 0;
  return tasksData.value.length;
});

const completedTasksCount = computed(() => {
  if (!tasksData.value) return 0;
  return tasksData.value.filter(task => task.completed).length;
});

const inProgressTasksCount = computed(() => {
  if (!tasksData.value) return 0;
  return tasksData.value.filter(task => task.status === 'in-progress').length;
});

const pendingTasksCount = computed(() => {
  if (!tasksData.value) return 0;
  return tasksData.value.filter(task => task.status === 'pending').length;
});

// Recent tasks
const recentTasks = computed(() => {
  if (!tasksData.value) return [];
  return [...tasksData.value]
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt);
      const dateB = new Date(b.created_at || b.createdAt);
      return dateB - dateA;
    })
    .slice(0, 5);
});

// Task tags
const uniqueTags = computed(() => {
  if (!tasksData.value) return [];
  const allTags = tasksData.value.flatMap(task => task.tags || []);
  return [...new Set(allTags)];
});

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-success';
    case 'in-progress': return 'bg-warning';
    case 'pending': return 'bg-error';
    default: return 'bg-info';
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

const getTagColor = (index) => {
  const colors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success', 'badge-warning'];
  return colors[index % colors.length];
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