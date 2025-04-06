<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">System Logs</h1>
        <p class="text-sm opacity-70 mt-1">Monitor and analyze system activity and events</p>
      </div>
      <div class="flex gap-2">
        <router-link to="/admin" class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Dashboard
        </router-link>
        <button class="btn btn-primary btn-sm gap-2" @click="fetchLogs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-base-100 p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-auto">
          <select v-model="filters.type" class="select select-bordered w-full md:max-w-[150px]" @change="applyFilters">
            <option value="">All Types</option>
            <option value="auth">Authentication</option>
            <option value="user">User Action</option>
            <option value="system">System</option>
            <option value="error">Error</option>
          </select>
          
          <select v-model="filters.status" class="select select-bordered w-full md:max-w-[150px]" @change="applyFilters">
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>
          
          <div class="dropdown dropdown-end w-full md:max-w-[220px]">
            <label tabindex="0" class="btn btn-outline w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Date Range
            </label>
            <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
              <div class="p-2">
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">From Date</span>
                    </label>
                    <input 
                      type="date" 
                      v-model="filters.fromDate" 
                      class="input input-bordered w-full"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">To Date</span>
                    </label>
                    <input 
                      type="date" 
                      v-model="filters.toDate" 
                      class="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="space-x-2">
                    <button class="btn btn-xs" @click="setDateRange('today')">Today</button>
                    <button class="btn btn-xs" @click="setDateRange('yesterday')">Yesterday</button>
                    <button class="btn btn-xs" @click="setDateRange('week')">This Week</button>
                  </div>
                  <button class="btn btn-primary btn-sm" @click="applyFilters">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="btn btn-outline btn-sm"
          @click="clearFilters"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Log Table -->
    <div class="bg-base-100 rounded-lg shadow-md overflow-hidden">
      <div v-if="loading" class="p-8 flex justify-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <div v-else-if="error" class="p-8 text-center text-error">
        <p>Error loading logs: {{ error }}</p>
        <button class="btn btn-sm btn-outline mt-4" @click="fetchLogs">Retry</button>
      </div>
      <div v-else-if="!logs || logs.length === 0" class="p-8 text-center">
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p class="text-base-content/70">No logs found matching your criteria</p>
          <button class="btn btn-sm btn-outline mt-4" @click="clearFilters">Reset Filters</button>
        </div>
      </div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Action</th>
                <th>User</th>
                <th>IP Address</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id" class="hover">
                <td class="text-xs">{{ formatDate(log.timestamp) }}</td>
                <td>
                  <div class="badge" :class="{
                    'badge-primary': log.type === 'auth',
                    'badge-secondary': log.type === 'user',
                    'badge-accent': log.type === 'system',
                    'badge-error': log.type === 'error'
                  }">
                    {{ formatType(log.type) }}
                  </div>
                </td>
                <td>{{ log.action }}</td>
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
                <td class="font-mono text-xs">{{ log.ipAddress || 'N/A' }}</td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': log.status === 'success',
                    'badge-error': log.status === 'error',
                    'badge-warning': log.status === 'warning'
                  }">
                    {{ log.status }}
                  </div>
                </td>
                <td>
                  <button 
                    class="btn btn-ghost btn-xs" 
                    @click="showLogDetails(log)"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="px-4 py-3 flex items-center justify-between border-t border-base-200">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-base-content/70">
                Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalLogs) }}</span> of <span class="font-medium">{{ totalLogs }}</span> logs
              </p>
            </div>
            <div>
              <div class="join">
                <button 
                  class="join-item btn btn-sm" 
                  :class="{'btn-disabled': currentPage === 1}"
                  @click="changePage(currentPage - 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button 
                  v-for="page in paginationPages" 
                  :key="page" 
                  class="join-item btn btn-sm" 
                  :class="{'btn-active': page === currentPage}"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
                <button 
                  class="join-item btn btn-sm" 
                  :class="{'btn-disabled': currentPage === totalPages}"
                  @click="changePage(currentPage + 1)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex sm:hidden justify-between w-full">
            <button 
              class="btn btn-sm" 
              :class="{'btn-disabled': currentPage === 1}"
              @click="changePage(currentPage - 1)"
            >
              Previous
            </button>
            <span class="self-center text-sm">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
              class="btn btn-sm" 
              :class="{'btn-disabled': currentPage === totalPages}"
              @click="changePage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Actions -->
    <div class="flex justify-end gap-3 mt-6">
      <button class="btn btn-outline btn-sm gap-2" @click="exportLogs('csv')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        Export CSV
      </button>
      <button class="btn btn-outline btn-sm gap-2" @click="exportLogs('json')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
        </svg>
        Export JSON
      </button>
    </div>

    <!-- Log Detail Modal -->
    <div class="modal" :class="{'modal-open': selectedLog !== null}">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-lg mb-4 flex items-center">
          <div class="badge mr-2" :class="{
            'badge-primary': selectedLog?.type === 'auth',
            'badge-secondary': selectedLog?.type === 'user',
            'badge-accent': selectedLog?.type === 'system',
            'badge-error': selectedLog?.type === 'error'
          }">
            {{ selectedLog ? formatType(selectedLog.type) : '' }}
          </div>
          Log Details
        </h3>
        
        <div v-if="selectedLog" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm font-semibold text-base-content/70">Time</div>
              <div>{{ formatDate(selectedLog.timestamp, true) }}</div>
            </div>
            <div>
              <div class="text-sm font-semibold text-base-content/70">Status</div>
              <div class="badge" :class="{
                'badge-success': selectedLog.status === 'success',
                'badge-error': selectedLog.status === 'error',
                'badge-warning': selectedLog.status === 'warning'
              }">
                {{ selectedLog.status }}
              </div>
            </div>
            <div>
              <div class="text-sm font-semibold text-base-content/70">Action</div>
              <div>{{ selectedLog.action }}</div>
            </div>
            <div>
              <div class="text-sm font-semibold text-base-content/70">User</div>
              <div class="flex items-center gap-2">
                <div class="avatar" v-if="selectedLog.user">
                  <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-xs font-bold text-primary">{{ selectedLog.user.charAt(0) }}</span>
                  </div>
                </div>
                {{ selectedLog.user || 'System' }}
              </div>
            </div>
            <div>
              <div class="text-sm font-semibold text-base-content/70">IP Address</div>
              <div class="font-mono">{{ selectedLog.ipAddress || 'N/A' }}</div>
            </div>
          </div>
          
          <div v-if="selectedLog.description">
            <div class="text-sm font-semibold text-base-content/70 mb-1">Description</div>
            <div>{{ selectedLog.description }}</div>
          </div>
          
          <div v-if="selectedLog.details">
            <div class="text-sm font-semibold text-base-content/70 mb-1">Details</div>
            <div class="bg-base-300 p-3 rounded-lg">
              <pre class="whitespace-pre-wrap text-sm font-mono overflow-x-auto">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
            </div>
          </div>
        </div>
        
        <div class="modal-action">
          <button class="btn" @click="selectedLog = null">Close</button>
        </div>
      </div>
      <label class="modal-backdrop" @click="selectedLog = null"></label>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import useSiteSettings from "../../compositions/useSiteSettings";

