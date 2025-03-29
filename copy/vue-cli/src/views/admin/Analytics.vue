<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="text-2xl font-bold text-base-content">Analytics</div>
      <router-link to="/admin" class="btn btn-sm btn-outline">
        Back to Dashboard
      </router-link>
    </div>
    
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="bg-base-100 p-6 rounded-lg shadow animate-pulse">
        <div class="h-8 bg-base-300 rounded mb-4"></div>
        <div class="h-36 bg-base-300 rounded"></div>
      </div>
    </div>
    
    <div v-else class="space-y-6">
      <!-- Traffic Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-lg font-medium text-base-content mb-4">Total Visitors</div>
          <div class="text-4xl font-bold text-primary">{{ analytics?.totalVisitors || 0 }}</div>
          <div class="mt-2 text-sm flex items-center gap-1">
            <span :class="analytics?.visitorsTrend > 0 ? 'text-success' : 'text-error'">
              {{ analytics?.visitorsTrend > 0 ? '+' : '' }}{{ analytics?.visitorsTrend || 0 }}%
            </span>
            <span class="text-base-content/60">vs last week</span>
          </div>
        </div>
        
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-lg font-medium text-base-content mb-4">Page Views</div>
          <div class="text-4xl font-bold text-secondary">{{ analytics?.pageViews || 0 }}</div>
          <div class="mt-2 text-sm flex items-center gap-1">
            <span :class="analytics?.pageViewsTrend > 0 ? 'text-success' : 'text-error'">
              {{ analytics?.pageViewsTrend > 0 ? '+' : '' }}{{ analytics?.pageViewsTrend || 0 }}%
            </span>
            <span class="text-base-content/60">vs last week</span>
          </div>
        </div>
        
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-lg font-medium text-base-content mb-4">Bounce Rate</div>
          <div class="text-4xl font-bold text-accent">{{ analytics?.bounceRate || 0 }}%</div>
          <div class="mt-2 text-sm flex items-center gap-1">
            <span :class="analytics?.bounceRateTrend < 0 ? 'text-success' : 'text-error'">
              {{ analytics?.bounceRateTrend > 0 ? '+' : '' }}{{ analytics?.bounceRateTrend || 0 }}%
            </span>
            <span class="text-base-content/60">vs last week</span>
          </div>
        </div>
      </div>
      
      <!-- Traffic Over Time -->
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-lg font-medium text-base-content mb-4">Traffic Over Time</div>
        <div class="h-80 flex items-center justify-center">
          <div class="w-full h-full" v-if="analytics?.trafficData">
            <!-- Chart would go here -->
            <div class="relative h-64">
              <div class="absolute inset-0 flex">
                <div v-for="(item, i) in analytics.trafficData" :key="i" class="flex-1 flex flex-col justify-end">
                  <div 
                    class="w-full bg-primary/80 rounded-t"
                    :style="{height: `${(item.visitors / maxVisitors) * 100}%`}"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-base-content/70">
              <div v-for="(item, i) in analytics.trafficData" :key="i">{{ item.date }}</div>
            </div>
          </div>
          <div v-else class="text-base-content/60">
            No traffic data available
          </div>
        </div>
      </div>
      
      <!-- Top Pages & User Demographics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-lg font-medium text-base-content mb-4">Top Pages</div>
          <div v-if="analytics?.topPages?.length" class="space-y-4">
            <div v-for="(page, i) in analytics.topPages" :key="i" class="border-b border-base-300 pb-4 last:border-0 last:pb-0">
              <div class="flex justify-between mb-1">
                <div class="font-medium">{{ page.path }}</div>
                <div class="text-base-content/70">{{ page.views }} views</div>
              </div>
              <div class="w-full bg-base-300 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full" 
                  :style="{width: `${(page.views / analytics.topPages[0].views) * 100}%`}"
                ></div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-base-content/60">
            No page data available
          </div>
        </div>
        
        <div class="bg-base-100 p-6 rounded-lg shadow">
          <div class="text-lg font-medium text-base-content mb-4">User Demographics</div>
          <div v-if="analytics?.userDemographics" class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm font-medium text-base-content/70 mb-2">Device Type</div>
              <div class="space-y-2">
                <div v-for="(device, key) in analytics.userDemographics.devices" :key="key" class="flex justify-between">
                  <div>{{ key }}</div>
                  <div>{{ device }}%</div>
                </div>
              </div>
            </div>
            
            <div>
              <div class="text-sm font-medium text-base-content/70 mb-2">Top Locations</div>
              <div class="space-y-2">
                <div v-for="(percent, country) in analytics.userDemographics.countries" :key="country" class="flex justify-between">
                  <div>{{ country }}</div>
                  <div>{{ percent }}%</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-base-content/60">
            No demographic data available
          </div>
        </div>
      </div>
      
      <!-- User Activity -->
      <div class="bg-base-100 p-6 rounded-lg shadow">
        <div class="text-lg font-medium text-base-content mb-4">User Activity</div>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Page</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!analytics?.userActivity?.length" class="border-b border-base-300">
                <td colspan="5" class="text-center py-4 text-base-content/60">No user activity data available</td>
              </tr>
              <tr v-for="(activity, i) in analytics?.userActivity" :key="i" class="border-b border-base-300">
                <td class="py-2">{{ activity.time }}</td>
                <td class="py-2">{{ activity.user }}</td>
                <td class="py-2">{{ activity.action }}</td>
                <td class="py-2">{{ activity.page }}</td>
                <td class="py-2">{{ activity.duration }}s</td>
              </tr>
            </tbody>
          </table>
        </div>
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