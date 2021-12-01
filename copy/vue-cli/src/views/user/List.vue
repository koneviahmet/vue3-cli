<template>

  
  <div class="my-24 mx-3 bg-base-100 min-h-screen shadow-sm rounded-md p-5">
  <Skeletor :loading="usersLoading" :length="4"/>

  <div class="alert alert-error my-4" v-if="usersError">
    <div class="flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
      </svg> 
      <label>{{usersError}}</label>
    </div>
  </div>

  <div class="overflow-x-auto" v-if="!usersLoading">
    <table class="table w-full">
      <thead>
        <tr>
          <th></th> 
          <th>NAME - LAST NAME</th> 
          <th>EMAIL</th> 
          <th>PASSWORD</th>
          <th>OPTIONS</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="user in usersData" :key="user.id">
          <th>{{user.id}}</th> 
          <td>{{ user.name }} {{ user.lastName }}</td> 
          <td>{{ user.email }}</td> 
          <td>{{ user.password }}</td> 
          <td class="flex space-x-1">
            <router-link :to="`/user/detail/${user.id}`" class="btn btn-sm">Select</router-link>
            <a class="btn btn-error btn-sm" @click="userDelete(user.id)" :class="usersLoading && 'loading btn-disabled'">Delete</a>    
          </td> 
        </tr>
      </tbody>
    </table>
  </div>


  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted } from "vue";
const app = getCurrentInstance();
import { notyfError, notyfSuccess } from "../../utils/notyf.js";
import Skeletor from "../../utils/skeletor/skeletor1.vue"

import useUser from "../../compositions/useModelUser";
const { usersLoading, usersData, usersError, getUsers, deleteUser } = useUser();
onMounted(() => getUsers());

import Alert from "../../utils/alert.js";

const userDelete = (id) => {
  Alert.showPrompt("Are you sure you want to delete?").then((res) => {
    !res.isConfirmed && notyfError("you gave up.");
    res.isConfirmed &&
      deleteUser({ id }).then(() => notyfSuccess("delete success."));
  });
};
</script>

