<template>
  <div class="drawer lg:drawer-open">
    <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Header -->
      <div class="navbar bg-base-100 shadow-md z-10">
        <div class="flex-none lg:hidden">
          <label for="admin-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="flex-1 px-2">
          <span class="text-xl font-bold text-primary">BookSwap Admin</span>
        </div>
        <div class="flex-none gap-3">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="badge badge-xs badge-primary indicator-item">2</span>
              </div>
            </label>
            <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow">
              <div class="card-body">
                <h3 class="font-bold text-md">Notifications</h3>
                <div class="divide-y divide-base-200">
                  <div class="py-3">
                    <div class="flex items-start gap-3">
                      <div class="badge badge-sm badge-primary">New</div>
                      <div>
                        <p class="font-semibold text-sm">New User Registered</p>
                        <p class="text-xs opacity-70 mt-1">Ahmed signed up 2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div class="py-3">
                    <div class="flex items-start gap-3">
                      <div class="badge badge-sm badge-warning">Alert</div>
                      <div>
                        <p class="font-semibold text-sm">Server Update Required</p>
                        <p class="text-xs opacity-70 mt-1">Maintenance needed within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-actions mt-2">
                  <button class="btn btn-primary btn-sm btn-block">View All Notifications</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=570df8&color=fff" />
              </div>
            </label>
            <ul tabindex="0" class="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  <span class="font-medium">Profile</span>
                  <span class="badge badge-sm">Admin</span>
                </a>
              </li>
              <li><a>Account Settings</a></li>
              <li><a class="text-error">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Page content -->
      <div class="bg-base-200 min-h-screen">
        <router-view></router-view>
      </div>
    </div>
    
    <!-- Sidebar -->
    <div class="drawer-side z-20">
      <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-100 w-72 min-h-screen border-r border-base-200">
        <!-- Logo and App Name -->
        <div class="p-4 flex items-center gap-3 border-b border-base-200">
          <div class="avatar">
            <div class="w-10 rounded-lg bg-primary text-primary-content">
              <span class="text-xl font-bold">B</span>
            </div>
          </div>
          <div>
            <h2 class="text-lg font-bold">BookSwap</h2>
            <p class="text-xs opacity-60">Admin Portal</p>
          </div>
        </div>
        
        <!-- Menu Items -->
        <div class="p-4">
          <ul class="menu menu-md p-0 [&_li>*]:rounded-lg">
            <li class="mb-2">
              <router-link to="/admin" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/admin/analytics" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Analytics
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/admin/users" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Users
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/admin/logs" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd" />
                </svg>
                System Logs
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/admin/settings" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                Settings
              </router-link>
            </li>
            
            <li class="menu-title mt-6">
              <span class="text-xs font-semibold opacity-70 px-4">Content Management</span>
            </li>
            
            <li class="mb-2">
              <router-link to="/admin/schema" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                Schema Management
              </router-link>
            </li>
            
            <li class="mb-2">
              <router-link to="/admin/contacts" class="flex gap-3" active-class="active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contacts
              </router-link>
            </li>
            
            <li class="menu-title mt-6">
              <span class="text-xs font-semibold opacity-70 px-4">Navigation</span>
            </li>
            
            <li class="mb-2">
              <a href="/" class="flex gap-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                Return to Site
              </a>
            </li>
            <li class="mt-1">
              <a href="#" class="flex gap-3 text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Can add reactive components here if needed
</script>

<style scoped>
.active {
  @apply bg-primary text-primary-content font-medium;
}
</style> 