<template>
  <div class="p-4 bg-base-100 min-h-screen">
    <!-- Dashboard Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
        <p class="text-sm opacity-70">Welcome to your BookSwap admin dashboard</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-sm">
            <span class="hidden sm:inline mr-1">Last 7 days</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li><a>Today</a></li>
            <li><a>Yesterday</a></li>
            <li><a>Last 7 days</a></li>
            <li><a>Last 30 days</a></li>
            <li><a>This month</a></li>
            <li><a>Last month</a></li>
            <li><a>Custom range</a></li>
          </ul>
        </div>
        <button class="btn btn-sm btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Main Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-70">Total Users</p>
              <p class="text-2xl font-bold">{{ systemStatus.totalUsers }}</p>
              <p class="text-xs opacity-70 mt-1">
                <span class="inline-flex items-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  12% this week
                </span>
              </p>
            </div>
            <div class="avatar placeholder">
              <div class="bg-primary-focus text-primary-content rounded-lg w-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-70">Page Views</p>
              <p class="text-2xl font-bold">{{ analytics.pageViews?.toLocaleString() }}</p>
              <p class="text-xs opacity-70 mt-1">
                <span class="inline-flex items-center" :class="analytics.pageViewsTrend > 0 ? 'text-success' : 'text-error'">
                  <svg v-if="analytics.pageViewsTrend > 0" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                  </svg>
                  {{ Math.abs(analytics.pageViewsTrend) }}% since last period
                </span>
              </p>
            </div>
            <div class="avatar placeholder">
              <div class="bg-secondary text-secondary-content rounded-lg w-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-70">Total Books</p>
              <p class="text-2xl font-bold">{{ systemStatus.totalBooks || 342 }}</p>
              <p class="text-xs opacity-70 mt-1">
                <span class="inline-flex items-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  8% this month
                </span>
              </p>
            </div>
            <div class="avatar placeholder">
              <div class="bg-accent text-accent-content rounded-lg w-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-70">Active Swaps</p>
              <p class="text-2xl font-bold">{{ systemStatus.activeSwaps || 28 }}</p>
              <p class="text-xs opacity-70 mt-1">
                <span class="inline-flex items-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  5% since yesterday
                </span>
              </p>
            </div>
            <div class="avatar placeholder">
              <div class="bg-info text-info-content rounded-lg w-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Performance Overview -->
    <div class="card bg-base-200 shadow-lg mb-6">
      <div class="card-body p-5">
        <div class="flex flex-wrap justify-between items-center mb-4">
          <h2 class="card-title text-lg">System Performance</h2>
          <div class="badge badge-lg" :class="systemStatus.status === 'healthy' ? 'badge-success' : 'badge-error'">
            {{ systemStatus.status === 'healthy' ? 'System Healthy' : 'Issues Detected' }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-base-100 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">CPU Usage</h3>
              <span class="text-sm font-bold" :class="systemStatus.cpuUsage > 80 ? 'text-error' : 'text-success'">
                {{ systemStatus.cpuUsage }}%
              </span>
            </div>
            <progress class="progress w-full" :class="systemStatus.cpuUsage > 80 ? 'progress-error' : 'progress-success'" 
              :value="systemStatus.cpuUsage" max="100"></progress>
          </div>
          
          <div class="bg-base-100 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Memory Usage</h3>
              <span class="text-sm font-bold" :class="systemStatus.memoryUsage > 80 ? 'text-error' : 'text-success'">
                {{ systemStatus.memoryUsage }}%
              </span>
            </div>
            <progress class="progress w-full" :class="systemStatus.memoryUsage > 80 ? 'progress-error' : 'progress-success'" 
              :value="systemStatus.memoryUsage" max="100"></progress>
          </div>
          
          <div class="bg-base-100 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Disk Usage</h3>
              <span class="text-sm font-bold" :class="systemStatus.diskUsage > 80 ? 'text-error' : 'text-success'">
                {{ systemStatus.diskUsage }}%
              </span>
            </div>
            <progress class="progress w-full" :class="systemStatus.diskUsage > 80 ? 'progress-error' : 'progress-success'" 
              :value="systemStatus.diskUsage" max="100"></progress>
          </div>
          
          <div class="bg-base-100 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Server Load</h3>
              <span class="text-sm font-bold">{{ systemStatus.serverLoad }}</span>
            </div>
            <div class="flex justify-between mt-4">
              <div class="text-xs opacity-70">Active Users</div>
              <div class="badge badge-primary">{{ systemStatus.activeUsers }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Analytics and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Top Pages Table -->
      <div class="card bg-base-200 shadow-lg h-full">
        <div class="card-body p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="card-title text-lg">Popular Pages</h2>
            <router-link to="/admin/analytics" class="btn btn-xs btn-ghost">View All</router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th class="text-xs">Page</th>
                  <th class="text-xs text-center">Views</th>
                  <th class="text-xs text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(page, index) in analytics.topPages" :key="index" class="hover">
                  <td class="truncate max-w-[200px] text-sm">{{ page.path }}</td>
                  <td class="text-sm text-center">{{ page.views.toLocaleString() }}</td>
                  <td class="text-sm text-right">
                    <span class="font-medium">{{ ((page.views / analytics.pageViews) * 100).toFixed(1) }}%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recent User Activity -->
      <div class="card bg-base-200 shadow-lg h-full">
        <div class="card-body p-5">
          <div class="flex justify-between items-center mb-4">
            <h2 class="card-title text-lg">Recent Activity</h2>
            <router-link to="/admin/logs" class="btn btn-xs btn-ghost">View All</router-link>
          </div>
          <div class="space-y-4">
            <div v-for="(activity, index) in analytics.userActivity?.slice(0, 5)" :key="index" 
              class="bg-base-100 p-3 rounded-lg shadow flex items-start gap-3">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-10">
                  <span class="text-lg">{{ activity.user.charAt(0).toUpperCase() }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <p class="font-medium text-sm truncate">{{ activity.user }}</p>
                  <span class="text-xs opacity-70">{{ activity.time }}</span>
                </div>
                <p class="text-sm mt-1">{{ activity.action }}</p>
                <p class="text-xs opacity-70 truncate mt-1">{{ activity.page }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent System Logs -->
    <div class="card bg-base-200 shadow-lg mb-6">
      <div class="card-body p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title text-lg">System Logs</h2>
          <router-link to="/admin/logs" class="btn btn-xs btn-outline">View All Logs</router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th class="text-xs">Time</th>
                <th class="text-xs">Type</th>
                <th class="text-xs">Action</th>
                <th class="text-xs">User</th>
                <th class="text-xs">Status</th>
                <th class="text-xs">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id" class="hover text-sm">
                <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
                <td>
                  <div class="badge badge-sm" 
                    :class="{
                      'badge-info': log.type === 'auth',
                      'badge-warning': log.type === 'user',
                      'badge-primary': log.type === 'system'
                    }">
                    {{ log.type }}
                  </div>
                </td>
                <td>{{ log.action }}</td>
                <td class="truncate max-w-[100px]">{{ log.user }}</td>
                <td>
                  <div class="badge badge-sm" :class="log.status === 'success' ? 'badge-success' : 'badge-error'">
                    {{ log.status }}
                  </div>
                </td>
                <td class="truncate max-w-[180px]">{{ log.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card bg-base-200 shadow-lg">
      <div class="card-body p-5">
        <h2 class="card-title text-lg mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <router-link to="/admin/users" class="btn btn-outline btn-primary gap-2 h-auto py-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Manage Users</span>
          </router-link>
          
          <router-link to="/admin/settings" class="btn btn-outline btn-primary gap-2 h-auto py-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            <span>Site Settings</span>
          </router-link>
          
          <router-link to="/admin/analytics" class="btn btn-outline btn-primary gap-2 h-auto py-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span>Analytics</span>
          </router-link>
          
          <router-link to="/admin/logs" class="btn btn-outline btn-primary gap-2 h-auto py-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
            </svg>
            <span>System Logs</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useSiteSettings from '../../compositions/useSiteSettings';

const { 
  loading, 
  systemStatus, 
  analytics, 
  logs, 
  getSystemStatus, 
  getAnalytics, 
  getLogs 
} = useSiteSettings();

onMounted(async () => {
  await getSystemStatus();
  await getAnalytics();
  await getLogs(1, 5); // Only get the most recent 5 logs for the dashboard
});
</script>

<style scoped>
</style> 