const { loading, error, logs, getLogs } = useSiteSettings();

const filters = reactive({
  type: '',
  status: '',
  fromDate: '',
  toDate: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(20);
const totalLogs = ref(0);
const totalPages = computed(() => Math.ceil(totalLogs.value / itemsPerPage.value));
const selectedLog = ref(null);

// Computed
const paginationPages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  
  if (current <= 3) {
    return [1, 2, 3, 4, 5];
  }
  
  if (current >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }
  
  return [current - 2, current - 1, current, current + 1, current + 2];
});

const fetchLogs = () => {
  getLogs(filters);
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchLogs();
};

const clearFilters = () => {
  filters.type = '';
  filters.status = '';
  filters.fromDate = '';
  filters.toDate = '';
  applyFilters();
};

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchLogs();
};

const showLogDetails = (log) => {
  selectedLog.value = log;
};

const setDateRange = (range) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  filters.toDate = `${year}-${month}-${day}`;
  
  switch (range) {
    case 'today':
      filters.fromDate = filters.toDate;
      break;
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      filters.fromDate = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      break;
    case 'week':
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filters.fromDate = `${weekAgo.getFullYear()}-${String(weekAgo.getMonth() + 1).padStart(2, '0')}-${String(weekAgo.getDate()).padStart(2, '0')}`;
      break;
  }
};

const formatDate = (dateString, includeSeconds = false) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (includeSeconds) {
    return date.toLocaleString();
  }
  return date.toLocaleString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const formatType = (type) => {
  switch (type) {
    case 'auth': return 'Auth';
    case 'user': return 'User';
    case 'system': return 'System';
    case 'error': return 'Error';
    default: return type;
  }
};

const exportLogs = (format) => {
  if (!logs.value || logs.value.length === 0) return;
  
  const exportData = logs.value.map(log => ({
    id: log.id,
    timestamp: formatDate(log.timestamp, true),
    type: formatType(log.type),
    action: log.action,
    user: log.user || 'System',
    ipAddress: log.ipAddress || 'N/A',
    status: log.status,
    details: log.details ? JSON.stringify(log.details) : ''
  }));
  
  if (format === 'csv') {
    // Generate CSV
    const headers = Object.keys(exportData[0]).join(',');
    const rows = exportData.map(log => Object.values(log).map(value => `"${value}"`).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = `logs_export_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  } else if (format === 'json') {
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' }));
    link.download = `logs_export_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
  }
};

onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
</style> 