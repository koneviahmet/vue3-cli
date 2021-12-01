<template>
    <div class="navbar fixed w-full shadow bg-primary text-primary-content z-50">
    <div class="flex-none flex lg:hidden" v-if="menu">
      <label for="my-drawer-2" class="btn btn-square btn-ghost drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  class="inline-block w-6 h-6 stroke-current">           
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
        </svg>
      </label>
    </div> 
    <div class="flex-1 flex px-2 mx-2">
      <span class="text-lg font-bold">
          daisyUI
      </span>
    </div> 
  
    
    <div class="flex-none" v-if="!isAuthenticated">
      <router-link to="/user/login" class="btn btn-ghost btn-sm rounded-btn">
          <UserCircleIcon class="h-5 w-5 mr-1" />
          Log In  
      </router-link> 
    </div>

    <div class="flex-none" v-if="!isAuthenticated">
      <router-link to="/user/signIn" class="btn btn-sm rounded-btn">
          <UserCircleIcon class="h-5 w-5 mr-1" />
          Sign Up  
      </router-link> 
    </div> 




    <div class="flex-none" v-if="isAuthenticated">
      <div class="dropdown dropdown-end">
      <div tabindex="0" class="m-1 btn btn-sm">{{user?.name}} {{user?.lastName}}</div> 
      <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <router-link to="/user/detail/1" >
            <UserCircleIcon class="h-5 w-5 mr-1" />
            Profile
            </router-link>
        </li>  
        <li>
          <router-link to="/user/update/1" >
            <UserCircleIcon class="h-5 w-5 mr-1" />
            Edit Profile
            </router-link>
        </li>
        <li>
          <a @click="logOut">
            <UserCircleIcon class="h-5 w-5 mr-1" />
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
const app = getCurrentInstance();
const store = app.appContext.config.globalProperties.$store;
const props = defineProps(["menu"]);

import { useRouter } from "vue-router";
import { UserCircleIcon } from "@heroicons/vue/solid";
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


</script>
