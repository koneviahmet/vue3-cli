<template>
  <div class="w-full">
    <!-- Main Navbar -->
    <div class="navbar bg-base-100 dark:bg-neutral text-base-content dark:text-neutral-content shadow-md fixed top-0 z-50 transition-all duration-300">
      <div class="container mx-auto">
        <!-- Mobile Nav & Sidebar Button -->
        <div class="flex-none" v-if="menu">
          <label for="my-drawer-2" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>

        <!-- Logo Section -->
        <div class="flex-1">
          <router-link to="/" class="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
            <div class="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
              </svg>
            </div>
            <span class="text-lg font-bold hidden sm:inline">sitename</span>
          </router-link>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex flex-1 justify-center">
          <ul class="menu menu-horizontal px-1 gap-2">
            <li>
              <router-link to="/" class="rounded-lg font-medium" :class="{'active': $route.path === '/'}">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/tasks" class="rounded-lg font-medium" :class="{'active': $route.path.includes('/tasks')}">
                My Tasks
              </router-link>
            </li>
            <li>
              <router-link to="/kanban" class="rounded-lg font-medium" :class="{'active': $route.path.includes('/kanban')}">
                Kanban
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/calendar" class="rounded-lg font-medium" :class="{'active': $route.path === '/calendar'}">
                Calendar
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Actions Section -->
        <div class="flex-none flex items-center gap-2">
          <!-- Theme Toggle -->
          <div class="mr-1">
            <ThemeToggle />
          </div>

          <!-- Authentication -->
          <div v-if="!isAuthenticated" class="flex gap-1">
            <router-link to="/users/login" class="btn btn-ghost btn-sm rounded-lg">
              <UserCircleIcon class="h-5 w-5 mr-1" />
              <span class="hidden sm:inline">Log In</span>
            </router-link>
            <router-link to="/users/signIn" class="btn btn-primary btn-sm rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span class="hidden sm:inline">Sign Up</span>
            </router-link>
          </div>

   

          <!-- User Dropdown -->
          <div v-if="isAuthenticated" class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-sm rounded-lg gap-2 pr-2 sm:pr-4 cursor-pointer">
              <div class="avatar placeholder online">
                <div class="bg-primary text-primary-content rounded-full w-8">
                  <span>{{ userInitials }}</span>
                </div>
              </div>
              <span class="hidden md:inline truncate max-w-[120px]">{{ user?.name }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu shadow-lg bg-base-100 dark:bg-neutral rounded-box w-64 mt-2 p-2 z-50">
              <li class="menu-title">
                <span>Account</span>
              </li>
              <li>
                <router-link :to="`/users/detail/${user?.id}`" class="flex items-center p-3">
                  <UserCircleIcon class="h-5 w-5 mr-2" />
                  <div>
                    <div class="font-medium">My Profile</div>
                    <div class="text-xs opacity-60">View your profile details</div>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link :to="`/users/update/${user?.id}`" class="flex items-center p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <div>
                    <div class="font-medium">Edit Profile</div>
                    <div class="text-xs opacity-60">Update your information</div>
                  </div>
                </router-link>
              </li>
              <div class="divider my-1"></div>
              <li>
                <a @click="logOutFNC" class="flex items-center p-3 text-error hover:bg-error/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                  </svg>
                  <div>
                    <div class="font-medium">Sign Out</div>
                    <div class="text-xs opacity-60">Log out of your account</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer - Hidden by default -->
    <div class="lg:hidden drawer-side fixed top-16 left-0 z-40" v-if="menu && isAuthenticated">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <aside class="bg-base-100 dark:bg-neutral w-64 h-screen shadow-xl p-4">
        <div class="flex flex-col h-full">
          <!-- User Info -->
          <div class="py-4 mb-2 border-b border-base-300 dark:border-neutral-focus">
            <div class="flex items-center space-x-3">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-12">
                  <span class="text-lg">{{ userInitials }}</span>
                </div>
              </div>
              <div>
                <div class="font-bold">{{ user?.name }} {{ user?.username }}</div>
                <div class="text-sm opacity-60">{{ user?.email || 'User' }}</div>
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <ul class="menu bg-base-100 dark:bg-neutral rounded-box">
            <li>
              <router-link to="/" class="flex items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/tasks" class="flex items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                My Tasks
              </router-link>
            </li>
            <li>
              <router-link to="/calendar" class="flex items-center py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar
              </router-link>
            </li>
          </ul>

          <!-- Bottom Actions -->
          <div class="mt-auto border-t border-base-300 dark:border-neutral-focus pt-4">
            <button @click="logOut" class="btn btn-outline btn-error btn-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- Spacer to prevent content from being hidden under fixed header -->
    <div class="h-16"></div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed, defineProps, onMounted, watch } from "vue";
import ThemeToggle from "../ThemeToggle.vue";
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import  useModelUsers from "../../compositions/useModelUsers"


const app = getCurrentInstance();
const store = app.appContext.config.globalProperties.$store;
const props = defineProps(["menu"]);
const router = useRouter();
const route = useRoute();
const { logOut } = useModelUsers();

const logOutFNC = () => {
  logOut().then(() => {
    store.commit("logoutUser");
    router.push({name: "HomePage"})
  })
};

const user = computed(() => {
  return store.getters._getCurrentUser;
});

const isAuthenticated = computed(() => {
  return store.getters._isAuthenticated;
});

const userInitials = computed(() => {
  if (!user.value) return '';
  return (user.value.name?.charAt(0) || '') + (user.value.username?.charAt(0) || '');
});
</script>

<style scoped>
.dropdown-content {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .navbar {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
