<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-primary">User Management</h1>
        <p class="text-sm opacity-70 mt-1">View, manage, and modify user accounts</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link to="/admin" class="btn btn-outline btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Dashboard
        </router-link>
        <button class="btn btn-primary btn-sm gap-2" @click="openAddUserModal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add User
        </button>
      </div>
    </div>


    <!-- Filters and Search -->
    <div class="bg-base-100 p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="form-control flex-1">
          <div class="input-group">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search users..." 
              class="input input-bordered w-full" 
              @keyup.enter="searchUsers"
            />
            <button class="btn btn-square" @click="searchUsers">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <select v-model="roleFilter" class="select select-bordered w-full md:w-auto">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          <select v-model="statusFilter" class="select select-bordered w-full md:w-auto">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <button 
            class="btn btn-outline btn-sm"
            @click="resetFilters"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Selected Actions Bar -->
    <div v-if="selectedUsers.length > 0" class="bg-base-100 p-3 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <span class="font-medium">{{ selectedUsers.length }} users selected</span>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-sm">Bulk Actions</label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a @click="bulkAction('activate')">Activate</a></li>
            <li><a @click="bulkAction('deactivate')">Deactivate</a></li>
            <li><a @click="bulkAction('delete')" class="text-error">Delete</a></li>
          </ul>
        </div>
        <button class="btn btn-sm btn-outline" @click="clearSelection">
          Clear Selection
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-base-100 rounded-lg shadow-md overflow-hidden">
      <div v-if="usersLoading" class="p-8 flex justify-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <div v-else-if="usersError" class="p-8 text-center text-error">
        <p>Error loading users: {{ usersError }}</p>
        <button class="btn btn-sm btn-outline mt-4" @click="fetchUsers">Retry</button>
      </div>
      <div v-else-if="!users || users.length === 0" class="p-8 text-center">
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p class="text-base-content/70">No users found</p>
          <button class="btn btn-sm btn-outline mt-4" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input 
                    type="checkbox" 
                    class="checkbox checkbox-sm" 
                    :checked="selectedUsers.length === users.length && users.length > 0"
                    @change="toggleSelectAll"
                  />
                </label>
              </th>
              <th class="cursor-pointer" @click="sortBy('id')">
                ID
                <span v-if="sortField === 'id'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="cursor-pointer" @click="sortBy('name')">
                Name
                <span v-if="sortField === 'name'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="cursor-pointer" @click="sortBy('email')">
                Email
                <span v-if="sortField === 'email'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="cursor-pointer" @click="sortBy('role')">
                Role
                <span v-if="sortField === 'role'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="cursor-pointer" @click="sortBy('status')">
                Status
                <span v-if="sortField === 'status'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th class="cursor-pointer" @click="sortBy('lastLogin')">
                Last Login
                <span v-if="sortField === 'lastLogin'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="hover">
              <td>
                <label>
                  <input 
                    type="checkbox" 
                    class="checkbox checkbox-sm" 
                    :checked="selectedUsers.includes(user.id)"
                    @change="toggleUserSelection(user.id)"
                  />
                </label>
              </td>
              <td>{{ user.id }}</td>
              <td class="font-medium">
                <div class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-xs font-bold text-primary" v-if="!user.avatar">{{ user.name.charAt(0) }}</span>
                      <img v-else :src="user.avatar" alt="User avatar" />
                    </div>
                  </div>
                  {{ user.name }}
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>
                <div class="badge" :class="{
                  'badge-primary': user.role === 'admin',
                  'badge-secondary': user.role === 'moderator',
                  'badge-ghost': user.role === 'user'
                }">
                  {{ user.role }}
                </div>
              </td>
              <td>
                <div class="badge" :class="{
                  'badge-success': user.status === 'active',
                  'badge-error': user.status === 'suspended',
                  'badge-warning': user.status === 'pending',
                  'badge-ghost': user.status === 'inactive'
                }">
                  {{ user.status }}
                </div>
              </td>
              <td>{{ formatDate(user.lastLogin) }}</td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-ghost btn-xs" @click="editUser(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li><a @click="toggleUserStatus(user)">
                        {{ user.status === 'active' ? 'Deactivate' : 'Activate' }}
                      </a></li>
                      <li><a @click="resetPassword(user)">Reset Password</a></li>
                      <li><a @click="confirmDeleteUser(user)" class="text-error">Delete</a></li>
                    </ul>
                  </div>
                </div>
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
              Showing <span class="font-medium">{{ pagination.startItem }}</span> to <span class="font-medium">{{ pagination.endItem }}</span> of <span class="font-medium">{{ pagination.totalItems }}</span> users
            </p>
          </div>
          <div>
            <div class="join">
              <button 
                class="join-item btn btn-sm" 
                :class="{'btn-disabled': pagination.currentPage === 1}"
                @click="changePage(pagination.currentPage - 1)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button 
                v-for="page in paginationPages" 
                :key="page" 
                class="join-item btn btn-sm" 
                :class="{'btn-active': page === pagination.currentPage}"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
              <button 
                class="join-item btn btn-sm" 
                :class="{'btn-disabled': pagination.currentPage === pagination.totalPages}"
                @click="changePage(pagination.currentPage + 1)"
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
            :class="{'btn-disabled': pagination.currentPage === 1}"
            @click="changePage(pagination.currentPage - 1)"
          >
            Previous
          </button>
          <span class="self-center text-sm">
            Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
          </span>
          <button 
            class="btn btn-sm" 
            :class="{'btn-disabled': pagination.currentPage === pagination.totalPages}"
            @click="changePage(pagination.currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div class="modal" :class="{'modal-open': showAddUserModal}">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Add New User</h3>
        <form @submit.prevent="addUser">
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" v-model="newUser.name" class="input input-bordered" required />
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="newUser.email" class="input input-bordered" required />
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" v-model="newUser.password" class="input input-bordered" required />
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Role</span>
            </label>
            <select v-model="newUser.role" class="select select-bordered" required>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select v-model="newUser.status" class="select select-bordered" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" @click="closeAddUserModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Add User</button>
          </div>
        </form>
      </div>
      <label class="modal-backdrop" @click="closeAddUserModal"></label>
    </div>

    <!-- Edit User Modal -->
    <div class="modal" :class="{'modal-open': showEditUserModal}">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Edit User</h3>
        <form @submit.prevent="updateUser">
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" v-model="editingUser.name" class="input input-bordered" required />
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="editingUser.email" class="input input-bordered" required />
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Role</span>
            </label>
            <select v-model="editingUser.role" class="select select-bordered" required>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="form-control mb-3">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select v-model="editingUser.status" class="select select-bordered" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" @click="closeEditUserModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
      <label class="modal-backdrop" @click="closeEditUserModal"></label>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" :class="{'modal-open': showDeleteModal}">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-2">Confirm Delete</h3>
        <p>Are you sure you want to delete {{ userToDelete?.name }}? This action cannot be undone.</p>
        <div class="modal-action">
          <button class="btn" @click="closeDeleteModal">Cancel</button>
          <button class="btn btn-error" @click="confirmDelete">Delete</button>
        </div>
      </div>
      <label class="modal-backdrop" @click="closeDeleteModal"></label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import useModelUsers from '../../compositions/useModelUsers';

const { loading: usersLoading, error: usersError, data: usersData, getItems: getUsers, deleteItem: deleteUserItem, addItem: addUserItem, updateItem: updateUserItem } = useModelUsers();

// State
const users = ref([]);
const searchQuery = ref('');
const roleFilter = ref('');
const statusFilter = ref('');
const selectedUsers = ref([]);
const sortField = ref('id');
const sortDirection = ref('asc');

// Pagination
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  startItem: 1,
  endItem: 10,
  totalItems: 0,
  itemsPerPage: 10
});

