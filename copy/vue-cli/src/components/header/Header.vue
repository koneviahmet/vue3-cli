<template>
    <div class="navbar fixed w-full shadow-md bg-base-100 dark:bg-neutral text-base-content dark:text-neutral-content z-50">
    <div class="flex-none flex lg:hidden" v-if="menu">
      <label for="my-drawer-2" class="btn btn-ghost btn-square drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  class="inline-block w-6 h-6 stroke-current">           
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
        </svg>
      </label>
    </div> 
    <div class="flex-1 flex px-2 mx-2">
      <span class="text-lg font-bold">
          <router-link to="/" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
            </svg>
            Todo App
          </router-link>
      </span>
    </div> 
    
    <!-- Theme toggle -->
    <div class="flex-none mx-2">
      <ThemeToggle />
    </div>
    
    <div class="flex-none" v-if="!isAuthenticated">
      <router-link to="/user/login" class="btn btn-ghost btn-sm rounded-btn">
          <UserCircleIcon class="h-5 w-5 mr-1" />
          Log In  
      </router-link> 
    </div>

    <div class="flex-none" v-if="!isAuthenticated">
      <router-link to="/user/signIn" class="btn btn-primary btn-sm rounded-btn">
          <UserCircleIcon class="h-5 w-5 mr-1" />
          Sign Up  
      </router-link> 
    </div> 

    <div class="flex-none" v-if="isAuthenticated">
      <div class="dropdown dropdown-end">
      <div tabindex="0" class="m-1 btn btn-ghost btn-sm gap-1">
        <div class="avatar placeholder">
          <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
            <span>{{ userInitials }}</span>
          </div>
        </div>
        <span class="hidden md:inline">{{user?.name}} {{user?.lastName}}</span>
      </div> 
      <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 dark:bg-neutral rounded-box w-52">
        <li>
          <router-link to="/user/detail/1" class="flex items-center">
            <UserCircleIcon class="h-5 w-5 mr-1" />
            Profile
          </router-link>
        </li>  
        <li>
          <router-link to="/user/update/1" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit Profile
          </router-link>
        </li>
        <li>
          <a @click="logOut" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Sign Out  
          </a> 
        </li>
      </ul>
    </div>
    </div>
  </div>

  <div class="bg-gray-500 border-b hidden">
    <div class="container mx-auto flex py-3 justify-between">

      <ul class="flex space-x-1" v-if="isAuthenticated">
        <div
          class="
            flex
            items-center
            text-gray-900
            space-x-1
            px-2
            hover:bg-gray-600 hover:text-white
            rounded
          "
        >
          <UserCircleIcon class="h-5 w-5" />
          <router-link :to="`/user/detail/${user?.id}`">
            <span class="inline-block align-middle p-1 text-sm"
              >{{ user?.name }} {{ user?.lastName }}</span
            >
          </router-link>
        </div>
        <li class="mr-2">
          <a
            @click="logOut"
            href="#"
            class="inline-block text-white bg-gray-600 rounded py-1 px-3"
            >Logout</a
          >
        </li>
      </ul>
      <ul class="flex space-x-1" v-else>
        <li class="mr-2">
          <router-link
            to="/user/signIn"
            class="inline-block text-white bg-gray-600 rounded py-1 px-3"
            >Sign In</router-link
          >
        </li>
        <li class="mr-2">
          <router-link
            to="/user/login"
            class="inline-block text-white bg-gray-600 rounded py-1 px-3"
            >Login</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { getCurrentInstance, ref, computed, defineProps } from "vue";
import ThemeToggle from "../ThemeToggle.vue";
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";

const app = getCurrentInstance();
const store = app.appContext.config.globalProperties.$store;
const props = defineProps(["menu"]);
const router = useRouter();

const logOut = () => {
  store.commit("logoutUser");
  router.push({name: "HomePage"})
};

const user = computed(() => {
  return store.getters._getCurrentUser;
});

const isAuthenticated = computed(() => {
  return store.getters._isAuthenticated;
});

const userInitials = computed(() => {
  if (!user.value) return '';
  return (user.value.name?.charAt(0) || '') + (user.value.lastName?.charAt(0) || '');
});
</script>
