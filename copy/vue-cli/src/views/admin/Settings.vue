<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">Admin Settings</h1>
        <p class="text-sm opacity-70 mt-1">Configure your BookSwap application settings</p>
      </div>
      <router-link to="/admin" class="btn btn-outline btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Dashboard
      </router-link>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Settings Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-base-100 rounded-lg shadow-lg">
          <div class="p-4 border-b border-base-200">
            <h3 class="font-medium text-lg">Settings</h3>
          </div>
          <ul class="menu p-3 [&_li>*]:rounded-lg">
            <li>
              <button @click="onActiveTabChange('general')" :class="{'active': activeTab === 'general'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                General
              </button>
            </li>
            <li>
              <button @click="onActiveTabChange('notifications')" :class="{'active': activeTab === 'notifications'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Notifications
              </button>
            </li>
            <li>
              <button @click="onActiveTabChange('security')" :class="{'active': activeTab === 'security'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Security
              </button>
            </li>
            <li>
              <button @click="onActiveTabChange('backup')" :class="{'active': activeTab === 'backup'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                Backup & Restore
              </button>
            </li>
            <li>
              <button @click="onActiveTabChange('api')" :class="{'active': activeTab === 'api'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                </svg>
                API Access
              </button>
            </li>
            <li>
              <button @click="onActiveTabChange('migration')" :class="{'active': activeTab === 'migration'}" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                Database Migration
              </button>
            </li>
            <li class="mt-2">
              <router-link to="/admin/site-settings" class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" />
                </svg>
                Site Settings
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Settings Content -->
      <div class="lg:col-span-3">
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
          <div v-if="activeTab === 'general'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">General Settings</h2>
            
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">Admin Email</span>
              </label>
              <input v-model="settings.adminEmail" type="email" class="input input-bordered w-full" placeholder="admin@example.com" />
              <label class="label">
                <span class="label-text-alt text-base-content/60">Primary email for admin notifications</span>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Date Format</span>
                </label>
                <select v-model="settings.dateFormat" class="select select-bordered w-full">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Time Format</span>
                </label>
                <select v-model="settings.timeFormat" class="select select-bordered w-full">
                  <option value="12">12-hour (AM/PM)</option>
                  <option value="24">24-hour</option>
                </select>
              </div>
            </div>
            
            <div class="form-control rounded-lg bg-base-200 p-4">
              <div class="text-sm font-medium mb-3">Registration Settings</div>
              <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" v-model="settings.enableUserRegistration" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Allow User Registration</div>
                  <div class="text-xs opacity-70">Users can create new accounts on the site</div>
                </div>
              </label>
              
              <label class="label cursor-pointer justify-start gap-3 mt-2">
                <input type="checkbox" v-model="settings.requireEmailVerification" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Require Email Verification</div>
                  <div class="text-xs opacity-70">Users must verify their email before accessing the site</div>
                </div>
              </label>
            </div>
          </div>
          
          <div v-if="activeTab === 'security'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">Security Settings</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Session Timeout (minutes)</span>
                </label>
                <input v-model="settings.sessionTimeout" type="number" min="5" class="input input-bordered w-full" />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">User will be logged out after this period of inactivity</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Failed Login Attempts Before Lockout</span>
                </label>
                <input v-model="settings.maxLoginAttempts" type="number" min="1" class="input input-bordered w-full" />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Number of failed attempts before account is temporarily locked</span>
                </label>
              </div>
            </div>
            
            <div class="form-control rounded-lg bg-base-200 p-4">
              <div class="text-sm font-medium mb-3">Authentication Options</div>
              <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" v-model="settings.enableTwoFactor" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Enable Two-Factor Authentication</div>
                  <div class="text-xs opacity-70">Add an extra layer of security during login</div>
                </div>
              </label>
              
              <label class="label cursor-pointer justify-start gap-3 mt-2">
                <input type="checkbox" v-model="settings.enforceStrongPasswords" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Enforce Strong Passwords</div>
                  <div class="text-xs opacity-70">Require complex passwords with letters, numbers, and special characters</div>
                </div>
              </label>
            </div>
            
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">Password Expiry (days, 0 = never)</span>
              </label>
              <input v-model="settings.passwordExpiry" type="number" min="0" class="input input-bordered w-full" />
              <label class="label">
                <span class="label-text-alt text-base-content/60">Users will be prompted to change passwords after this many days</span>
              </label>
            </div>
          </div>
          
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">Notification Settings</h2>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">System Alert Email</span>
              </label>
              <input v-model="settings.systemAlertEmail" type="email" class="input input-bordered w-full" placeholder="alerts@example.com" />
              <label class="label">
                <span class="label-text-alt text-base-content/60">Email address to receive system alerts and notifications</span>
              </label>
            </div>
            
            <div class="form-control rounded-lg bg-base-200 p-4">
              <div class="text-sm font-medium mb-3">Email Notifications</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.notifications.newUser" class="checkbox checkbox-primary" />
                  <div class="label-text">New User Registration</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.notifications.failedLogin" class="checkbox checkbox-primary" />
                  <div class="label-text">Failed Login Attempts</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.notifications.systemError" class="checkbox checkbox-primary" />
                  <div class="label-text">System Errors</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.notifications.databaseBackup" class="checkbox checkbox-primary" />
                  <div class="label-text">Database Backup Status</div>
                </label>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'backup'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">Backup & Restore</h2>
            
            <div class="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Create and manage backups of your PocketBase database and files.</span>
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase URL</span>
              </label>
              <input v-model="backupSettings.pocketbaseUrl" type="text" class="input input-bordered w-full" placeholder="http://localhost:8090" />
              <label class="label">
                <span class="label-text-alt text-base-content/60">URL of your PocketBase server</span>
              </label>
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase Admin Email</span>
              </label>
              <input v-model="backupSettings.adminEmail" type="email" class="input input-bordered w-full" placeholder="admin@example.com" />
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase Admin Password</span>
              </label>
              <input v-model="backupSettings.adminPassword" type="password" class="input input-bordered w-full" />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Backup Directory</span>
                </label>
                <input v-model="backupSettings.backupDir" type="text" class="input input-bordered w-full" placeholder="/path/to/backups" />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Local directory to store backups</span>
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">Backup Retention (days)</span>
                </label>
                <input v-model="backupSettings.backupRetention" type="number" min="1" class="input input-bordered w-full" />
              </div>
            </div>
            
            <div class="form-control rounded-lg bg-base-200 p-4 mt-4">
              <div class="text-sm font-medium mb-3">Backup Options</div>
              <label class="label cursor-pointer justify-start gap-3">
                <input type="checkbox" v-model="backupSettings.includeFiles" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Include Files</div>
                  <div class="text-xs opacity-70">Backup uploaded files along with database</div>
                </div>
              </label>
              
              <label class="label cursor-pointer justify-start gap-3 mt-2">
                <input type="checkbox" v-model="backupSettings.compressBackup" class="checkbox checkbox-primary" />
                <div>
                  <div class="label-text font-medium">Compress Backup</div>
                  <div class="text-xs opacity-70">Create compressed archives of backups</div>
                </div>
              </label>
            </div>
            
            <div v-if="backupStatus" class="alert" :class="{
              'alert-success': backupStatus.type === 'success',
              'alert-error': backupStatus.type === 'error',
              'alert-warning': backupStatus.type === 'warning',
              'alert-info': backupStatus.type === 'info'
            }">
              <div class="flex items-center gap-2">
                <span v-if="backupStatus.type === 'success'" class="text-success">✓</span>
                <span v-if="backupStatus.type === 'error'" class="text-error">✗</span>
                <span v-if="backupStatus.type === 'warning'" class="text-warning">⚠</span>
                <span v-if="backupStatus.type === 'info'" class="text-info">ℹ</span>
                {{ backupStatus.message }}
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 mt-6">
              <button class="btn btn-primary gap-2" @click="createBackup" :disabled="backupInProgress">
                <svg v-if="!backupInProgress" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <span v-else class="loading loading-spinner loading-sm"></span>
                Backup Now
              </button>
              <input
                ref="restoreFileInput"
                type="file"
                accept=".zip,.pb"
                class="hidden"
                @change="onRestoreFileChange"
              />
              <button class="btn btn-outline gap-2" @click="$refs.restoreFileInput.click()" :disabled="restoreInProgress">
                <svg v-if="!restoreInProgress" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7-10.586l-3.293 3.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 6.414v7.586a1 1 0 11-2 0V6.414z" clip-rule="evenodd" />
                </svg>
                <span v-else class="loading loading-spinner loading-sm"></span>
                Restore Backup
              </button>
            </div>
            
            <div v-if="backupList.length > 0" class="mt-6">
              <h3 class="font-medium mb-3">Available Backups</h3>
              <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Backup Name</th>
                      <th>Size</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="backup in backupList" :key="backup.name">
                      <td>{{ backup.name }}</td>
                      <td>{{ formatFileSize(backup.size) }}</td>
                      <td>{{ formatDate(backup.date) }}</td>
                      <td class="flex gap-2">
                        <button class="btn btn-xs btn-outline" @click="downloadBackup(backup)">
                          Download
                        </button>
                        <button class="btn btn-xs btn-error" @click="deleteBackup(backup)">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'api'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">API Access</h2>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">API Key</span>
              </label>
              <div class="join w-full">
                <input type="text" readonly :value="settings.apiKey || 'No API key generated'" class="join-item input input-bordered w-full" />
                <button class="join-item btn btn-primary" @click="generateApiKey">Generate</button>
              </div>
              <label class="label">
                <span class="label-text-alt text-base-content/60">Keep this key secret, it provides full access to your API</span>
              </label>
            </div>
            
            <div class="form-control rounded-lg bg-base-200 p-4">
              <div class="text-sm font-medium mb-3">API Permissions</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.apiPermissions.read" class="checkbox checkbox-primary" />
                  <div class="label-text">Read Access</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.apiPermissions.write" class="checkbox checkbox-primary" />
                  <div class="label-text">Write Access</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.apiPermissions.delete" class="checkbox checkbox-primary" />
                  <div class="label-text">Delete Access</div>
                </label>
                
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" v-model="settings.apiPermissions.admin" class="checkbox checkbox-primary" />
                  <div class="label-text">Admin Access</div>
                </label>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'migration'" class="space-y-6">
            <h2 class="text-xl font-medium text-primary border-b border-base-200 pb-3">Database Migration</h2>
            
            <div class="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Migrate data from JSON-Server to PocketBase. This will transfer tables and data from your JSON server database to PocketBase.</span>
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase URL</span>
              </label>
              <input v-model="migrationSettings.pocketbaseUrl" type="text" class="input input-bordered w-full" placeholder="http://localhost:8090" />
              <label class="label">
                <span class="label-text-alt text-base-content/60">URL of your PocketBase server</span>
              </label>
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase Admin Email</span>
              </label>
              <input v-model="migrationSettings.adminEmail" type="email" class="input input-bordered w-full" placeholder="admin@example.com" />
            </div>
            
            <div class="form-control w-full mb-6">
              <label class="label">
                <span class="label-text font-medium">PocketBase Admin Password</span>
              </label>
              <input v-model="migrationSettings.adminPassword" type="password" class="input input-bordered w-full" />
            </div>
            
            <div class="space-y-4">
              <h3 class="font-medium">Available Tables</h3>
              
              <div v-if="tablesLoading" class="flex justify-center py-4">
                <span class="loading loading-spinner loading-md"></span>
              </div>
              
              <div v-else-if="tablesError" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error loading tables: {{ tablesError }}</span>
              </div>
              
              <div v-else-if="tables.length === 0" class="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>No tables found in JSON-Server database.</span>
              </div>
              
              <div v-else class="overflow-x-auto">
                <table class="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" class="checkbox" 
                            :checked="selectedTables.length === tables.length"
                            @change="toggleAllTables" />
                        </label>
                      </th>
                      <th>Table Name</th>
                      <th>Records</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="table in tables" :key="table.name">
                      <td>
                        <label>
                          <input type="checkbox" class="checkbox" 
                            :checked="selectedTables.includes(table.name)"
                            @change="toggleTableSelection(table.name)" />
                        </label>
                      </td>
                      <td>{{ table.name }}</td>
                      <td>{{ table.count }}</td>
                      <td>
                        <span v-if="migrationStatus[table.name]" 
                              :class="{
                                'badge badge-success': migrationStatus[table.name] === 'completed',
                                'badge badge-error': migrationStatus[table.name] === 'failed',
                                'badge badge-warning': migrationStatus[table.name] === 'pending'
                              }">
                          {{ migrationStatus[table.name] }}
                        </span>
                        <span v-else class="badge badge-ghost">Not migrated</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="flex justify-end gap-2 mt-4">
                <button class="btn btn-outline" @click="refreshTables">Refresh Tables</button>
                <button class="btn btn-primary" 
                        :disabled="selectedTables.length === 0 || migrationInProgress" 
                        @click="migrateSelectedTables">
                  <span v-if="migrationInProgress" class="loading loading-spinner loading-xs"></span>
                  Migrate Selected Tables
                </button>
              </div>
              
              <!-- Migration Log -->
              <div v-if="migrationLogs.length > 0" class="mt-6">
                <h3 class="font-medium mb-2">Migration Log</h3>
                <div class="bg-base-300 p-3 rounded-lg h-48 overflow-y-auto text-sm font-mono">
                  <div v-for="(log, index) in migrationLogs" :key="index" 
                       :class="{'text-success': log.type === 'success', 
                                'text-error': log.type === 'error',
                                'text-warning': log.type === 'warning',
                                'opacity-70': log.type === 'info'}">
                    [{{ log.timestamp }}] {{ log.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 pt-4 border-t border-base-200 flex justify-end gap-3">
            <button type="button" class="btn btn-outline" @click="resetSettings">Reset</button>
            <button type="submit" class="btn btn-primary" @click="saveSettings">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import jsonServerData from '../../data/db.json'
// Default settings
const settings = ref({
  adminEmail: import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12',
  enableUserRegistration: true,
  requireEmailVerification: true,
  sessionTimeout: 30,
  enableTwoFactor: false,
  enforceStrongPasswords: true,
  passwordExpiry: 90,
  maxLoginAttempts: 5,
  systemAlertEmail: 'alerts@bookswap.com',
  notifications: {
    newUser: true,
    failedLogin: true,
    systemError: true,
    databaseBackup: false
  },
  apiKey: '',
  apiPermissions: {
    read: true,
    write: false,
    delete: false,
    admin: false
  }
});

const migrationSettings = ref({
  pocketbaseUrl: import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090',
  adminEmail: import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL,
  adminPassword: import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD,
});

const backupSettings = ref({
  pocketbaseUrl: import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090',
  adminEmail: import.meta.env.VITE_POCKETBASE_ADMIN_EMAIL,
  adminPassword: import.meta.env.VITE_POCKETBASE_ADMIN_PASSWORD,
  backupDir: './pb_backups',
  backupRetention: 30,
  includeFiles: true,
  compressBackup: true
});

const activeTab = ref('general');

const onActiveTabChange = (tab) => {
  activeTab.value = tab;
};

const generateApiKey = () => {
  // Generate a random API key
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  settings.value.apiKey = result;
};

const saveSettings = () => {
  // Save settings to backend (not implemented in this example)
  console.log('Settings saved:', settings.value);
  // Here you would typically make an API call to save the settings
  alert('Settings saved successfully!');
};

const resetSettings = () => {
  // Reset to default settings or reload from backend
  if (confirm('Are you sure you want to reset all settings to their default values?')) {
    // Reload settings from backend or reset to defaults
    console.log('Settings reset');
  }
};

const tables = ref([]);
const tablesLoading = ref(false);
const tablesError = ref(null);
const selectedTables = ref([]);
const migrationStatus = ref({});
const migrationInProgress = ref(false);
const migrationLogs = ref([]);

const addMigrationLog = (message, type = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  migrationLogs.value.unshift({ message, type, timestamp });
};

const refreshTables = async () => {
  tablesLoading.value = true;
  tablesError.value = null;
  
  try {
    // Get database structure from JSON server

    
    const tableList = [];
    for (const [tableName, records] of Object.entries(jsonServerData)) {
      if (Array.isArray(records)) {
        tableList.push({
          name: tableName,
          count: records.length,
          schema: records.length > 0 ? Object.keys(records[0]).map(field => ({ 
            name: field,
            type: typeof records[0][field]
          })) : []
        });
      }
    }
    
    tables.value = tableList;
  } catch (error) {
    console.error('Error fetching tables:', error);
    tablesError.value = error.message;
  } finally {
    tablesLoading.value = false;
  }
};

const toggleTableSelection = (tableName) => {
  const index = selectedTables.value.indexOf(tableName);
  if (index === -1) {
    selectedTables.value.push(tableName);
  } else {
    selectedTables.value.splice(index, 1);
  }
};

const toggleAllTables = (event) => {
  if (event.target.checked) {
    selectedTables.value = tables.value.map(table => table.name);
  } else {
    selectedTables.value = [];
  }
};

const migrateSelectedTables = async () => {
  if (selectedTables.value.length === 0) return;
  
  migrationInProgress.value = true;
  addMigrationLog('Starting migration process...', 'info');
  
  try {
    // Create PocketBase client
    const PocketBase = (await import('pocketbase')).default;
    
    // Validate URL format
    if (!migrationSettings.value.pocketbaseUrl.startsWith('http')) {
      addMigrationLog('Invalid PocketBase URL format. URL must start with http:// or https://', 'error');
      throw new Error('Invalid PocketBase URL');
    }
    
    addMigrationLog(`Connecting to PocketBase at ${migrationSettings.value.pocketbaseUrl}...`, 'info');
    const pb = new PocketBase(migrationSettings.value.pocketbaseUrl);
    
    // Simple connection test - we'll continue even if this fails
    try {
      const response = await fetch(migrationSettings.value.pocketbaseUrl);
      if (response.ok || response.status === 405) { // 405 is expected for plain GET without path
        addMigrationLog('PocketBase server is reachable', 'success');
      } else {
        addMigrationLog(`Warning: PocketBase server returned status: ${response.status}`, 'warning');
      }
    } catch (error) {
      addMigrationLog(`Warning: Cannot verify PocketBase server connection: ${error.message}`, 'warning');
      addMigrationLog('Continuing with authentication anyway...', 'info');
    }
    
    // Authenticate admin - using PocketBase client directly since it's working
    addMigrationLog('Authenticating with PocketBase...', 'info');
    try {
      if (!migrationSettings.value.adminEmail || !migrationSettings.value.adminPassword) {
        addMigrationLog('Admin email or password is empty', 'error');
        throw new Error('Missing credentials');
      }
      
      addMigrationLog(`Attempting to authenticate as ${migrationSettings.value.adminEmail}`, 'info');
      
      try {
        await pb.admins.authWithPassword(
          migrationSettings.value.adminEmail,
          migrationSettings.value.adminPassword
        );
      } catch (error) {
        // If the PocketBase client auth fails, try direct fetch
        addMigrationLog('Client authentication failed, trying direct API request...', 'info');
        
        const authResponse = await fetch(`${migrationSettings.value.pocketbaseUrl}/api/admins/auth-with-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: migrationSettings.value.adminEmail,
            password: migrationSettings.value.adminPassword,
          }),
        });
        
        if (!authResponse.ok) {
          const errorData = await authResponse.json();
          throw new Error(errorData.message || `Server returned ${authResponse.status}`);
        }
        
        const authData = await authResponse.json();
        pb.authStore.save(authData.token, authData.admin);
      }
      
      if (!pb.authStore.isValid) {
        throw new Error('Authentication failed - invalid auth token');
      }
      
      addMigrationLog('Authentication successful', 'success');
    } catch (error) {
      console.error('Authentication error details:', error);
      let errorMessage = error.message || 'Unknown error';
      
      if (errorMessage.includes('404')) {
        errorMessage = 'PocketBase authentication endpoint not found. Verify that the server is PocketBase and the URL is correct.';
      } else if (errorMessage.includes('400')) {
        errorMessage = 'Invalid credentials. Check your email and password.';
      } else if (errorMessage.includes("Failed to fetch") || error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to PocketBase server. Check if server is running and the URL is correct.';
      }
      
      addMigrationLog(`Authentication failed: ${errorMessage}`, 'error');
      throw new Error('Authentication failed');
    }
    
    // Process each selected table
    for (const tableName of selectedTables.value) {
      migrationStatus.value[tableName] = 'pending';
      addMigrationLog(`Processing table: ${tableName}...`, 'info');
      
      try {
        // Get data from the JSON server data directly
        const records = jsonServerData[tableName] || [];
        
        if (!Array.isArray(records) || records.length === 0) {
          addMigrationLog(`Table ${tableName} is empty or invalid`, 'warning');
          migrationStatus.value[tableName] = 'completed';
          continue;
        }
        
        // Check if collection exists in PocketBase
        let collectionExists = false;
        try {
          await pb.collections.getOne(tableName);
          collectionExists = true;
          addMigrationLog(`Collection ${tableName} already exists in PocketBase`, 'info');
        } catch (error) {
          if (error.status === 404) {
            // Collection doesn't exist, will create it
            addMigrationLog(`Collection ${tableName} does not exist in PocketBase, will create it`, 'info');
          } else {
            // Other error occurred
            addMigrationLog(`Error checking if collection ${tableName} exists: ${error.message}`, 'warning');
          }
        }
        
        // Create collection if it doesn't exist
        if (!collectionExists) {
          addMigrationLog(`Creating collection ${tableName} in PocketBase...`, 'info');
          
          // Generate schema fields based on first record
          const schemaFields = [];
          const sampleRecord = records[0];
          
          for (const [fieldName, fieldValue] of Object.entries(sampleRecord)) {
            if (fieldName === 'id') continue; // Skip ID field as PocketBase manages that
            
            // Validate field name - PocketBase has some restrictions
            if (!/^[a-zA-Z0-9_]+$/.test(fieldName)) {
              addMigrationLog(`Warning: Field name "${fieldName}" contains invalid characters. Will be skipped.`, 'warning');
              continue;
            }
            
            // Reserved field names in PocketBase
            const reservedFields = ['id', 'created', 'updated', 'collectionId', 'collectionName'];
            if (reservedFields.includes(fieldName.toLowerCase())) {
              addMigrationLog(`Warning: Field name "${fieldName}" is reserved by PocketBase. Will be skipped.`, 'warning');
              continue;
            }
            
            let fieldType = 'text'; // Default type
            let required = false;
            
            // Determine field type based on value
            if (fieldValue === null || fieldValue === undefined) {
              fieldType = 'text';
            } else if (typeof fieldValue === 'number') {
              if (Number.isInteger(fieldValue)) {
                fieldType = 'number';
              } else {
                fieldType = 'number';  // PocketBase handles floats as number
              }
            } else if (typeof fieldValue === 'boolean') {
              fieldType = 'bool';
            } else if (typeof fieldValue === 'string') {
              // Try to determine if it's a date
              const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
              if (dateRegex.test(fieldValue) && !isNaN(Date.parse(fieldValue))) {
                fieldType = 'date';
              } else if (fieldValue.length > 255) {
                fieldType = 'editor'; // Use editor type for long text
              } else {
                fieldType = 'text';
              }
            } else if (Array.isArray(fieldValue)) {
              // Skip arrays for now as they're complex to map
              addMigrationLog(`Warning: Field "${fieldName}" is an array which may not map correctly. Setting as JSON.`, 'warning');
              fieldType = 'json';
            } else if (typeof fieldValue === 'object') {
              fieldType = 'json';
            }
            
            schemaFields.push({
              name: fieldName,
              type: fieldType,
              required: required
            });
          }
          
          // Create collection with proper error handling
          try {
            if (schemaFields.length === 0) {
              addMigrationLog(`Warning: No valid fields found for collection ${tableName}`, 'warning');
            }
            
            // Sanitize collection name (PocketBase has restrictions)
            const sanitizedName = tableName.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
            if (sanitizedName !== tableName) {
              addMigrationLog(`Collection name "${tableName}" contains invalid characters. Using "${sanitizedName}" instead.`, 'warning');
            }
            
            // Create the collection
            await pb.collections.create({
              name: sanitizedName,
              type: 'base',
              schema: schemaFields,
              listRule: '',
              viewRule: '',
              createRule: '',
              updateRule: '',
              deleteRule: ''
            });
            
            addMigrationLog(`Collection ${sanitizedName} created successfully`, 'success');
            
            // If we had to rename the collection, update the tableName for record imports
            if (sanitizedName !== tableName) {
              tableName = sanitizedName;
            }
          } catch (error) {
            console.error('Collection creation error:', error);
            
            // Try to provide more details about the error
            let errorDetails = error.message || 'Unknown error';
            if (error.data && error.data.message) {
              errorDetails = error.data.message;
            }
            
            // Special handling for common errors
            if (errorDetails.includes('already exists')) {
              addMigrationLog(`Collection with name "${tableName}" already exists. Will attempt to use it anyway.`, 'warning');
              collectionExists = true;
            } else if (errorDetails.includes('schema')) {
              addMigrationLog(`Schema error: ${errorDetails}. Check field types.`, 'error');
              migrationStatus.value[tableName] = 'failed';
              continue;
            } else {
              addMigrationLog(`Failed to create collection ${tableName}: ${errorDetails}`, 'error');
              migrationStatus.value[tableName] = 'failed';
              continue;
            }
          }
        }
        
        // Import records
        addMigrationLog(`Importing ${records.length} records to ${tableName}...`, 'info');
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const record of records) {
          try {
            // Create a new object without the id field as PocketBase will generate it
            const { id, ...recordData } = record;
            
            // Convert any Date objects to ISO strings
            for (const key in recordData) {
              if (recordData[key] instanceof Date) {
                recordData[key] = recordData[key].toISOString();
              }
            }
            
            await pb.collection(tableName).create(recordData);
            successCount++;
          } catch (error) {
            errorCount++;
            console.error(`Error importing record to ${tableName}:`, error);
            
            // Log only the first few errors to avoid flooding the log
            if (errorCount <= 3) {
              let errorMsg = error.message;
              if (error.data && error.data.message) {
                errorMsg = error.data.message;
              }
              addMigrationLog(`Record import error: ${errorMsg}`, 'error');
            } else if (errorCount === 4) {
              addMigrationLog(`Additional errors occurred but are not shown`, 'warning');
            }
          }
        }
        
        addMigrationLog(`Import completed for ${tableName}: ${successCount} successful, ${errorCount} failed`, 
          errorCount > 0 ? 'warning' : 'success');
        
        migrationStatus.value[tableName] = errorCount === records.length ? 'failed' : 'completed';
      } catch (error) {
        console.error(`Error migrating table ${tableName}:`, error);
        addMigrationLog(`Failed to migrate ${tableName}: ${error.message}`, 'error');
        migrationStatus.value[tableName] = 'failed';
      }
    }
    
    addMigrationLog('Migration process completed', 'success');
  } catch (error) {
    console.error('Migration error:', error);
    addMigrationLog(`Migration failed: ${error.message}`, 'error');
  } finally {
    migrationInProgress.value = false;
  }
};

const backupStatus = ref(null);
const backupInProgress = ref(false);
const restoreInProgress = ref(false);
const backupList = ref([]);
const restoreFileInput = ref(null);
const isDemo = ref(false);

// Initialize backup list with demo data when PocketBase is unavailable
const initDemoMode = () => {
  isDemo.value = true;
  backupStatus.value = { 
    type: 'warning', 
    message: 'Running in demo mode - PocketBase connection not available. Backup operations are simulated.' 
  };
  
  // Demo backup examples
  backupList.value = [
    { name: 'demo_backup_20240601.zip', size: 1024 * 1024 * 3.5, date: '2024-06-01T14:30:00Z', isDemo: true },
    { name: 'demo_backup_20240515.zip', size: 1024 * 1024 * 2.8, date: '2024-05-15T09:45:00Z', isDemo: true },
    { name: 'demo_backup_20240430.zip', size: 1024 * 1024 * 2.2, date: '2024-04-30T11:20:00Z', isDemo: true }
  ];
};

// Check if PocketBase is available
const isPocketBaseAvailable = async () => {
  if (!backupSettings.value.pocketbaseUrl || 
      !backupSettings.value.pocketbaseUrl.startsWith('http')) {
    return false;
  }
  
  try {
    // Test if server is reachable with a simple request
    const response = await fetch(backupSettings.value.pocketbaseUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // Add a timeout to avoid long waits
      signal: AbortSignal.timeout(5000)
    }).catch(() => null);
    
    // Even a 404 is OK, it just means the server is running but the path is wrong
    return response !== null && (response.ok || response.status === 404);
  } catch (error) {
    console.error('Error checking PocketBase availability:', error);
    return false;
  }
};

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Create backup
const createBackup = async () => {
  backupInProgress.value = true;
  backupStatus.value = { type: 'info', message: 'Creating backup...' };
  
  try {
    // Check if PocketBase is available
    const pbAvailable = await isPocketBaseAvailable();
    
    if (!pbAvailable) {
      // Handle demo mode
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
      
      // Create a new demo backup
      const now = new Date();
      const newBackup = {
        name: `demo_backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.zip`,
        size: Math.random() * 1024 * 1024 * 4 + 1024 * 1024, // Random size between 1-5MB
        date: now.toISOString(),
        isDemo: true
      };
      
      backupList.value.unshift(newBackup);
      backupStatus.value = { 
        type: 'success', 
        message: 'Demo backup created successfully! (Note: This is a simulated operation)'
      };
      
      if (!isDemo.value) {
        initDemoMode();
      }
      
      return;
    }
    
    // Real PocketBase implementation logic...
    // Try with PocketBase SDK first
    const PocketBase = (await import('pocketbase')).default;
    const pb = new PocketBase(backupSettings.value.pocketbaseUrl);
    
    try {
      // Authenticate
      await pb.admins.authWithPassword(
        backupSettings.value.adminEmail,
        backupSettings.value.adminPassword
      );
      
      // Try to use the SDK's backup method if available
      if (typeof pb.backups?.create === 'function') {
        await pb.backups.create({
          name: `backup_${new Date().toISOString().replace(/[:.]/g, '_')}`,
          options: { includeFiles: backupSettings.value.includeFiles }
        });
        
        backupStatus.value = { type: 'success', message: 'Backup created successfully!' };
        fetchBackupList();
        return;
      }
      
      // If SDK doesn't have backup method, try direct API call
      const response = await fetch(`${backupSettings.value.pocketbaseUrl}/api/admins/backups`, {
        method: 'POST',
        headers: {
          'Authorization': pb.authStore.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          includeFiles: backupSettings.value.includeFiles
        })
      });
      
      if (response.ok) {
        backupStatus.value = { type: 'success', message: 'Backup created successfully!' };
        fetchBackupList();
        return;
      }
      
      throw new Error(`Server returned ${response.status}`);
    } catch (error) {
      console.error('PocketBase backup error:', error);
      
      // If we get here, authenticate and API calls didn't work
      // Fall back to demo mode
      initDemoMode();
      
      // Create a simulated backup
      const now = new Date();
      const newBackup = {
        name: `demo_backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.zip`,
        size: Math.random() * 1024 * 1024 * 4 + 1024 * 1024,
        date: now.toISOString(),
        isDemo: true
      };
      
      backupList.value.unshift(newBackup);
      backupStatus.value = { 
        type: 'warning', 
        message: 'Switched to demo mode. Real backup failed: ' + (error.message || 'Unknown error')
      };
    }
  } catch (error) {
    console.error('Backup error:', error);
    backupStatus.value = { type: 'error', message: `Backup failed: ${error.message}` };
    
    // If all fails, initialize demo mode
    if (!isDemo.value) {
      initDemoMode();
    }
  } finally {
    backupInProgress.value = false;
  }
};

// Fetch list of available backups
const fetchBackupList = async () => {
  try {
    // Check if PocketBase is available
    const pbAvailable = await isPocketBaseAvailable();
    
    if (!pbAvailable) {
      // Handle demo mode
      if (!isDemo.value) {
        initDemoMode();
      }
      return;
    }
    
    // Real PocketBase implementation
    const PocketBase = (await import('pocketbase')).default;
    const pb = new PocketBase(backupSettings.value.pocketbaseUrl);
    
    try {
      // Authenticate
      await pb.admins.authWithPassword(
        backupSettings.value.adminEmail,
        backupSettings.value.adminPassword
      );
      
      // Try to use SDK's method if available
      if (typeof pb.backups?.getFullList === 'function') {
        const backups = await pb.backups.getFullList();
        backupList.value = backups.map(backup => ({
          name: backup.filename || backup.id,
          size: backup.size || 0,
          date: backup.created || new Date().toISOString()
        }));
        isDemo.value = false;
        return;
      }
      
      // Try direct API call
      const response = await fetch(`${backupSettings.value.pocketbaseUrl}/api/admins/backups`, {
        method: 'GET',
        headers: {
          'Authorization': pb.authStore.token
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        backupList.value = (Array.isArray(data) ? data : (data.items || [])).map(backup => ({
          name: backup.filename || backup.key || backup.id,
          size: backup.size || 0,
          date: backup.created || new Date().toISOString()
        }));
        isDemo.value = false;
        return;
      }
      
      throw new Error(`Server returned ${response.status}`);
    } catch (error) {
      console.error('PocketBase fetch backup list error:', error);
      
      // If we get here, fall back to demo mode
      initDemoMode();
    }
  } catch (error) {
    console.error('Error fetching backup list:', error);
    backupStatus.value = { type: 'error', message: `Failed to fetch backups: ${error.message}` };
    
    // If all fails, initialize demo mode
    if (!isDemo.value) {
      initDemoMode();
    }
  }
};

// Download backup
const downloadBackup = async (backup) => {
  backupStatus.value = { type: 'info', message: `Downloading backup: ${backup.name}` };
  
  // If it's a demo backup, show a message
  if (backup.isDemo || isDemo.value) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    backupStatus.value = { 
      type: 'warning', 
      message: 'This is a demo backup. In a real environment, the download would start now.' 
    };
    return;
  }
  
  try {
    // Real PocketBase implementation
    const PocketBase = (await import('pocketbase')).default;
    const pb = new PocketBase(backupSettings.value.pocketbaseUrl);
    
    // Authenticate
    await pb.admins.authWithPassword(
      backupSettings.value.adminEmail,
      backupSettings.value.adminPassword
    );
    
    // Create download URL
    const downloadUrl = `${backupSettings.value.pocketbaseUrl}/api/admins/backups/${backup.name}?token=${encodeURIComponent(pb.authStore.token)}`;
    
    // Open download in new tab
    window.open(downloadUrl, '_blank');
    
    backupStatus.value = { type: 'success', message: 'Download initiated. Check your downloads folder.' };
  } catch (error) {
    console.error('Download error:', error);
    backupStatus.value = { type: 'error', message: `Download failed: ${error.message}` };
    
    // If it fails, try demo mode
    if (!isDemo.value) {
      initDemoMode();
    }
  }
};

// Delete backup
const deleteBackup = async (backup) => {
  if (!confirm(`Are you sure you want to delete ${backup.name}?`)) return;
  
  backupStatus.value = { type: 'info', message: `Deleting backup: ${backup.name}...` };
  
  // If it's a demo backup, just remove it from the list
  if (backup.isDemo || isDemo.value) {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing
    backupList.value = backupList.value.filter(b => b.name !== backup.name);
    backupStatus.value = { 
      type: 'success', 
      message: 'Demo backup deleted successfully. (Note: This is a simulated operation)' 
    };
    return;
  }
  
  try {
    // Real PocketBase implementation
    const PocketBase = (await import('pocketbase')).default;
    const pb = new PocketBase(backupSettings.value.pocketbaseUrl);
    
    // Authenticate
    await pb.admins.authWithPassword(
      backupSettings.value.adminEmail,
      backupSettings.value.adminPassword
    );
    
    // Try to use SDK's method if available
    if (typeof pb.backups?.delete === 'function') {
      await pb.backups.delete(backup.name);
      backupList.value = backupList.value.filter(b => b.name !== backup.name);
      backupStatus.value = { type: 'success', message: 'Backup deleted successfully.' };
      return;
    }
    
    // Try direct API call
    const response = await fetch(`${backupSettings.value.pocketbaseUrl}/api/admins/backups/${backup.name}`, {
      method: 'DELETE',
      headers: {
        'Authorization': pb.authStore.token
      }
    });
    
    if (response.ok) {
      backupList.value = backupList.value.filter(b => b.name !== backup.name);
      backupStatus.value = { type: 'success', message: 'Backup deleted successfully.' };
      return;
    }
    
    throw new Error(`Server returned ${response.status}`);
  } catch (error) {
    console.error('Error deleting backup:', error);
    backupStatus.value = { type: 'error', message: `Failed to delete backup: ${error.message}` };
    
    // If it fails, try demo mode
    if (!isDemo.value) {
      initDemoMode();
    }
  }
};

// Handle restore file selection
const onRestoreFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  if (confirm(`Are you sure you want to restore from ${file.name}? This will overwrite your current database.`)) {
    restoreInProgress.value = true;
    backupStatus.value = { type: 'info', message: `Restoring from ${file.name}...` };
    
    // For demo mode or if PocketBase is not available
    if (isDemo.value || !(await isPocketBaseAvailable())) {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 2000));
      backupStatus.value = { 
        type: 'warning', 
        message: 'This is a demo restore operation. In a real environment, your database would be restored now.' 
      };
      
      if (!isDemo.value) {
        initDemoMode();
      }
      
      restoreInProgress.value = false;
      if (restoreFileInput.value) {
        restoreFileInput.value.value = '';
      }
      return;
    }
    
    try {
      // Real PocketBase implementation
      const PocketBase = (await import('pocketbase')).default;
      const pb = new PocketBase(backupSettings.value.pocketbaseUrl);
      
      // Authenticate
      await pb.admins.authWithPassword(
        backupSettings.value.adminEmail,
        backupSettings.value.adminPassword
      );
      
      // Create FormData with the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Try to use SDK's method if available
      if (typeof pb.backups?.restore === 'function') {
        await pb.backups.restore(formData);
        backupStatus.value = { type: 'success', message: 'Restore completed successfully. You may need to restart the server.' };
        return;
      }
      
      // Try direct API call
      const response = await fetch(`${backupSettings.value.pocketbaseUrl}/api/admins/backups/restore`, {
        method: 'POST',
        headers: {
          'Authorization': pb.authStore.token
        },
        body: formData
      });
      
      if (response.ok) {
        backupStatus.value = { type: 'success', message: 'Restore completed successfully. You may need to restart the server.' };
        return;
      }
      
      throw new Error(`Server returned ${response.status}`);
    } catch (error) {
      console.error('Restore error:', error);
      backupStatus.value = { type: 'error', message: `Restore failed: ${error.message}` };
      
      // If it fails, try demo mode
      if (!isDemo.value) {
        initDemoMode();
      }
    } finally {
      restoreInProgress.value = false;
      // Clear file input
      if (restoreFileInput.value) {
        restoreFileInput.value.value = '';
      }
    }
  } else {
    // Clear file input if canceled
    if (restoreFileInput.value) {
      restoreFileInput.value.value = '';
    }
  }
};

// Check PocketBase connectivity on component mount
onMounted(async () => {
  if (activeTab.value === 'backup') {
    const pbAvailable = await isPocketBaseAvailable();
    if (!pbAvailable) {
      initDemoMode();
    } else {
      fetchBackupList();
    }
  }
});

// Load backup list when backup tab is activated
watch(() => activeTab.value, async (newTab) => {
  if (newTab === 'migration') {
    refreshTables();
  } else if (newTab === 'backup') {
    const pbAvailable = await isPocketBaseAvailable();
    if (!pbAvailable) {
      initDemoMode();
    } else {
      fetchBackupList();
    }
  }
});
</script>

<style scoped>
.active {
  @apply bg-primary text-primary-content font-medium;
}
</style> 