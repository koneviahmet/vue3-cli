<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Analytics</h1>
        <p class="text-sm opacity-70 mt-1">Track your site's performance metrics and user activity</p>
      </div>
      <div class="flex gap-3">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-sm btn-outline gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
            Last 30 days
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Today</a></li>
            <li><a>Yesterday</a></li>
            <li><a>Last 7 days</a></li>
            <li><a>Last 30 days</a></li>
            <li><a>This month</a></li>
            <li><a>Last month</a></li>
            <li><a>Custom range</a></li>
          </ul>
        </div>
        <router-link to="/admin" class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Dashboard
        </router-link>
      </div>
    </div>
    
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-base-100 p-6 rounded-lg shadow-lg animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-36 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="space-y-6">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="card-body p-5">
            <div class="flex flex-col">
              <div class="text-base-content/70 text-sm mb-1">Total Visitors</div>
              <div class="text-4xl font-bold text-primary">{{ analytics?.totalVisitors?.toLocaleString() || 0 }}</div>
              <div class="mt-2 flex items-center gap-1 text-sm">
                <div :class="analytics?.visitorsTrend > 0 ? 'text-success' : 'text-error'" class="flex items-center font-medium">
                  <svg v-if="analytics?.visitorsTrend > 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                  </svg>
                  {{ analytics?.visitorsTrend > 0 ? '+' : '' }}{{ analytics?.visitorsTrend || 0 }}%
                </div>
                <span class="text-base-content/60">vs last period</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="card-body p-5">
            <div class="flex flex-col">
              <div class="text-base-content/70 text-sm mb-1">Page Views</div>
              <div class="text-4xl font-bold text-secondary">{{ analytics?.pageViews?.toLocaleString() || 0 }}</div>
              <div class="mt-2 flex items-center gap-1 text-sm">
                <div :class="analytics?.pageViewsTrend > 0 ? 'text-success' : 'text-error'" class="flex items-center font-medium">
                  <svg v-if="analytics?.pageViewsTrend > 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                  </svg>
                  {{ analytics?.pageViewsTrend > 0 ? '+' : '' }}{{ analytics?.pageViewsTrend || 0 }}%
                </div>
                <span class="text-base-content/60">vs last period</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="card-body p-5">
            <div class="flex flex-col">
              <div class="text-base-content/70 text-sm mb-1">Bounce Rate</div>
              <div class="text-4xl font-bold text-accent">{{ analytics?.bounceRate || 0 }}%</div>
              <div class="mt-2 flex items-center gap-1 text-sm">
                <div :class="analytics?.bounceRateTrend < 0 ? 'text-success' : 'text-error'" class="flex items-center font-medium">
                  <svg v-if="analytics?.bounceRateTrend < 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                  </svg>
                  {{ analytics?.bounceRateTrend > 0 ? '+' : '' }}{{ analytics?.bounceRateTrend || 0 }}%
                </div>
                <span class="text-base-content/60">vs last period</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Traffic Over Time -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-5">
          <h2 class="text-xl font-medium mb-4">Traffic Over Time</h2>
          <div class="h-80 flex items-center justify-center">
            <div class="w-full h-full" v-if="analytics?.trafficData?.length">
              <!-- Chart visualization -->
              <div class="relative h-64">
                <div class="absolute inset-x-0 bottom-0 border-t border-base-300"></div>
                <div class="absolute inset-y-0 left-0 border-r border-base-300"></div>
                
                <div class="grid h-64 w-full grid-cols-7 gap-2">
                  <div v-for="(item, i) in analytics.trafficData" :key="i" class="flex flex-col justify-end">
                    <div class="w-full rounded-t bg-primary/80 hover:bg-primary transition-colors duration-200" 
                      :style="{height: `${(item.visitors / maxVisitors) * 100}%`}">
                    </div>
                    <div class="text-xs mt-1 text-center">{{ item.date }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center text-base-content/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>No traffic data available for this period</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Pages & Demographics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body p-5">
            <h2 class="text-xl font-medium mb-4">Top Pages</h2>
            <div v-if="analytics?.topPages?.length" class="space-y-4">
              <div v-for="(page, i) in analytics.topPages" :key="i" class="border-b border-base-200 pb-4 last:border-0 last:pb-0">
                <div class="flex justify-between items-center mb-1">
                  <div class="font-medium truncate max-w-[70%]">{{ page.path }}</div>
                  <div class="text-right text-sm text-base-content/70">{{ page.views.toLocaleString() }} views</div>
                </div>
                <div class="w-full bg-base-300 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" 
                    :style="{width: `${(page.views / analytics.topPages[0].views) * 100}%`}">
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-8 text-base-content/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No page data available</p>
            </div>
          </div>
        </div>
        
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body p-5">
            <h2 class="text-xl font-medium mb-4">User Demographics</h2>
            <div v-if="analytics?.userDemographics" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium mb-3 text-base-content/70">Device Type</h3>
                <div class="space-y-3">
                  <div v-for="(device, key) in analytics.userDemographics.devices" :key="key">
                    <div class="flex justify-between items-center mb-1">
                      <div class="font-medium">{{ key }}</div>
                      <div class="text-sm text-base-content/70">{{ device }}%</div>
                    </div>
                    <div class="w-full bg-base-300 rounded-full h-2">
                      <div class="bg-secondary h-2 rounded-full" :style="{width: `${device}%`}"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-sm font-medium mb-3 text-base-content/70">Top Locations</h3>
                <div class="space-y-3">
                  <div v-for="(percent, country) in analytics.userDemographics.countries" :key="country">
                    <div class="flex justify-between items-center mb-1">
                      <div class="font-medium">{{ country }}</div>
                      <div class="text-sm text-base-content/70">{{ percent }}%</div>
                    </div>
                    <div class="w-full bg-base-300 rounded-full h-2">
                      <div class="bg-accent h-2 rounded-full" :style="{width: `${percent}%`}"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-8 text-base-content/60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>No demographic data available</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- User Activity -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body p-5">
          <h2 class="text-xl font-medium mb-4">User Activity</h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="text-xs">Time</th>
                  <th class="text-xs">User</th>
                  <th class="text-xs">Action</th>
                  <th class="text-xs">Page</th>
                  <th class="text-xs text-right">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!analytics?.userActivity?.length" class="hover">
                  <td colspan="5" class="text-center py-4 text-base-content/60">No user activity data available</td>
                </tr>
                <tr v-for="(activity, i) in analytics?.userActivity" :key="i" class="hover">
                  <td class="text-sm">{{ activity.time }}</td>
                  <td class="text-sm font-medium">{{ activity.user }}</td>
                  <td class="text-sm">{{ activity.action }}</td>
                  <td class="text-sm truncate max-w-[200px]">{{ activity.page }}</td>
                  <td class="text-sm text-right">{{ activity.duration }}s</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end mt-4">
            <button class="btn btn-sm btn-ghost">View All Activity</button>
          </div>
        </div>
      </div>
      
      <!-- Export Actions -->
      <div class="flex justify-end gap-3">
        <button class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Export CSV
        </button>
        <button class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useSiteSettings from "../../compositions/useSiteSettings";

const { loading, error, analytics, getAnalytics } = useSiteSettings();

const maxVisitors = computed(() => {
  if (!analytics.value?.trafficData) return 0;
  return Math.max(...analytics.value.trafficData.map(item => item.visitors));
});

onMounted(() => {
  getAnalytics();
});
</script>

<style scoped>
</style> 