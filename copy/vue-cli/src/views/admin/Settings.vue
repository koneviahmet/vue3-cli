<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="text-2xl font-bold text-base-content">Admin Settings</div>
      <router-link to="/admin" class="btn btn-sm btn-outline">
        Back to Dashboard
      </router-link>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="bg-base-100 p-6 rounded-lg shadow h-fit">
        <h3 class="text-lg font-medium mb-4">Settings</h3>
        <ul class="menu bg-base-200 rounded-lg">
          <li>
            <button @click="activeTab = 'general'" :class="{'active': activeTab === 'general'}" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              General
            </button>
          </li>
          <li>
            <button @click="activeTab = 'security'" :class="{'active': activeTab === 'security'}" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Security
            </button>
          </li>
          <li>
            <button @click="activeTab = 'notifications'" :class="{'active': activeTab === 'notifications'}" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Notifications
            </button>
          </li>
          <li>
            <button @click="activeTab = 'backup'" :class="{'active': activeTab === 'backup'}" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              Backup & Restore
            </button>
          </li>
          <li>
            <button @click="activeTab = 'api'" :class="{'active': activeTab === 'api'}" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
              </svg>
              API Access
            </button>
          </li>
          <li>
            <router-link to="/admin/site-settings" class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" />
              </svg>
              Site Settings
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- Settings Content -->
      <div class="md:col-span-2 bg-base-100 p-6 rounded-lg shadow">
        <div v-if="activeTab === 'general'" class="space-y-6">
          <h2 class="text-xl font-medium border-b pb-3">General Settings</h2>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Admin Email</span>
            </label>
            <input v-model="settings.adminEmail" type="email" class="input input-bordered w-full" placeholder="admin@example.com" />
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Date Format</span>
            </label>
            <select v-model="settings.dateFormat" class="select select-bordered w-full">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Time Format</span>
            </label>
            <select v-model="settings.timeFormat" class="select select-bordered w-full">
              <option value="12">12-hour (AM/PM)</option>
              <option value="24">24-hour</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.enableUserRegistration" class="checkbox" />
              <span class="label-text">Allow User Registration</span>
            </label>
          </div>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.requireEmailVerification" class="checkbox" />
              <span class="label-text">Require Email Verification</span>
            </label>
          </div>
        </div>
        
        <div v-if="activeTab === 'security'" class="space-y-6">
          <h2 class="text-xl font-medium border-b pb-3">Security Settings</h2>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Session Timeout (minutes)</span>
            </label>
            <input v-model="settings.sessionTimeout" type="number" min="5" class="input input-bordered w-full" />
          </div>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.enableTwoFactor" class="checkbox" />
              <span class="label-text">Enable Two-Factor Authentication</span>
            </label>
          </div>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.enforceStrongPasswords" class="checkbox" />
              <span class="label-text">Enforce Strong Passwords</span>
            </label>
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Password Expiry (days, 0 = never)</span>
            </label>
            <input v-model="settings.passwordExpiry" type="number" min="0" class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Failed Login Attempts Before Lockout</span>
            </label>
            <input v-model="settings.maxLoginAttempts" type="number" min="1" class="input input-bordered w-full" />
          </div>
        </div>
        
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <h2 class="text-xl font-medium border-b pb-3">Notification Settings</h2>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Notifications</span>
            </label>
            <div class="pl-4 space-y-3">
              <label class="label cursor-pointer justify-start gap-2">
                <input type="checkbox" v-model="settings.notifications.newUser" class="checkbox" />
                <span class="label-text">New User Registration</span>
              </label>
              
              <label class="label cursor-pointer justify-start gap-2">
                <input type="checkbox" v-model="settings.notifications.failedLogin" class="checkbox" />
                <span class="label-text">Failed Login Attempts</span>
              </label>
              
              <label class="label cursor-pointer justify-start gap-2">
                <input type="checkbox" v-model="settings.notifications.systemError" class="checkbox" />
                <span class="label-text">System Errors</span>
              </label>
              
              <label class="label cursor-pointer justify-start gap-2">
                <input type="checkbox" v-model="settings.notifications.databaseBackup" class="checkbox" />
                <span class="label-text">Database Backup Status</span>
              </label>
            </div>
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">System Alert Email</span>
            </label>
            <input v-model="settings.systemAlertEmail" type="email" class="input input-bordered w-full" placeholder="alerts@example.com" />
          </div>
        </div>
        
        <div v-if="activeTab === 'backup'" class="space-y-6">
          <h2 class="text-xl font-medium border-b pb-3">Backup & Restore</h2>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Automatic Backup Schedule</span>
            </label>
            <select v-model="settings.backupSchedule" class="select select-bordered w-full">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Backup Retention (days)</span>
            </label>
            <input v-model="settings.backupRetention" type="number" min="1" class="input input-bordered w-full" />
          </div>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.backupToCloud" class="checkbox" />
              <span class="label-text">Backup to Cloud Storage</span>
            </label>
          </div>
          
          <div class="flex gap-3 pt-3">
            <button class="btn btn-primary" @click="createBackup">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Create Backup Now
            </button>
            
            <button class="btn btn-outline" @click="showRestoreModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" transform="rotate(180 10 10)" />
              </svg>
              Restore from Backup
            </button>
          </div>
        </div>
        
        <div v-if="activeTab === 'api'" class="space-y-6">
          <h2 class="text-xl font-medium border-b pb-3">API Access Settings</h2>
          
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="settings.enableApiAccess" class="checkbox" />
              <span class="label-text">Enable API Access</span>
            </label>
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">API Rate Limit (requests per minute)</span>
            </label>
            <input v-model="settings.apiRateLimit" type="number" min="10" class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">API Token Expiry (days, 0 = never)</span>
            </label>
            <input v-model="settings.apiTokenExpiry" type="number" min="0" class="input input-bordered w-full" />
          </div>
          
          <div class="space-y-4 pt-3">
            <div class="flex justify-between items-center">
              <div class="text-lg font-medium">API Keys</div>
              <button class="btn btn-sm btn-primary" @click="showGenerateApiKeyModal = true">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Generate New API Key
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Last Used</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!settings.apiKeys || settings.apiKeys.length === 0">
                    <td colspan="4" class="text-center py-4 text-base-content/60">No API keys found</td>
                  </tr>
                  <tr v-else v-for="key in settings.apiKeys" :key="key.id" class="hover:bg-base-200">
                    <td class="font-medium">{{ key.name }}</td>
                    <td>{{ new Date(key.created).toLocaleDateString() }}</td>
                    <td>{{ key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never' }}</td>
                    <td>
                      <button @click="revokeApiKey(key.id)" class="btn btn-xs btn-error">Revoke</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6 pt-4 border-t">
          <button @click="resetSettings" class="btn btn-outline">Reset</button>
          <button @click="saveSettings" class="btn btn-primary" :disabled="loading">
            <span v-if="loading">Saving...</span>
            <span v-else>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Restore Backup Modal -->
    <div v-if="showRestoreModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">Restore from Backup</h3>
        
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text">Select Backup File</span>
          </label>
          <select class="select select-bordered w-full" v-model="selectedBackup">
            <option disabled value="">Choose a backup</option>
            <option value="backup_20230901_120000">2023-09-01 12:00:00</option>
            <option value="backup_20230902_120000">2023-09-02 12:00:00</option>
            <option value="backup_20230903_120000">2023-09-03 12:00:00</option>
          </select>
        </div>
        
        <div class="alert alert-warning mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning! Restoring a backup will overwrite current data. This action cannot be undone.</span>
        </div>
        
        <div class="flex justify-end gap-2">
          <button @click="showRestoreModal = false" class="btn btn-outline">Cancel</button>
          <button @click="restoreBackup" class="btn btn-warning" :disabled="!selectedBackup || loading">
            <span v-if="loading">Restoring...</span>
            <span v-else>Restore Backup</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Generate API Key Modal -->
    <div v-if="showGenerateApiKeyModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">Generate New API Key</h3>
        
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text">API Key Name</span>
          </label>
          <input v-model="newApiKeyName" type="text" class="input input-bordered w-full" placeholder="e.g., Mobile App" />
        </div>
        
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text">Permissions</span>
          </label>
          <div class="pl-4 space-y-2">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="newApiKeyPermissions.read" class="checkbox" />
              <span class="label-text">Read</span>
            </label>
            
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="newApiKeyPermissions.write" class="checkbox" />
              <span class="label-text">Write</span>
            </label>
            
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" v-model="newApiKeyPermissions.delete" class="checkbox" />
              <span class="label-text">Delete</span>
            </label>
          </div>
        </div>
        
        <div v-if="newApiKey" class="alert alert-success mb-4">
          <div>
            <h3 class="font-bold">API Key Created Successfully!</h3>
            <div class="text-xs mt-2">Copy this key now. For security reasons, it won't be shown again.</div>
            <div class="mt-2 bg-base-300 p-2 rounded break-all font-mono text-sm">{{ newApiKey }}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-2">
          <button @click="closeApiKeyModal" class="btn btn-outline">
            {{ newApiKey ? 'Close' : 'Cancel' }}
          </button>
          <button 
            v-if="!newApiKey"
            @click="generateApiKey" 
            class="btn btn-primary" 
            :disabled="!newApiKeyName || loading"
          >
            <span v-if="loading">Generating...</span>
            <span v-else>Generate Key</span>
          </button>
          <button 
            v-else
            @click="copyApiKey" 
            class="btn btn-secondary"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { notyfError, notyfSuccess } from "../../utils/notyf.js";

const loading = ref(false);
const activeTab = ref('general');
const showRestoreModal = ref(false);
const showGenerateApiKeyModal = ref(false);
const selectedBackup = ref('');
const newApiKeyName = ref('');
const newApiKey = ref('');
const newApiKeyPermissions = reactive({
  read: true,
  write: false,
  delete: false
});

// Sample settings data
const settings = reactive({
  adminEmail: 'admin@example.com',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24',
  enableUserRegistration: true,
  requireEmailVerification: true,
  sessionTimeout: 30,
  enableTwoFactor: false,
  enforceStrongPasswords: true,
  passwordExpiry: 90,
  maxLoginAttempts: 5,
  notifications: {
    newUser: true,
    failedLogin: true,
    systemError: true,
    databaseBackup: false
  },
  systemAlertEmail: 'alerts@example.com',
  backupSchedule: 'daily',
  backupRetention: 30,
  backupToCloud: true,
  enableApiAccess: true,
  apiRateLimit: 60,
  apiTokenExpiry: 30,
  apiKeys: [
    {
      id: 1,
      name: 'Website Integration',
      created: '2023-01-15T00:00:00.000Z',
      lastUsed: '2023-09-10T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'Mobile App',
      created: '2023-05-22T00:00:00.000Z',
      lastUsed: null
    }
  ]
});

const originalSettings = { ...settings };

const saveSettings = () => {
  loading.value = true;
  
  setTimeout(() => {
    // In a real app, this would save to API
    Object.assign(originalSettings, settings);
    loading.value = false;
    notyfSuccess('Settings saved successfully');
  }, 500);
};

const resetSettings = () => {
  // Reset to original values
  Object.assign(settings, originalSettings);
  notyfSuccess('Settings reset to original values');
};

const createBackup = () => {
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
    notyfSuccess('Backup created successfully');
  }, 1000);
};

