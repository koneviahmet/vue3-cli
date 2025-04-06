<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <p class="text-sm opacity-70 mt-1">Overview and quick access to BookSwap administration</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm gap-2" @click="refreshData">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-base-100 p-6 rounded-lg shadow-md animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-16 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="card-body p-5">
          <div class="flex flex-col">
            <div class="text-base-content/70 text-sm mb-1">Total Users</div>
            <div class="text-4xl font-bold text-primary">{{ systemStatus?.totalUsers || 0 }}</div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-1 text-sm text-base-content/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                Registered accounts
              </div>
              <router-link to="/admin/users" class="text-xs text-primary">View all</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="card-body p-5">
          <div class="flex flex-col">
            <div class="text-base-content/70 text-sm mb-1">Active Users</div>
            <div class="text-4xl font-bold text-secondary">{{ systemStatus?.activeUsers || 0 }}</div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-1 text-sm text-base-content/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
                Online now
              </div>
              <span class="badge badge-secondary badge-sm text-xs">Active</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="card-body p-5">
          <div class="flex flex-col">
            <div class="text-base-content/70 text-sm mb-1">System Status</div>
            <div class="text-4xl font-bold" :class="systemStatus?.status === 'healthy' ? 'text-success' : 'text-error'">
              {{ systemStatus?.status === 'healthy' ? 'Healthy' : 'Issues' }}
            </div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-1 text-sm text-base-content/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                All services running
              </div>
              <span class="badge" :class="systemStatus?.status === 'healthy' ? 'badge-success' : 'badge-error'">
                <span class="inline-block w-2 h-2 rounded-full mr-1" :class="systemStatus?.status === 'healthy' ? 'bg-success' : 'bg-error'"></span>
                {{ systemStatus?.status === 'healthy' ? 'OK' : 'Alert' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="card-body p-5">
          <div class="flex flex-col">
            <div class="text-base-content/70 text-sm mb-1">Server Load</div>
            <div class="text-4xl font-bold text-info">{{ systemStatus?.serverLoad || '0%' }}</div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-1 text-sm text-base-content/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
                Average load
              </div>
              <div class="radial-progress text-info" :style="`--value:${parseInt(systemStatus?.serverLoad || 0)}; --size:1.5rem;`">
                <span class="text-[0.5rem]">{{ systemStatus?.serverLoad || '0%' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-md">
        <div class="card-body p-5">
          <h2 class="card-title text-lg mb-4">Recent Activity</h2>
          <div v-if="loading" class="animate-pulse space-y-3">
            <div v-for="i in 5" :key="i" class="h-10 bg-base-300 rounded"></div>
          </div>
          <div v-else>
            <div v-if="!logs || logs.length === 0" class="flex flex-col items-center justify-center py-6 text-base-content/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>No recent activity</p>
            </div>
            <div v-else class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th class="text-xs">Time</th>
                    <th class="text-xs">Action</th>
                    <th class="text-xs">User</th>
                    <th class="text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="log in logs.slice(0, 5)" :key="log.id" class="hover">
                    <td class="text-xs">{{ formatDate(log.timestamp) }}</td>
                    <td class="text-sm">{{ log.action }}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="avatar" v-if="log.user">
                          <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="text-xs font-bold text-primary">{{ log.user.charAt(0) }}</span>
                          </div>
                        </div>
                        {{ log.user || 'System' }}
                      </div>
                    </td>
                    <td>
                      <div class="badge badge-sm" :class="{
                        'badge-success': log.status === 'success',
                        'badge-error': log.status === 'error',
                        'badge-warning': log.status === 'warning'
                      }">
                        {{ log.status }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-end mt-4">
              <router-link to="/admin/logs" class="btn btn-ghost btn-sm text-primary">
                View all logs
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-md">
        <div class="card-body p-5">
          <h2 class="card-title text-lg mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <router-link to="/admin/settings" class="btn btn-outline w-full flex items-center justify-between hover:bg-primary/10">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                <span>Site Settings</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
            
            <router-link to="/admin/users" class="btn btn-outline w-full flex items-center justify-between hover:bg-primary/10">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                <span>Manage Users</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
            
            <router-link to="/admin/analytics" class="btn btn-outline w-full flex items-center justify-between hover:bg-primary/10">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span>View Analytics</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
            
            <router-link to="/admin/site-settings" class="btn btn-outline w-full flex items-center justify-between hover:bg-primary/10">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" />
                </svg>
                <span>Customize Site</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 card bg-base-100 shadow-md">
      <div class="card-body p-5">
        <h2 class="card-title text-lg mb-4">System Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-base-200 p-4 rounded-md">
            <div class="text-sm text-base-content/70 mb-1 flex justify-between">
              <span>CPU Usage</span>
              <span class="font-medium">{{ systemStatus?.cpuUsage || 0 }}%</span>
            </div>
            <div class="w-full bg-base-300 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-primary transition-all duration-300" 
                :style="{ width: `${systemStatus?.cpuUsage || 0}%` }"
                :class="{
                  'bg-success': systemStatus?.cpuUsage < 60,
                  'bg-warning': systemStatus?.cpuUsage >= 60 && systemStatus?.cpuUsage < 85,
                  'bg-error': systemStatus?.cpuUsage >= 85
                }"
              ></div>
            </div>
          </div>
          
          <div class="bg-base-200 p-4 rounded-md">
            <div class="text-sm text-base-content/70 mb-1 flex justify-between">
              <span>Memory Usage</span>
              <span class="font-medium">{{ systemStatus?.memoryUsage || 0 }}%</span>
            </div>
            <div class="w-full bg-base-300 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-secondary transition-all duration-300" 
                :style="{ width: `${systemStatus?.memoryUsage || 0}%` }"
                :class="{
                  'bg-success': systemStatus?.memoryUsage < 60,
                  'bg-warning': systemStatus?.memoryUsage >= 60 && systemStatus?.memoryUsage < 85,
                  'bg-error': systemStatus?.memoryUsage >= 85
                }"
              ></div>
            </div>
          </div>
          
          <div class="bg-base-200 p-4 rounded-md">
            <div class="text-sm text-base-content/70 mb-1 flex justify-between">
              <span>Disk Usage</span>
              <span class="font-medium">{{ systemStatus?.diskUsage || 0 }}%</span>
            </div>
            <div class="w-full bg-base-300 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-accent transition-all duration-300" 
                :style="{ width: `${systemStatus?.diskUsage || 0}%` }"
                :class="{
                  'bg-success': systemStatus?.diskUsage < 70,
                  'bg-warning': systemStatus?.diskUsage >= 70 && systemStatus?.diskUsage < 90,
                  'bg-error': systemStatus?.diskUsage >= 90
                }"
              ></div>
            </div>
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

const refreshData = () => {
  getLogs();
  getSystemStatus();
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  });
};

onMounted(() => {
  refreshData();
});
</script>

<style scoped>
</style> 