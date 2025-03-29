<template>
  <div class="py-6 px-4 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <div class="text-2xl font-bold text-base-content">User Management</div>
      <router-link to="/admin" class="btn btn-sm btn-outline">
        Back to Dashboard
      </router-link>
    </div>
    
    <div class="bg-base-100 p-6 rounded-lg shadow mb-6">
      <div class="flex flex-wrap gap-4 items-end">
        <div class="form-control flex-1">
          <label class="label">
            <span class="label-text">Search Users</span>
          </label>
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by name, email, or role..." 
              class="input input-bordered w-full pr-10"
              @keyup.enter="searchUsers"
            />
            <button @click="searchUsers" class="absolute inset-y-0 right-0 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/50" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Role</span>
          </label>
          <select v-model="filters.role" class="select select-bordered min-w-[150px]">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="filters.status" class="select select-bordered min-w-[150px]">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        
        <div class="form-control">
          <button 
            @click="applyFilters" 
            class="btn btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end mb-4">
      <button class="btn btn-primary flex items-center gap-2" @click="showAddUserModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Add New User
      </button>
    </div>
    
    <div v-if="loading" class="bg-base-100 p-6 rounded-lg shadow animate-pulse">
      <div v-for="i in 10" :key="i" class="h-12 bg-base-300 rounded my-2"></div>
    </div>
    
    <div v-else class="bg-base-100 rounded-lg shadow">
      <div v-if="!users || users.length === 0" class="text-center py-8 text-base-content/60">
        No users found matching the filter criteria
      </div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </label>
                </th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="hover:bg-base-200">
                <td>
                  <label>
                    <input type="checkbox" class="checkbox" v-model="selectedUsers" :value="user.id" />
                  </label>
                </td>
                <td>{{ user.id }}</td>
                <td class="font-medium">{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <div class="badge" :class="{
                    'badge-primary': user.role === 'admin',
                    'badge-secondary': user.role === 'user',
                    'badge-ghost': user.role === 'guest'
                  }">{{ user.role }}</div>
                </td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': user.status === 'active',
                    'badge-warning': user.status === 'inactive',
                    'badge-error': user.status === 'suspended'
                  }">{{ user.status }}</div>
                </td>
                <td>{{ user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never' }}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <button @click="editUser(user)" class="btn btn-square btn-sm btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteUser(user)" class="btn btn-square btn-sm btn-ghost text-error">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex justify-between items-center p-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-base-content/70">{{ selectedUsers.length }} selected</span>
            <div class="dropdown dropdown-top">
              <button class="btn btn-sm btn-outline" :disabled="selectedUsers.length === 0">Bulk Actions</button>
              <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a @click="bulkUpdateStatus('active')">Set Active</a></li>
                <li><a @click="bulkUpdateStatus('inactive')">Set Inactive</a></li>
                <li><a @click="bulkUpdateStatus('suspended')">Suspend</a></li>
                <li><a @click="confirmBulkDelete" class="text-error">Delete Selected</a></li>
              </ul>
            </div>
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
    
    <!-- Add/Edit User Modal -->
    <div v-if="showAddUserModal || editingUser" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">{{ editingUser ? 'Edit User' : 'Add New User' }}</h3>
          <button @click="closeUserModal" class="btn btn-sm btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="saveUser">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Full Name</span>
            </label>
            <input 
              type="text" 
              v-model="userForm.name" 
              class="input input-bordered" 
              required
            />
          </div>
          
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              type="email" 
              v-model="userForm.email" 
              class="input input-bordered" 
              required
            />
          </div>
          
          <div class="form-control mb-4" v-if="!editingUser">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              type="password" 
              v-model="userForm.password" 
              class="input input-bordered" 
              :required="!editingUser"
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Role</span>
              </label>
              <select v-model="userForm.role" class="select select-bordered w-full" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select v-model="userForm.status" class="select select-bordered w-full" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          
          <div class="flex justify-end gap-2 mt-6">
            <button 
              type="button"
              @click="closeUserModal"
              class="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>{{ editingUser ? 'Update User' : 'Add User' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">Confirm Deletion</h3>
        <p class="mb-6">Are you sure you want to delete {{ bulkDelete ? 'the selected users' : 'this user' }}? This action cannot be undone.</p>
        
        <div class="flex justify-end gap-2">
          <button 
            @click="showDeleteModal = false"
            class="btn btn-outline"
          >
            Cancel
          </button>
          <button 
            @click="confirmDelete"
            class="btn btn-error"
            :disabled="loading"
          >
            <span v-if="loading">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { notyfError, notyfSuccess } from "../../utils/notyf.js";

// Simulated user data - In a real app this would come from an API
const users = ref([
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'admin', 
    status: 'active',
    lastLogin: new Date().toISOString()
  },
  { 
    id: 2, 
    name: 'Regular User', 
    email: 'user@example.com', 
    role: 'user', 
    status: 'active',
    lastLogin: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  { 
    id: 3, 
    name: 'Inactive User', 
    email: 'inactive@example.com', 
    role: 'user', 
    status: 'inactive',
    lastLogin: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
  },
  { 
    id: 4, 
    name: 'Suspended User', 
    email: 'suspended@example.com', 
    role: 'user', 
    status: 'suspended',
    lastLogin: new Date(Date.now() - 7776000000).toISOString() // 90 days ago
  },
  { 
    id: 5, 
    name: 'Guest User', 
    email: 'guest@example.com', 
    role: 'guest', 
    status: 'active',
    lastLogin: null
  }
]);

const loading = ref(false);
const searchQuery = ref('');
const filters = reactive({
  role: '',
  status: ''
});

const selectedUsers = ref([]);
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalUsers = ref(5);
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value));

