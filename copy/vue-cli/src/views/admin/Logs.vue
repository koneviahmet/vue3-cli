<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="text-2xl font-bold text-base-content">System Logs</div>
      <router-link to="/admin" class="btn btn-sm btn-outline">
        Back to Dashboard
      </router-link>
    </div>
    
    <div class="bg-base-100 p-6 rounded-lg shadow mb-6">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Filter by Type</span>
          </label>
          <select v-model="filters.type" class="select select-bordered w-full min-w-[200px]">
            <option value="">All Types</option>
            <option value="auth">Authentication</option>
            <option value="user">User Action</option>
            <option value="system">System</option>
            <option value="error">Error</option>
          </select>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Filter by Status</span>
          </label>
          <select v-model="filters.status" class="select select-bordered w-full min-w-[200px]">
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">From Date</span>
          </label>
          <input type="date" v-model="filters.fromDate" class="input input-bordered w-full min-w-[200px]" />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">To Date</span>
          </label>
          <input type="date" v-model="filters.toDate" class="input input-bordered w-full min-w-[200px]" />
        </div>
        
        <div class="form-control">
          <button @click="applyFilters" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            Filter
          </button>
        </div>
        
        <div class="form-control ml-auto">
          <button @click="clearFilters" class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Clear
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="bg-base-100 p-6 rounded-lg shadow animate-pulse">
      <div v-for="i in 10" :key="i" class="h-10 bg-base-300 rounded my-2"></div>
    </div>
    
    <div v-else class="bg-base-100 p-6 rounded-lg shadow">
      <div v-if="!logs || logs.length === 0" class="text-center py-8 text-base-content/60">
        No logs found matching the filter criteria
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
              <tr v-for="log in logs" :key="log.id" class="border-b border-base-300">
                <td class="py-3">{{ new Date(log.timestamp).toLocaleString() }}</td>
                <td class="py-3">
                  <span class="badge" :class="{
                    'badge-primary': log.type === 'auth',
                    'badge-secondary': log.type === 'user',
                    'badge-accent': log.type === 'system',
                    'badge-error': log.type === 'error'
                  }">{{ log.type }}</span>
                </td>
                <td class="py-3">{{ log.action }}</td>
                <td class="py-3">{{ log.user || 'System' }}</td>
                <td class="py-3">{{ log.ipAddress }}</td>
                <td class="py-3">
                  <span class="badge" :class="{
                    'badge-success': log.status === 'success',
                    'badge-error': log.status === 'error', 
                    'badge-warning': log.status === 'warning'
                  }">{{ log.status }}</span>
                </td>
                <td class="py-3">
                  <button @click="showLogDetails(log)" class="btn btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex justify-between items-center mt-6">
          <div class="text-sm text-base-content/70">
            Showing {{ logs.length }} of {{ totalLogs }} logs
          </div>
          
          <div class="flex items-center gap-2">
            <button 
              class="btn btn-sm btn-outline" 
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              Previous
            </button>
            <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
            <button 
              class="btn btn-sm btn-outline" 
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Log Details Modal -->
    <div v-if="selectedLog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Log Details</h3>
          <button @click="selectedLog = null" class="btn btn-sm btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div class="text-sm text-base-content/70">Time</div>
            <div class="font-medium">{{ new Date(selectedLog.timestamp).toLocaleString() }}</div>
          </div>
          
          <div>
            <div class="text-sm text-base-content/70">Type</div>
            <div class="font-medium">
              <span class="badge" :class="{
                'badge-primary': selectedLog.type === 'auth',
                'badge-secondary': selectedLog.type === 'user',
                'badge-accent': selectedLog.type === 'system',
                'badge-error': selectedLog.type === 'error'
              }">{{ selectedLog.type }}</span>
            </div>
          </div>
          
          <div>
            <div class="text-sm text-base-content/70">Action</div>
            <div class="font-medium">{{ selectedLog.action }}</div>
          </div>
          
          <div>
            <div class="text-sm text-base-content/70">User</div>
            <div class="font-medium">{{ selectedLog.user || 'System' }}</div>
          </div>
          
          <div>
            <div class="text-sm text-base-content/70">IP Address</div>
            <div class="font-medium">{{ selectedLog.ipAddress }}</div>
          </div>
          
          <div>
            <div class="text-sm text-base-content/70">Status</div>
            <div class="font-medium">
              <span class="badge" :class="{
                'badge-success': selectedLog.status === 'success',
                'badge-error': selectedLog.status === 'error', 
                'badge-warning': selectedLog.status === 'warning'
              }">{{ selectedLog.status }}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-4">
          <div class="text-sm text-base-content/70 mb-1">Description</div>
          <div class="font-medium">{{ selectedLog.description }}</div>
        </div>
        
        <div v-if="selectedLog.details">
          <div class="text-sm text-base-content/70 mb-1">Details</div>
          <pre class="bg-base-300 p-4 rounded-md overflow-x-auto">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
        </div>
      </div>
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

const applyFilters = () => {
  currentPage.value = 1;
  fetchLogs();
};

const clearFilters = () => {
  filters.type = '';
  filters.status = '';
  filters.fromDate = '';
  filters.toDate = '';
  currentPage.value = 1;
  fetchLogs();
};

const changePage = (page) => {
  currentPage.value = page;
  fetchLogs();
};

const fetchLogs = async () => {
  try {
    await getLogs(currentPage.value, itemsPerPage.value);
    // In a real application, you would apply the filters on the server
    // For now, we'll simulate the total logs count
    totalLogs.value = 100; // This would come from the server in a real app
  } catch (err) {
    console.error('Error fetching logs:', err);
  }
};

const showLogDetails = (log) => {
  selectedLog.value = log;
};

onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
</style> 