// Modals
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);
const showDeleteModal = ref(false);
const newUser = ref({ name: '', email: '', password: '', role: 'user', status: 'active' });
const editingUser = ref({});
const userToDelete = ref(null);

// Computed
const paginationPages = computed(() => {
  const currentPage = pagination.value?.currentPage || 1;
  const totalPages = pagination.value?.totalPages || 1;
  
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }
  
  if (currentPage >= totalPages - 2) {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  
  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
});

// Methods
const fetchUsers = async () => {
  await getUsers();
  if (usersData.value) {
    users.value = [...usersData.value];
    applyFilters();
    updatePagination();
  }
};

const updatePagination = () => {
  pagination.value.totalItems = users.value.length;
  pagination.value.totalPages = Math.ceil(users.value.length / pagination.value.itemsPerPage);
  const startIndex = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
  pagination.value.startItem = startIndex + 1;
  pagination.value.endItem = Math.min(startIndex + pagination.value.itemsPerPage, users.value.length);
};

const applyFilters = () => {
  if (!usersData.value) return;
  
  let filteredUsers = [...usersData.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.id.toString().includes(query)
    );
  }
  
  if (roleFilter.value) {
    filteredUsers = filteredUsers.filter(user => user.role === roleFilter.value);
  }
  
  if (statusFilter.value) {
    filteredUsers = filteredUsers.filter(user => user.status === statusFilter.value);
  }
  
  // Apply sort
  filteredUsers.sort((a, b) => {
    const valueA = a[sortField.value];
    const valueB = b[sortField.value];
    
    if (valueA < valueB) return sortDirection.value === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
  
  users.value = filteredUsers;
  updatePagination();
};

const resetFilters = () => {
  searchQuery.value = '';
  roleFilter.value = '';
  statusFilter.value = '';
  applyFilters();
};

const searchUsers = () => {
  applyFilters();
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
  applyFilters();
};

const toggleUserSelection = (userId) => {
  const index = selectedUsers.value.indexOf(userId);
  if (index === -1) {
    selectedUsers.value.push(userId);
  } else {
    selectedUsers.value.splice(index, 1);
  }
};

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedUsers.value = users.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const clearSelection = () => {
  selectedUsers.value = [];
};

const bulkAction = (action) => {
  // Implementation would depend on backend capabilities
  console.log(`Perform ${action} on users:`, selectedUsers.value);
  // After successful action
  clearSelection();
  fetchUsers();
};

const openAddUserModal = () => {
  newUser.value = { name: '', email: '', password: '', role: 'user', status: 'active' };
  showAddUserModal.value = true;
};

const closeAddUserModal = () => {
  showAddUserModal.value = false;
};

const addUser = async () => {
  try {
    await addUserItem(newUser.value);
    closeAddUserModal();
    fetchUsers();
  } catch (err) {
    console.error("Failed to add user:", err);
    // Show error notification
  }
};

const editUser = (user) => {
  editingUser.value = { ...user };
  showEditUserModal.value = true;
};

const closeEditUserModal = () => {
  showEditUserModal.value = false;
};

const updateUser = async () => {
  try {
    await updateUserItem(editingUser.value.id, editingUser.value);
    closeEditUserModal();
    fetchUsers();
  } catch (err) {
    console.error("Failed to update user:", err);
    // Show error notification
  }
};

const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      await deleteUserItem(userToDelete.value.id);
      closeDeleteModal();
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      // Show error notification
    }
  }
};

const toggleUserStatus = async (user) => {
  const newStatus = user.status === 'active' ? 'inactive' : 'active';
  try {
    await updateUserItem(user.id, { ...user, status: newStatus });
    fetchUsers();
  } catch (err) {
    console.error("Failed to update user status:", err);
    // Show error notification
  }
};

const resetPassword = (user) => {
  // This would typically send a password reset link to the user's email
  console.log("Reset password for user:", user.id);
  // Show success notification
};

const changePage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  pagination.value.currentPage = page;
  fetchUsers();
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Watch for filter changes
watch([roleFilter, statusFilter], () => {
  applyFilters();
});

// Initialize
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
</style> 