// User modal state
const showAddUserModal = ref(false);
const editingUser = ref(null);
const userForm = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user',
  status: 'active'
});

// Delete modal state
const showDeleteModal = ref(false);
const userToDelete = ref(null);
const bulkDelete = ref(false);

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = users.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const searchUsers = () => {
  // In a real app this would call an API with search params
  // For now we just simulate filtering the users array
  console.log('Searching for:', searchQuery.value);
};

const applyFilters = () => {
  // In a real app this would call an API with filter params
  console.log('Applying filters:', filters);
};

const changePage = (page) => {
  currentPage.value = page;
  // In a real app this would fetch the new page of data
};

const editUser = (user) => {
  editingUser.value = user;
  Object.assign(userForm, {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role,
    status: user.status
  });
};

const closeUserModal = () => {
  showAddUserModal.value = false;
  editingUser.value = null;
  resetUserForm();
};

const resetUserForm = () => {
  Object.assign(userForm, {
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });
};

const saveUser = () => {
  loading.value = true;
  
  setTimeout(() => {
    if (editingUser.value) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === editingUser.value.id);
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          name: userForm.name,
          email: userForm.email,
          role: userForm.role,
          status: userForm.status
        };
      }
      notyfSuccess('User updated successfully');
    } else {
      // Add new user
      const newUser = {
        id: users.value.length + 1,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        status: userForm.status,
        lastLogin: null
      };
      users.value.push(newUser);
      notyfSuccess('User added successfully');
    }
    
    loading.value = false;
    closeUserModal();
  }, 500); // Simulate API delay
};

const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  bulkDelete.value = false;
  showDeleteModal.value = true;
};

const confirmBulkDelete = () => {
  bulkDelete.value = true;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  loading.value = true;
  
  setTimeout(() => {
    if (bulkDelete.value) {
      // Delete multiple users
      users.value = users.value.filter(user => !selectedUsers.value.includes(user.id));
      selectedUsers.value = [];
      selectAll.value = false;
      notyfSuccess('Selected users deleted successfully');
    } else if (userToDelete.value) {
      // Delete single user
      users.value = users.value.filter(user => user.id !== userToDelete.value.id);
      selectedUsers.value = selectedUsers.value.filter(id => id !== userToDelete.value.id);
      notyfSuccess('User deleted successfully');
    }
    
    loading.value = false;
    showDeleteModal.value = false;
    userToDelete.value = null;
  }, 500); // Simulate API delay
};

const bulkUpdateStatus = (status) => {
  if (selectedUsers.value.length === 0) return;
  
  loading.value = true;
  
  setTimeout(() => {
    users.value = users.value.map(user => {
      if (selectedUsers.value.includes(user.id)) {
        return { ...user, status };
      }
      return user;
    });
    
    loading.value = false;
    notyfSuccess(`${selectedUsers.value.length} users updated to ${status}`);
  }, 500); // Simulate API delay
};

onMounted(() => {
  // In a real app this would fetch initial user data
});
</script>

<style scoped>
</style> 