<template>
  <div class="p-4 bg-base-100 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <div class="flex space-x-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-sm btn-ghost">
            <span class="mr-2">Last 7 days</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Today</a></li>
            <li><a>Yesterday</a></li>
            <li><a>Last 7 days</a></li>
            <li><a>Last 30 days</a></li>
            <li><a>This month</a></li>
            <li><a>Last month</a></li>
          </ul>
        </div>
        <button class="btn btn-sm btn-primary">Refresh</button>
      </div>
    </div>

    <!-- System Status -->
    <div class="card bg-base-200 shadow-xl mb-6">
      <div class="card-body p-4">
        <div class="flex justify-between items-center">
          <h2 class="card-title text-lg">System Status</h2>
          <div class="badge" :class="systemStatus.status === 'healthy' ? 'badge-success' : 'badge-error'">
            {{ systemStatus.status === 'healthy' ? 'Healthy' : 'Issues Detected' }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div class="stat bg-base-100 shadow rounded-lg">
            <div class="stat-title">Server Load</div>
            <div class="stat-value text-2xl">{{ systemStatus.serverLoad }}</div>
          </div>
          
          <div class="stat bg-base-100 shadow rounded-lg">
            <div class="stat-title">CPU Usage</div>
            <div class="flex items-center">
              <div class="stat-value text-2xl mr-2">{{ systemStatus.cpuUsage }}%</div>
              <progress class="progress w-20" :class="systemStatus.cpuUsage > 80 ? 'progress-error' : 'progress-success'" 
                :value="systemStatus.cpuUsage" max="100"></progress>
            </div>
          </div>
          
          <div class="stat bg-base-100 shadow rounded-lg">
            <div class="stat-title">Memory Usage</div>
            <div class="flex items-center">
              <div class="stat-value text-2xl mr-2">{{ systemStatus.memoryUsage }}%</div>
              <progress class="progress w-20" :class="systemStatus.memoryUsage > 80 ? 'progress-error' : 'progress-success'" 
                :value="systemStatus.memoryUsage" max="100"></progress>
            </div>
          </div>
          
          <div class="stat bg-base-100 shadow rounded-lg">
            <div class="stat-title">Disk Usage</div>
            <div class="flex items-center">
              <div class="stat-value text-2xl mr-2">{{ systemStatus.diskUsage }}%</div>
              <progress class="progress w-20" :class="systemStatus.diskUsage > 80 ? 'progress-error' : 'progress-success'" 
                :value="systemStatus.diskUsage" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="stat bg-base-200 shadow-xl rounded-lg">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-title">Total Visitors</div>
        <div class="stat-value">{{ analytics.totalVisitors?.toLocaleString() }}</div>
        <div class="stat-desc" :class="analytics.visitorsTrend > 0 ? 'text-success' : 'text-error'">
          {{ analytics.visitorsTrend > 0 ? '↗︎' : '↘︎' }} {{ Math.abs(analytics.visitorsTrend) }}% since last period
        </div>
      </div>
      
      <div class="stat bg-base-200 shadow-xl rounded-lg">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="stat-title">Page Views</div>
        <div class="stat-value">{{ analytics.pageViews?.toLocaleString() }}</div>
        <div class="stat-desc" :class="analytics.pageViewsTrend > 0 ? 'text-success' : 'text-error'">
          {{ analytics.pageViewsTrend > 0 ? '↗︎' : '↘︎' }} {{ Math.abs(analytics.pageViewsTrend) }}% since last period
        </div>
      </div>
      
      <div class="stat bg-base-200 shadow-xl rounded-lg">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <div class="stat-title">Users</div>
        <div class="stat-value">{{ systemStatus.totalUsers }}</div>
        <div class="stat-desc">{{ systemStatus.activeUsers }} active users</div>
      </div>
    </div>

    <!-- Recent Activity and Top Pages -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Recent User Activity -->
      <div class="card bg-base-200 shadow-xl h-full">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Recent User Activity</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Page</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(activity, index) in analytics.userActivity" :key="index">
                  <td>{{ activity.time }}</td>
                  <td class="truncate max-w-[120px]">{{ activity.user }}</td>
                  <td>{{ activity.action }}</td>
                  <td class="truncate max-w-[120px]">{{ activity.page }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-actions justify-end mt-4">
            <router-link to="/admin/analytics" class="btn btn-sm btn-ghost">View All Activity</router-link>
          </div>
        </div>
      </div>

      <!-- Top Pages -->
      <div class="card bg-base-200 shadow-xl h-full">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Top Pages</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(page, index) in analytics.topPages" :key="index">
                  <td class="truncate max-w-[200px]">{{ page.path }}</td>
                  <td>{{ page.views.toLocaleString() }}</td>
                  <td>{{ ((page.views / analytics.pageViews) * 100).toFixed(1) }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-actions justify-end mt-4">
            <router-link to="/admin/analytics" class="btn btn-sm btn-ghost">View All Pages</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Logs -->
    <div class="card bg-base-200 shadow-xl mb-6">
      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Recent System Logs</h2>
          <router-link to="/admin/logs" class="btn btn-sm btn-ghost">View All Logs</router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Action</th>
                <th>User</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id">
                <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
                <td>
                  <div class="badge" 
                    :class="{
                      'badge-info': log.type === 'auth',
                      'badge-warning': log.type === 'user',
                      'badge-primary': log.type === 'system'
                    }">
                    {{ log.type }}
                  </div>
                </td>
                <td>{{ log.action }}</td>
                <td>{{ log.user }}</td>
                <td>
                  <div class="badge" :class="log.status === 'success' ? 'badge-success' : 'badge-error'">
                    {{ log.status }}
                  </div>
                </td>
                <td class="truncate max-w-[200px]">{{ log.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body p-4">
        <h2 class="card-title mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link to="/admin/users" class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Manage Users
          </router-link>
          <router-link to="/admin/settings" class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            Site Settings
          </router-link>
          <router-link to="/admin/analytics" class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Analytics
          </router-link>
          <router-link to="/admin/logs" class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
            </svg>
            System Logs
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