const restoreBackup = () => {
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
    showRestoreModal.value = false;
    selectedBackup.value = '';
    notyfSuccess('Backup restored successfully');
  }, 2000);
};

const generateApiKey = () => {
  loading.value = true;
  
  setTimeout(() => {
    // In a real app, this would call an API to generate a key
    newApiKey.value = 'api_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Add to settings
    settings.apiKeys.push({
      id: settings.apiKeys.length + 1,
      name: newApiKeyName.value,
      created: new Date().toISOString(),
      lastUsed: null
    });
    
    loading.value = false;
  }, 500);
};

const copyApiKey = () => {
  navigator.clipboard.writeText(newApiKey.value);
  notyfSuccess('API key copied to clipboard');
};

const closeApiKeyModal = () => {
  showGenerateApiKeyModal.value = false;
  newApiKeyName.value = '';
  newApiKey.value = '';
  Object.assign(newApiKeyPermissions, {
    read: true,
    write: false,
    delete: false
  });
};

const revokeApiKey = (keyId) => {
  // In a real app, this would call an API to revoke the key
  settings.apiKeys = settings.apiKeys.filter(key => key.id !== keyId);
  notyfSuccess('API key revoked successfully');
};

onMounted(() => {
  // In a real app, this would fetch settings from API
});
</script>

<style scoped>
</style> 