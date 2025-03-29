<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="text-2xl font-bold text-base-content mb-6">Admin Dashboard</div>
    
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 p-4 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-16 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Total Users</div>
        <div class="text-3xl font-bold text-primary">{{ systemStatus?.totalUsers || 0 }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Active Users</div>
        <div class="text-3xl font-bold text-secondary">{{ systemStatus?.activeUsers || 0 }}</div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">System Status</div>
        <div class="flex items-center gap-2">
          <div class="text-3xl font-bold" :class="systemStatus?.status === 'healthy' ? 'text-success' : 'text-error'">
            {{ systemStatus?.status === 'healthy' ? 'Healthy' : 'Issues' }}
          </div>
          <span class="badge" :class="systemStatus?.status === 'healthy' ? 'badge-success' : 'badge-error'">
            <span v-if="systemStatus?.status === 'healthy'" class="inline-block w-2 h-2 bg-success rounded-full mr-1"></span>
            <span v-else class="inline-block w-2 h-2 bg-error rounded-full mr-1"></span>
          </span>
        </div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="text-lg font-medium text-base-content/70 mb-2">Server Load</div>
        <div class="text-3xl font-bold text-info">{{ systemStatus?.serverLoad || '0%' }}</div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Recent Activity</div>
        <div v-if="loading" class="animate-pulse">
          <div v-for="i in 5" :key="i" class="h-10 bg-base-300 rounded my-2"></div>
        </div>
        <div v-else>
          <div v-if="!logs || logs.length === 0" class="text-center py-4 text-base-content/60">
            No recent activity
          </div>
          <div v-else class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-left">Time</th>
                  <th class="text-left">Action</th>
                  <th class="text-left">User</th>
                  <th class="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in logs.slice(0, 5)" :key="log.id" class="border-b border-base-300">
                  <td class="py-2">{{ new Date(log.timestamp).toLocaleString() }}</td>
                  <td class="py-2">{{ log.action }}</td>
                  <td class="py-2">{{ log.user }}</td>
                  <td class="py-2">
                    <span class="badge" :class="log.status === 'success' ? 'badge-success' : 'badge-error'">
                      {{ log.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-right">
            <router-link to="/admin/logs" class="text-primary hover:underline">View all logs</router-link>
          </div>
        </div>
      </div>
      
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-xl font-medium text-base-content mb-4">Quick Actions</div>
        <div class="space-y-3">
          <router-link to="/admin/settings" class="btn btn-primary w-full flex items-center justify-between">
            <span>Site Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </router-link>
          
          <router-link to="/admin/users" class="btn btn-secondary w-full flex items-center justify-between">
            <span>Manage Users</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
            </svg>
          </router-link>
          
          <router-link to="/admin/analytics" class="btn btn-accent w-full flex items-center justify-between">
            <span>View Analytics</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
    
    <div class="mt-6 bg-base-100 p-6 rounded-lg shadow">
      <div class="text-xl font-medium text-base-content mb-4">System Overview</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-base-200 p-4 rounded-md">
          <div class="text-sm text-base-content/70 mb-1">CPU Usage</div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <div class="h-2 bg-base-300 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary rounded-full" 
                  :style="{ width: `${systemStatus?.cpuUsage || 0}%` }"
                ></div>
              </div>
            </div>
            <div class="text-sm font-medium">{{ systemStatus?.cpuUsage || 0 }}%</div>
          </div>
        </div>
        
        <div class="bg-base-200 p-4 rounded-md">
          <div class="text-sm text-base-content/70 mb-1">Memory Usage</div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <div class="h-2 bg-base-300 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-secondary rounded-full" 
                  :style="{ width: `${systemStatus?.memoryUsage || 0}%` }"
                ></div>
              </div>
            </div>
            <div class="text-sm font-medium">{{ systemStatus?.memoryUsage || 0 }}%</div>
          </div>
        </div>
        
        <div class="bg-base-200 p-4 rounded-md">
          <div class="text-sm text-base-content/70 mb-1">Disk Usage</div>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <div class="h-2 bg-base-300 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-accent rounded-full" 
                  :style="{ width: `${systemStatus?.diskUsage || 0}%` }"
                ></div>
              </div>
            </div>
            <div class="text-sm font-medium">{{ systemStatus?.diskUsage || 0 }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useSiteSettings from "../../compositions/useSiteSettings";

const { 
  loading, 
  error, 
  logs, 
  systemStatus,
  getLogs,
  getSystemStatus
} = useSiteSettings();

onMounted(() => {
  getLogs();
  getSystemStatus();
});
</script>

<style scoped>
</style> 